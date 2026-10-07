import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

function ProductCard({
  product,
  addToCart,
  toggleWishlist,
  isWishlisted = false,
  loading = 'lazy',
}) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link
          className="product-card__image-link"
          to={`/product/${product.id}`}
          aria-label={`View ${product.name} details`}
        >
          <img
            className="product-card__image"
            src={product.image}
            alt=""
            loading={loading}
            fetchPriority={loading === 'eager' ? 'high' : 'auto'}
            decoding="async"
          />
        </Link>
        <button
          className={`product-card__wishlist${isWishlisted ? ' is-wishlisted' : ''}`}
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={`${isWishlisted ? 'Remove from' : 'Add to'} wishlist: ${product.name}`}
          aria-pressed={isWishlisted}
        >
          <Heart
            size={19}
            fill={isWishlisted ? 'currentColor' : 'none'}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="product-card__content">
        <div className="product-card__meta">
          <p className="product-card__category">{product.category}</p>
          <p
            className="product-card__rating"
            aria-label={`${product.rating} out of 5 stars`}
          >
            <Star size={16} fill="currentColor" aria-hidden="true" />
            <span>{product.rating}</span>
            {product.reviews != null && (
              <span className="product-card__reviews">({product.reviews})</span>
            )}
          </p>
        </div>

        <Link className="product-card__name-link" to={`/product/${product.id}`}>
          <h2 className="product-card__name">{product.name}</h2>
        </Link>

        <div className="product-card__footer">
          <p className="product-card__price">${product.price.toFixed(2)}</p>
          <button
            className="product-card__button"
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} aria-hidden="true" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
