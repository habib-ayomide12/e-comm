import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, UserRound } from 'lucide-react'

function Account({ cartCount = 0, wishlistCount = 0 }) {
  return (
    <main className="account-page">
      <header className="account-page__header">
        <p className="section-heading__eyebrow">Your ShopEase</p>
        <h1>My Account</h1>
        <p>Your shopping, all in one place.</p>
      </header>

      <section className="account-content" aria-labelledby="account-welcome-title">
        <div className="account-welcome">
          <div className="account-welcome__icon">
            <UserRound size={26} aria-hidden="true" />
          </div>
          <div>
            <h2 id="account-welcome-title">Welcome to ShopEase</h2>
            <p>
              Account sign-in is not available yet. In the meantime, you can
              keep browsing products and manage your cart and wishlist here.
            </p>
          </div>
        </div>

        <div className="account-shortcuts">
          <Link className="account-shortcut" to="/cart">
            <span className="account-shortcut__icon">
              <ShoppingBag size={21} aria-hidden="true" />
            </span>
            <span>
              <strong>Your cart</strong>
              <span>
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </span>
            <span className="account-shortcut__arrow" aria-hidden="true">→</span>
          </Link>

          <Link className="account-shortcut" to="/wishlist">
            <span className="account-shortcut__icon">
              <Heart size={21} aria-hidden="true" />
            </span>
            <span>
              <strong>Your wishlist</strong>
              <span>
                {wishlistCount} {wishlistCount === 1 ? 'saved item' : 'saved items'}
              </span>
            </span>
            <span className="account-shortcut__arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <p className="account-help">
          Need a hand? <Link to="/contact">Contact our support team</Link>.
        </p>
      </section>
    </main>
  )
}

export default Account
