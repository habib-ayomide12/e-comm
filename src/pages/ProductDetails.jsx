import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import products from '../data/products.js'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function ProductDetails({
  addToCart,
  toggleWishlist,
  wishlist = [],
}) {
  const { id } = useParams()
  const product = products.find((item) => String(item.id) === id)

  if (!product) {
    return (
      <main className="product-not-found">
        <p className="section-heading__eyebrow">Product unavailable</p>
        <h1>We couldn&apos;t find that product.</h1>
        <p>It may have been removed or the link may be incorrect.</p>
        <Link className="button button--primary" to="/shop">
          Browse all products
        </Link>
      </main>
    )
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id)

  return (
    <main className="product-details">
      <div className="product-details__breadcrumb">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </div>

      <section className="product-details__layout" aria-labelledby="product-title">
        <div className="product-details__media">
          <img
            src={product.image}
            alt={product.name}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="product-details__content">
          <p className="section-heading__eyebrow">{product.category}</p>
          <h1 id="product-title">{product.name}</h1>
          <p
            className="product-details__rating"
            aria-label={`${product.rating} out of 5 stars${
              product.reviews == null ? '' : `, ${product.reviews} reviews`
            }`}
          >
            <Star size={18} fill="currentColor" aria-hidden="true" />
            <span>{product.rating}</span>
            {product.reviews != null && (
              <span className="product-card__reviews">
                ({product.reviews} reviews)
              </span>
            )}
          </p>
          <p className="product-details__price">
            {priceFormatter.format(product.price)}
          </p>
          <p className="product-details__description">
            {product.description}
          </p>

          <div className="product-details__actions">
            <button
              className="product-card__button"
              type="button"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={18} aria-hidden="true" />
              <span>Add to cart</span>
            </button>
            <button
              className={`product-details__wishlist${isWishlisted ? ' is-wishlisted' : ''}`}
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-pressed={isWishlisted}
            >
              <Heart
                size={18}
                fill={isWishlisted ? 'currentColor' : 'none'}
                aria-hidden="true"
              />
              <span>{isWishlisted ? 'Saved to wishlist' : 'Add to wishlist'}</span>
            </button>
          </div>

          <Link className="product-details__continue" to="/shop">
            Continue shopping
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails
