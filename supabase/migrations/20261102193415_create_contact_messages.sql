/*
# Create contact_messages table

1. New Tables
- `contact_messages`: messages submitted through the HABARI Contact Us form.
  - `id` (uuid, primary key)
  - `name` (text, required, up to 100 characters)
  - `email` (text, required, up to 255 characters)
  - `subject` (text, required, up to 150 characters)
  - `message` (text, required, up to 5000 characters)
  - `created_at` (timestamp, defaults to now)

2. Security
- Row level security is enabled.
- Visitors (anonymous and signed-in) can only INSERT new messages. They cannot read, edit or delete messages through the public site.
- Only the SELECT/UPDATE/DELETE privileges are withheld so message contents stay private.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 150),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);
