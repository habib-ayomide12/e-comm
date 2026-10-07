import { useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'

const supportEmail = 'support@shopease.example'

function Contact() {
  const [emailOpened, setEmailOpened] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name').trim()
    const email = formData.get('email').trim()
    const subject = formData.get('subject').trim()
    const message = formData.get('message').trim()
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.assign(mailto)
    setEmailOpened(true)
  }

  return (
    <main className="contact-page">
      <header className="contact-page__header">
        <p className="section-heading__eyebrow">We&apos;re here to help</p>
        <h1>Contact us</h1>
        <p>Have a question? Send our team a message and we&apos;ll be glad to help.</p>
      </header>

      <section className="contact-content" aria-label="Contact ShopEase">
        <div className="contact-info">
          <div className="contact-info__icon">
            <MessageCircle size={24} aria-hidden="true" />
          </div>
          <h2>Let&apos;s talk</h2>
          <p>
            For help with products or your order, send us a message using the
            form. Your email app will open with the message ready to send.
          </p>
          <a className="contact-info__email" href={`mailto:${supportEmail}`}>
            <Mail size={18} aria-hidden="true" />
            {supportEmail}
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__field">
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-subject">Subject</label>
            <input id="contact-subject" name="subject" type="text" required />
          </div>
          <div className="contact-form__field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              required
            />
          </div>
          <button className="button button--primary" type="submit">
            Open email app
          </button>
          {emailOpened && (
            <p className="contact-form__hint" role="status">
              If your email app didn&apos;t open, email us at{' '}
              <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default Contact
