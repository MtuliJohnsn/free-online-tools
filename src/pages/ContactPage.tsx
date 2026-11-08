import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { sendEmailSubmission } from '@/lib/web3forms';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormControls';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactForm, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: ContactForm = { name: '', email: '', subject: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!form.subject.trim()) errors.subject = 'Please enter a subject.';
  if (form.message.trim().length < 10) errors.message = 'Please write at least 10 characters so we can help.';
  return errors;
}

const REASONS = ['Suggest a new tool', 'Report a bug or wrong result', 'Share feedback', 'Advertising or partnerships'];

export function ContactPage() {
  useDocumentMeta({
    title: 'Contact Us',
    description: 'Contact the HABARI team with questions, feedback, tool suggestions or partnership enquiries.',
  });

  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function update<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateForm(form);
    setErrors(validation);
    if (Object.values(validation).some(Boolean)) return;

    setStatus('submitting');
    const submission = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };
    const [{ error }, emailed] = await Promise.all([
      supabase.from('contact_messages').insert(submission),
      sendEmailSubmission(submission),
    ]);

    if (error || !emailed) {
      setStatus('error');
      return;
    }
    setForm(EMPTY_FORM);
    setStatus('success');
  }

  const submitting = status === 'submitting';

  return (
    <div>
      <PageHeader
        eyebrow="Contact us"
        title="We would love to hear from you"
        description="Ask a question, report a problem, suggest a tool or talk to us about advertising and partnerships."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-navy-900">What can we help with?</h2>
            <ul className="mt-4 space-y-3">
              {REASONS.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-slate-700">
                  <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <Mail className="h-6 w-6 text-primary-700" aria-hidden="true" />
            <p className="mt-3 font-semibold text-navy-900">Send us a message</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Use the form to reach our team directly. Please do not include passwords or other sensitive personal details in your message.
            </p>
          </div>
        </aside>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {status === 'success' ? (
            <div role="status" className="flex flex-col items-start gap-4 animate-fade-in-up">
              <CheckCircle2 className="h-12 w-12 text-success-600" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-navy-900">Thank you for your message</h2>
              <p className="text-slate-600">We have received your message and will get back to you as soon as we can.</p>
              <Button variant="secondary" onClick={() => setStatus('idle')}>
                Send another message
              </Button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  id="contact-name"
                  label="Your name"
                  autoComplete="name"
                  maxLength={100}
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  error={errors.name}
                />
                <Input
                  id="contact-email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  error={errors.email}
                />
              </div>
              <Input
                id="contact-subject"
                label="Subject"
                maxLength={150}
                value={form.subject}
                onChange={(event) => update('subject', event.target.value)}
                error={errors.subject}
              />
              <Textarea
                id="contact-message"
                label="Message"
                rows={6}
                maxLength={5000}
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
                error={errors.message}
                hint={`${form.message.length} / 5000 characters`}
              />

              {status === 'error' ? (
                <p role="alert" className="flex items-start gap-2 rounded-lg bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  We could not send your message just now. Please check your connection and try again.
                </p>
              ) : null}

              <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                {submitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
