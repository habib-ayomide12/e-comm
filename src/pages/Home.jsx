import { ArrowRight, Headphones, ShieldCheck, Truck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

import products from "../data/products";
import ProductCard from "../components/ProductCard";

const MotionLink = motion.create(Link);

const categories = [
  { name: "Electronics", productId: 1 },
  { name: "Fashion", productId: 5 },
  { name: "Shoes", productId: 3 },
  { name: "Accessories", productId: 4 },
];

const revealVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const staggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

function Home({ addToCart, toggleWishlist, wishlist, search }) {
  const shouldReduceMotion = useReducedMotion();
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .slice(0, 6);

  return (
    <main>
      <section className="hero">
        <motion.div
          className="hero__content"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={revealVariants}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        >
          <p className="hero__eyebrow">New collection</p>
          <h1>
            Discover Your
            <span> Perfect Style</span>
          </h1>
          <p className="hero__description">
            Discover the latest trends and shop your favorite products at
            amazing prices.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/shop">
              Shop Now
            </Link>
            <Link className="button button--secondary" to="/shop">
              Explore
            </Link>
          </div>
        </motion.div>
        <motion.img
          className="hero__image"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=75"
          alt="A curated clothing collection in a modern store"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
          }}
        />
      </section>

      <motion.section
        className="home-benefits"
        aria-label="Shopping benefits"
        variants={staggerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.article
          className="home-benefit"
          variants={revealVariants}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        >
          <Truck size={30} aria-hidden="true" />
          <div>
            <h2>Free Shipping</h2>
            <p>On orders over $100</p>
          </div>
        </motion.article>
        <motion.article
          className="home-benefit home-benefit--green"
          variants={revealVariants}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        >
          <ShieldCheck size={30} aria-hidden="true" />
          <div>
            <h2>Secure Payment</h2>
            <p>Safe and secure checkout</p>
          </div>
        </motion.article>
        <motion.article
          className="home-benefit home-benefit--purple"
          variants={revealVariants}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        >
          <Headphones size={30} aria-hidden="true" />
          <div>
            <h2>Here to Help</h2>
            <p>Contact our support team</p>
          </div>
        </motion.article>
      </motion.section>

      <section className="categories">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Explore</p>
          <h2>Shop by Category</h2>
          <p>Find exactly what you&apos;re looking for.</p>
        </div>
        <motion.div
          className="categories__grid"
          variants={staggerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map(({ name, productId }) => {
            const image = products.find((product) => product.id === productId);

            return (
              <MotionLink
                key={name}
                className="category-card"
                to={`/shop?category=${encodeURIComponent(name)}`}
                variants={revealVariants}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
              >
                <img
                  className="category-card__image"
                  src={image.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="category-card__content">
                  <h3>{name}</h3>
                  <span>Explore products</span>
                </span>
              </MotionLink>
            );
          })}
        </motion.div>
      </section>

      <section className="featured-products">
        <div className="featured-products__header">
          <div className="section-heading section-heading--left">
            <p className="section-heading__eyebrow">Our products</p>
            <h2>Featured Products</h2>
            <p>Discover our most popular products.</p>
          </div>
          <Link className="featured-products__view-all" to="/shop">
            View All
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            className="featured-products__grid"
            variants={staggerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={revealVariants}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
              >
                <ProductCard
                  product={product}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="home-products-empty" role="status">
            No products match “{search}”. Try another search.
          </p>
        )}
      </section>
    </main>
  );
}

export default Home;
