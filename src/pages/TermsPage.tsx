import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { PageHeader } from '@/components/PageHeader';

const LAST_UPDATED = 'November 2, 2026';

export function TermsPage() {
  useDocumentMeta({
    title: 'Terms and Conditions',
    description: 'The terms that apply when you use HABARI free online tools and website.',
  });

  return (
    <div>
      <PageHeader eyebrow="Legal" title="Terms and Conditions" description={`Last updated: ${LAST_UPDATED}`} />

      <article className="mx-auto max-w-3xl space-y-10 px-4 py-16 text-base leading-relaxed text-slate-700 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Acceptance of these terms</h2>
          <p>
            By using the HABARI website and its tools, you agree to these Terms and Conditions. If you do not agree, please stop using the website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Using our tools</h2>
          <p>
            HABARI provides free tools for general information and everyday use. You may use them for personal and commercial purposes. You are
            responsible for checking results before relying on them.
          </p>
          <p>
            Calculators such as the loan, discount and age calculators give estimates based on the figures you enter. They are not financial, legal or
            professional advice. Always confirm important figures with your bank, lender or a qualified professional.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Acceptable use</h2>
          <p>
            Please use HABARI lawfully and respectfully. You must not attempt to disrupt or damage the website, interfere with other users, or use our
            contact form to send spam, abusive content or malicious material.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Intellectual property</h2>
          <p>
            The HABARI name, logo, website design and content are owned by HABARI. You may share links to our pages, but you may not copy or reuse our
            branding or design without written permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Advertising and links</h2>
          <p>
            HABARI may display advertisements and may link to third-party websites. We do not control those websites or advertisers and are not
            responsible for their content, products or services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Disclaimer and limitation of liability</h2>
          <p>
            HABARI is provided "as is" and "as available", without warranties of any kind. To the fullest extent permitted by law, HABARI is not liable
            for any loss or damage arising from your use of the website or reliance on its tools.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of HABARI after changes are posted means you accept the updated terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-navy-900">Contact</h2>
          <p>
            If you have questions about these terms, please reach out through our Contact Us page.
          </p>
        </section>
      </article>
    </div>
  );
}
