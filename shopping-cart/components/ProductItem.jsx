import Link from 'next/link'
import React from 'react'

export default function ProductItem({ product }) {
  return (
    <div className="col">
      <div className="card text-center">
        <img src={product.image} alt={product.name} className="imagen-card" />

        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.category}</p>
          <p className="card-text">${product.price}</p>
          <Link href={`/product/${product.slug}`}>
            <a>
              <button className="btn btn-primary">View product</button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
