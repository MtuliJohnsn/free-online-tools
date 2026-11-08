const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '00003ded-4d9e-4a16-bfa1-346db9817d6d';

export interface EmailSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendEmailSubmission(submission: EmailSubmission): Promise<boolean> {
  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...submission }),
    });
    if (!response.ok) return false;
    const data: unknown = await response.json();
    return typeof data === 'object' && data !== null && (data as { success?: unknown }).success === true;
  } catch {
    return false;
  }
}
