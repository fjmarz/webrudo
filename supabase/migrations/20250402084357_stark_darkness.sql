/*
  # Add database webhook for waitlist notifications

  1. Changes
    - Create a trigger function that sends webhook notifications when new records are inserted
    - Create a trigger that fires the function after insert
*/

-- Create the trigger function
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