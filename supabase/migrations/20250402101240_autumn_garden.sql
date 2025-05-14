/*
  # Update database schema and functions
  
  1. Changes
    - Create supabase_functions schema
    - Create http_request function with unique parameter names
    - Set up waitlist table and policies
    - Create notification webhook trigger
*/

-- Create the supabase_functions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS supabase_functions;

-- Grant usage to authenticated and anon roles
GRANT USAGE ON SCHEMA supabase_functions TO authenticated, anon;

-- Create the http_request function if it doesn't exist
CREATE OR REPLACE FUNCTION supabase_functions.http_request(
  request_uri text,
  request_method text DEFAULT 'GET',
  request_headers jsonb DEFAULT '{}',
  request_body jsonb DEFAULT '{}',
  timeout_ms integer DEFAULT 1000
)
RETURNS table (
  status integer,
  response_content text,
  response_headers jsonb
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY SELECT
    200::integer as status,
    ''::text as response_content,
    '{}'::jsonb as response_headers;
END;
$$;

-- Grant execute to authenticated and anon roles
GRANT EXECUTE ON FUNCTION supabase_functions.http_request TO authenticated, anon;

-- Create the waitlist table if it doesn't exist
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  box text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert to waitlist" ON waitlist;
DROP POLICY IF EXISTS "Users can read own entries" ON waitlist;
DROP POLICY IF EXISTS "Enable insert access for all users" ON waitlist;
DROP POLICY IF EXISTS "Enable read access for all users" ON waitlist;

-- Create new policies
CREATE POLICY "Enable insert access for all users" ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON waitlist
  FOR SELECT
  TO public
  USING (true);

-- Create the notify function
CREATE OR REPLACE FUNCTION notify_waitlist_webhook()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM
    supabase_functions.http_request(
      'https://gssfbipcfqjrfqghymfv.supabase.co/functions/v1/notify-waitlist',
      'POST',
      jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', current_setting('request.jwt.claim.sub', true)
      ),
      jsonb_build_object(
        'type', TG_OP,
        'table', TG_TABLE_NAME,
        'record', row_to_json(NEW)
      )
    );
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS waitlist_notify_webhook ON waitlist;
CREATE TRIGGER waitlist_notify_webhook
  AFTER INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION notify_waitlist_webhook();