import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Store } from '../utils/Store'
export default function Navbar() {
  const { state, dispatch } = useContext(Store)

  const { cart } = state

  const [cartItemsCount, setcartItemsCount] = useState(0)

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">Storage</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/cart">
                <a className="nav-link">
                  Cart{' '}
                  <span className="text-white bg-danger rounded p-1">
                    {' '}
                    {cartItemsCount}
                  </span>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="">
                <a className="nav-link">Others</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
