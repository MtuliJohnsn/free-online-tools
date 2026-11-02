import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { PageHeader } from '@/components/PageHeader';

const LAST_UPDATED = 'November 2, 2026';

export function PrivacyPage() {
  useDocumentMeta({
    title: 'Privacy Policy',
    description: 'How HABARI handles your information, including how our free tools, contact form and advertising work.',
  });

  return (
    <div>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description={`Last updated: ${LAST_UPDATED}`} />

      <article className="mx-auto max-w-3xl space-y-10 px-4 py-16 text-base leading-relaxed text-slate-700 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Summary</h2>
          <p>
            HABARI is built to respect your privacy. Our tools run in your web browser, and the text or numbers you enter into them are not sent to
            our servers. This policy explains the limited information we do collect and how we use it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Information you give us</h2>
          <p>
            If you contact us using the Contact Us form, we collect the name, email address, subject and message you enter. We use this information only
            to read and reply to your message. We do not add you to a marketing list without your consent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Tool data stays with you</h2>
          <p>
            Passwords, calculations, text and dates you enter into our tools are processed in your browser. We do not store them, and we cannot see them.
            Closing the page or refreshing it clears what you typed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Cookies and advertising</h2>
          <p>
            HABARI is free, and we plan to show advertisements to keep it that way. Advertising partners may use cookies or similar technologies to show
            relevant ads and measure how they perform. Where required by law, we will ask for your consent before using non-essential cookies, and you
            will be able to change your choices at any time. We will update this policy before advertising begins.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Third-party services</h2>
          <p>
            We use reputable third-party services to host HABARI, store contact form messages and load fonts. These providers process data only as needed
            to deliver their service. Their own privacy policies apply to their handling of data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Your choices</h2>
          <p>
            You can use every tool without giving us any personal information. You may ask us to delete a message you sent through the contact form by
            contacting us through the same form. You can also control cookies through your browser settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The date at the top of the page shows when it was last changed, and the latest version
            always applies.
          </p>
        </section>
      </article>
    </div>
  );
}
