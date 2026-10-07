import { useState } from 'react'
import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  search = '',
  setSearch = () => {},
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar" id="top" aria-label="Main navigation">
      <Link className="navbar__brand" to="/" onClick={closeMenu}>
        ShopEase
      </Link>

      <div className={`navbar__links${menuOpen ? ' is-open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/shop" onClick={closeMenu}>Shop</Link>
        <Link to="/wishlist" onClick={closeMenu}>Wishlist</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </div>

      <label className="navbar__search">
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
      </label>

      <div className="navbar__actions">
        <Link
          className="icon-button navbar__wishlist"
          to="/wishlist"
          aria-label={`Wishlist, ${wishlistCount} items`}
        >
          <Heart aria-hidden="true" />
          {wishlistCount > 0 && <span>{wishlistCount}</span>}
        </Link>
        <Link className="icon-button" to="/account" aria-label="Account">
          <User aria-hidden="true" />
        </Link>
        <Link
          className="icon-button navbar__cart"
          to="/cart"
          aria-label={`Shopping cart, ${cartCount} items`}
        >
          <ShoppingCart aria-hidden="true" />
          <span>{cartCount}</span>
        </Link>
      </div>

      <button
        className="icon-button navbar__menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </nav>
  )
}

export default Navbar
