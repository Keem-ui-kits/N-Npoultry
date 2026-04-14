/**
 * Escapes HTML special characters to prevent XSS in email templates.
 * Used by all API route handlers that inject user input into HTML strings.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Persists a form submission to a Supabase table.
 * Fails silently — a DB write failure should never block the email send.
 *
 * @param table - The Supabase table name (e.g. 'contact_submissions')
 * @param data  - The row to insert (must match the table schema)
 */
export async function persistToSupabase(
  table: string,
  data: Record<string, string | undefined>
): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    await supabase.from(table).insert([data]);
  } catch (err) {
    console.error(`Supabase insert failed (${table}):`, err);
  }
}
