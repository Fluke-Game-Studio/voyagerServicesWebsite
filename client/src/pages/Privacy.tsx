import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, Globe, MessageSquare } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { BRAND, LEGAL } from '@/lib/content'
import { scrollToHashTarget } from '@/lib/scrollToHash'

/** Bulleted list shared by every policy section. */
function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[var(--color-ink-muted)]">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 leading-relaxed text-[var(--color-ink-muted)]">{children}</p>
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 font-display text-lg font-semibold text-[var(--color-ink)]">{children}</h3>
}

/**
 * Policy sections live in one array so the sticky table of contents and the
 * body stay in sync — add a section here and it shows up in both.
 */
const SECTIONS: { id: string; title: string; body: ReactNode }[] = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: (
      <>
        <P>We may collect personal information that you voluntarily provide to us, including:</P>
        <List
          items={[
            'Name',
            'Company name',
            'Email address',
            'Telephone or mobile phone number',
            'Mailing or business address',
            'Shipping, freight, or logistics-related information',
            'Information submitted through website forms',
            'Information you provide when requesting a quote, shipment information, customer support, or other services',
            'Communications between you and Voyager Services, including email, telephone, and SMS communications',
          ]}
        />
        <P>
          We may also automatically collect certain technical information when you visit our website, such as your IP
          address, browser type, device type, pages visited, and general website usage information.
        </P>
      </>
    ),
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Personal Information',
    body: (
      <>
        <P>Voyager Services may use personal information to:</P>
        <List
          items={[
            'Respond to inquiries and requests',
            'Provide freight, transportation, logistics, brokerage, or related services',
            'Prepare and provide shipping quotes',
            'Coordinate shipments and communicate shipment-related information',
            'Provide customer service and support',
            'Communicate regarding orders, shipments, appointments, delivery updates, account information, or service-related matters',
            'Send SMS messages when you have provided the appropriate consent',
            'Maintain and improve our services and website',
            'Maintain business and transaction records',
            'Prevent fraud, misuse, or unauthorized activity',
            'Comply with applicable laws, regulations, legal processes, and contractual obligations',
          ]}
        />
      </>
    ),
  },
  {
    id: 'how-we-share-information',
    title: 'How We Share Personal Information',
    body: (
      <>
        <P>
          <strong className="font-semibold text-[var(--color-ink)]">
            Voyager Services does not sell personal information.
          </strong>
        </P>
        <P>
          We may share information when reasonably necessary to provide our services, including with transportation
          providers, carriers, logistics providers, technology providers, payment processors, professional advisers, and
          other service providers assisting us in conducting our business.
        </P>
        <P>
          We may also disclose information when required by law, regulation, subpoena, court order, or other legal
          process, or when reasonably necessary to protect Voyager Services, our customers, or others.
        </P>

        <SubHeading>SMS Consent and Mobile Information</SubHeading>
        <div className="mt-4 rounded-[var(--radius-card)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.06] p-5">
          <p className="leading-relaxed text-[var(--color-ink)]">
            Mobile information, including mobile phone numbers and SMS opt-in consent, will not be sold, rented, or
            shared with third parties or affiliates for their own marketing or promotional purposes.
          </p>
          <p className="mt-3 leading-relaxed text-[var(--color-ink)]">
            No mobile opt-in information or text message consent will be shared with third parties or affiliates for
            marketing or promotional purposes.
          </p>
        </div>
        <P>
          We may provide mobile information to service providers solely as necessary to deliver and operate our
          messaging services, such as telecommunications and messaging platform providers. Such providers may only use
          the information to perform services on our behalf.
        </P>
      </>
    ),
  },
  {
    id: 'sms-terms',
    title: 'SMS Messaging Terms & Conditions',
    body: (
      <>
        <P>
          By providing your mobile telephone number and consenting to receive SMS messages from Voyager Services, you
          agree to receive SMS communications related to our services.
        </P>
        <P>Messages may include:</P>
        <List
          items={[
            'Shipment updates',
            'Pickup and delivery notifications',
            'Appointment or scheduling communications',
            'Shipment status requests',
            'Customer service communications',
            'Account-related notifications',
            'Freight or logistics coordination messages',
            'Other informational or conversational messages related to services you have requested',
          ]}
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Message frequency', value: 'Messaging frequency may vary.' },
            { label: 'Rates', value: 'Message and data rates may apply.' },
            { label: 'Opt out', value: 'Reply STOP to any message to stop receiving SMS messages.' },
            { label: 'Help', value: 'Reply HELP for assistance, or contact us using the details below.' },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <p className="label-mono mb-1.5">{row.label}</p>
              <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{row.value}</p>
            </div>
          ))}
        </div>
        <P>
          After opting out, you may receive a confirmation message indicating that you will no longer receive SMS
          messages from Voyager Services.
        </P>
        <P>
          <strong className="font-semibold text-[var(--color-ink)]">
            Consent to receive SMS messages is not a condition of purchasing goods or services from Voyager Services.
          </strong>
        </P>
      </>
    ),
  },
  {
    id: 'sms-consent',
    title: 'SMS Consent',
    body: (
      <>
        <P>
          We only send SMS messages where we have the appropriate consent or where otherwise permitted by applicable
          law.
        </P>
        <P>Consent may be obtained through methods including:</P>
        <List
          items={[
            'Website forms',
            'Written authorization',
            'Direct communication with Voyager Services',
            'A customer initiating an SMS conversation with Voyager Services',
            'Other lawful opt-in methods',
          ]}
        />
        <P>
          Where SMS consent is collected through a website form, consent is optional and is not automatically selected.
        </P>
        <P>Voyager Services maintains records of SMS consent where required.</P>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and Website Information',
    body: (
      <>
        <P>
          Our website may use cookies and similar technologies to operate the website, understand website usage, improve
          functionality, and maintain security.
        </P>
        <P>
          You may be able to control cookies through your browser settings. Disabling certain cookies may affect website
          functionality.
        </P>
      </>
    ),
  },
  {
    id: 'data-security',
    title: 'Data Security',
    body: (
      <>
        <P>
          Voyager Services uses reasonable administrative, technical, and organizational safeguards designed to protect
          personal information from unauthorized access, loss, misuse, disclosure, alteration, or destruction.
        </P>
        <P>However, no Internet transmission or electronic storage system can be guaranteed to be completely secure.</P>
      </>
    ),
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    body: (
      <P>
        We retain personal information only for as long as reasonably necessary for the purposes described in this
        Privacy Policy, including fulfilling business, contractual, legal, accounting, and regulatory obligations.
      </P>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your Choices',
    body: (
      <>
        <P>
          You may contact Voyager Services to request that we update or correct personal information we maintain about
          you.
        </P>
        <P>
          You may unsubscribe from marketing communications using the unsubscribe instructions provided in those
          communications.
        </P>
        <P>For SMS communications, reply STOP at any time to opt out.</P>
      </>
    ),
  },
  {
    id: 'third-party-websites',
    title: 'Third-Party Websites',
    body: (
      <>
        <P>
          Our website may contain links to third-party websites or services. Voyager Services is not responsible for the
          privacy practices or content of those third-party websites.
        </P>
        <P>
          We encourage you to review the privacy policies of third-party websites before providing them with personal
          information.
        </P>
      </>
    ),
  },
  {
    id: 'childrens-privacy',
    title: "Children's Privacy",
    body: (
      <>
        <P>
          Voyager Services' services are intended for businesses and adults and are not directed toward children under
          13.
        </P>
        <P>We do not knowingly collect personal information from children under 13 through our website.</P>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Privacy Policy',
    body: (
      <>
        <P>Voyager Services may update this Privacy Policy periodically.</P>
        <P>
          Any updates will be posted on this page with an updated effective date. We encourage you to review this
          Privacy Policy periodically.
        </P>
      </>
    ),
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    body: (
      <>
        <P>
          If you have questions regarding this Privacy Policy, our privacy practices, or SMS communications, please
          contact:
        </P>
        <div className="glass-raised mt-5 rounded-[var(--radius-card)] p-6">
          <p className="font-display text-lg font-semibold text-[var(--color-ink)]">{BRAND.name}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2.5 text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                {BRAND.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${BRAND.phoneHref}`}
                className="inline-flex items-center gap-2.5 text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
              >
                <Phone className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                {BRAND.phone}
              </a>
            </li>
            <li>
              <a
                href={`https://${BRAND.website}`}
                className="inline-flex items-center gap-2.5 text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
              >
                <Globe className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                {BRAND.website}
              </a>
            </li>
          </ul>
        </div>
      </>
    ),
  },
]

export function Privacy() {
  /**
   * Anchor clicks are handled manually rather than via <Link to="/privacy#x">:
   * re-clicking the same entry wouldn't change the location, so the router
   * would never re-fire and the scroll wouldn't happen.
   */
  const onTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    window.history.replaceState(null, '', `#${id}`)
    scrollToHashTarget(`#${id}`)
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.3]" />
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-[var(--color-accent)] opacity-15 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24">
        {/* header */}
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="show" className="max-w-3xl">
          <motion.p variants={fadeUp} className="label-mono mb-3">
            Legal
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] md:text-5xl"
          >
            Privacy Policy
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 font-mono text-sm text-[var(--color-ink-faint)]">
            Effective date: {LEGAL.privacyEffectiveDate}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-6 text-lg leading-relaxed text-[var(--color-ink-muted)]">
            Voyager Services (“Voyager,” “we,” “us,” or “our”) respects your privacy and is committed to protecting the
            personal information you provide to us. This Privacy Policy explains what information we collect, how we use
            it, how it may be shared, and the choices available to you.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            By using our website, submitting information through our forms, communicating with us, or using our
            services, you acknowledge the practices described in this Privacy Policy.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#sms-terms"
              onClick={(e) => onTocClick(e, 'sms-terms')}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2 text-sm text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
            >
              <MessageSquare className="h-4 w-4 text-[var(--color-accent)]" /> SMS Terms &amp; Conditions
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-2 text-sm text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
            >
              <Mail className="h-4 w-4 text-[var(--color-accent)]" /> Contact us
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* sticky table of contents */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28">
              <p className="label-mono mb-4">On this page</p>
              <ul className="space-y-2 border-l border-[var(--color-border-soft)]">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => onTocClick(e, s.id)}
                      className="-ml-px block border-l border-transparent py-1 pl-4 text-sm leading-snug text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
                    >
                      <span className="mr-1.5 font-mono text-xs text-[var(--color-ink-faint)]">{i + 1}.</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* policy body */}
          <div className="min-w-0 max-w-3xl">
            {SECTIONS.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="border-t border-[var(--color-border-soft)] py-10 first:border-0 first:pt-0"
              >
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-[var(--color-ink)]">
                  <span className="mr-2 font-mono text-base text-[var(--color-accent)]">{i + 1}.</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
