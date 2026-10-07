import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function Cart({ items = [], onQuantityChange, onRemove }) {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <main className="cart-page">
      <header className="cart-page__header">
        <p className="section-heading__eyebrow">Your selections</p>
        <h1>Shopping Cart</h1>
        <p>
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </header>

      {items.length === 0 ? (
        <section className="cart-empty" aria-labelledby="cart-empty-title">
          <div className="cart-empty__icon" aria-hidden="true">🛒</div>
          <h2 id="cart-empty-title">Your cart is empty</h2>
          <p>Browse the shop and add something you love.</p>
          <Link className="button button--primary" to="/shop">
            Browse products
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  className="cart-item__image"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
                <div className="cart-item__details">
                  <p className="product-card__category">{item.category}</p>
                  <h2>{item.name}</h2>
                  <p className="cart-item__price">
                    {priceFormatter.format(item.price)}
                  </p>
                  <div className="cart-item__actions">
                    <div
                      className="cart-quantity"
                      aria-label={`Quantity for ${item.name}`}
                    >
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          onQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={15} aria-hidden="true" />
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() =>
                          onQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={15} aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      className="cart-item__remove"
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                <p className="cart-item__total">
                  {priceFormatter.format(item.price * item.quantity)}
                </p>
              </article>
            ))}
            <Link className="cart-continue" to="/shop">
              Continue shopping
            </Link>
          </section>

          <aside className="cart-summary" aria-labelledby="cart-summary-title">
            <h2 id="cart-summary-title">Order summary</h2>
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>{priceFormatter.format(subtotal)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="cart-summary__total">
              <span>Total</span>
              <span>{priceFormatter.format(subtotal)}</span>
            </div>
            <button className="cart-summary__checkout" type="button" disabled>
              Checkout coming soon
            </button>
            <p className="cart-summary__note">
              Shipping and taxes are calculated at checkout.
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}

export default Cart
