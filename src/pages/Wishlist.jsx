import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'

function Wishlist({ items = [], addToCart, toggleWishlist }) {
  return (
    <main className="wishlist-page">
      <header className="wishlist-page__header">
        <p className="section-heading__eyebrow">Your saved favorites</p>
        <h1>My Wishlist</h1>
        <p>
          {items.length} {items.length === 1 ? 'item' : 'items'} saved
        </p>
      </header>

      {items.length === 0 ? (
        <section className="wishlist-empty" aria-labelledby="wishlist-empty-title">
          <div className="wishlist-empty__icon" aria-hidden="true">♡</div>
          <h2 id="wishlist-empty-title">Your wishlist is empty</h2>
          <p>Save products you love and they&apos;ll be waiting for you here.</p>
          <Link className="button button--primary" to="/shop">
            Browse products
          </Link>
        </section>
      ) : (
        <section className="wishlist-content" aria-label="Saved products">
          <div className="wishlist-content__grid">
            {items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                isWishlisted
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default Wishlist
