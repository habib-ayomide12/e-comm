import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import products from '../data/products.js'

const categories = ['All', ...new Set(products.map((product) => product.category))]

function Shop({ addToCart, toggleWishlist, wishlist = [], search = '' }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const activeCategory = categories.includes(requestedCategory)
    ? requestedCategory
    : 'All'

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          activeCategory === 'All' || product.category === activeCategory
        const matchesSearch = product.name
          .toLowerCase()
          .includes(search.trim().toLowerCase())

        return matchesCategory && matchesSearch
      }),
    [activeCategory, search],
  )

  function handleCategoryChange(event) {
    const nextParams = new URLSearchParams(searchParams)
    const nextCategory = event.target.value

    if (nextCategory === 'All') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', nextCategory)
    }

    setSearchParams(nextParams)
  }

  return (
    <main className="shop-page">
      <header className="shop-page__header">
        <p className="section-heading__eyebrow">Shop the collection</p>
        <h1>All Products</h1>
        <p>Browse our selection and find something you love.</p>
      </header>

      <section className="shop-page__content" aria-label="Product catalog">
        <div className="shop-page__toolbar">
          <label className="shop-page__filter">
            <span>Category</span>
            <select value={activeCategory} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <p className="shop-page__result-count" aria-live="polite">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="shop-page__grid">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          <p className="shop-page__empty" role="status">
            No products match your search. Try another search or category.
          </p>
        )}
      </section>
    </main>
  )
}

export default Shop
