'use client'

import { products } from '@/components/server/data'

export default function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <article className="product-card" key={product.name}>
          <div className={`product-image ${product.tone}`}>
            {index === 0 && <span className="product-badge">Bestseller</span>}
            <img className="product-photo" src={product.photo} alt={product.name} />
          </div>
          <div className="product-meta"><div><h3>{product.name}</h3>{product.type && <p>{product.type}</p>}</div></div>
        </article>
      ))}
    </div>
  )
}
