import { Heart, PackageCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const values = [
  {
    icon: Sparkles,
    title: 'Thoughtful finds',
    description:
      'We bring together useful, well-loved essentials across fashion, tech, shoes and accessories.',
  },
  {
    icon: Heart,
    title: 'Shopping made simple',
    description:
      'A clear, friendly shopping experience helps you spend less time searching and more time enjoying.',
  },
  {
    icon: PackageCheck,
    title: 'Here to help',
    description:
      'From discovering something new to getting your order, we want every step to feel easy.',
  },
]

function About() {
  return (
    <main className="about-page">
      <header className="about-page__hero">
        <p className="section-heading__eyebrow">About ShopEase</p>
        <h1>A little easier. A lot more you.</h1>
        <p>
          We make it simple to discover everyday favorites across the things
          you love.
        </p>
        <Link className="button button--primary" to="/shop">
          Explore the shop
        </Link>
      </header>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="about-story__image-wrap">
          <img
            className="about-story__image"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=75"
            alt="A welcoming clothing and lifestyle store"
            loading="lazy"
          />
        </div>
        <div className="about-story__content">
          <p className="section-heading__eyebrow">Our story</p>
          <h2 id="about-story-title">Good finds, without the fuss.</h2>
          <p>
            ShopEase is a place to find the everyday things that make life a
            little better. From useful tech and comfortable clothing to
            footwear and accessories, we bring a variety of favorites together
            in one easy-to-browse shop.
          </p>
          <p>
            We believe online shopping should feel straightforward, welcoming
            and enjoyable. That idea guides how we curate our collection and
            how we design your experience.
          </p>
        </div>
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <header className="section-heading">
          <p className="section-heading__eyebrow">What matters to us</p>
          <h2 id="about-values-title">The ShopEase difference</h2>
          <p>A simple idea: make finding what you need feel good.</p>
        </header>
        <div className="about-values__grid">
          {values.map(({ icon: Icon, title, description }) => (
            <article className="about-value" key={title}>
              <div className="about-value__icon">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <div>
          <p className="section-heading__eyebrow">Ready to explore?</p>
          <h2 id="about-cta-title">Your next favorite is waiting.</h2>
        </div>
        <Link className="button button--primary" to="/shop">
          Shop the collection
        </Link>
      </section>
    </main>
  )
}

export default About
