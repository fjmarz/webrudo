/*
  # Create waitlist table with proper RLS policies

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `box` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for inserting new entries
    - Add policy for reading own entries
*/

-- Create the table if it doesn't exist
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

-- Create new policies
CREATE POLICY "Enable insert access for all users" ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON waitlist
  FOR SELECT
  TO public
  USING (true);