import { Link } from 'react-router-dom'

const shopLinks = [
  ['Electronics', 'Electronics'],
  ['Fashion', 'Fashion'],
  ['Shoes', 'Shoes'],
  ['Accessories', 'Accessories'],
]
const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__about">
          <Link className="footer__brand" to="/">
            ShopEase
          </Link>
          <p>
            Your modern online store for fashion, electronics, shoes and
            accessories.
          </p>
        </div>

        <nav className="footer__column" aria-label="Shop categories">
          <h2>Shop</h2>
          {shopLinks.map(([label, category]) => (
            <Link
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <nav className="footer__column" aria-label="Customer service">
          <h2>Explore</h2>
          <Link to="/">Home</Link>
          <Link to="/shop">All products</Link>
          <a href="mailto:support@shopease.example">Contact support</a>
        </nav>

        <div className="footer__newsletter">
          <h2>Stay in the loop</h2>
          <p>Get updates about new products and offers.</p>
          <a href="mailto:support@shopease.example">Contact us</a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {currentYear} ShopEase. All rights reserved.</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}

export default Footer
