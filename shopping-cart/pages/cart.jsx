// import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'

export default function Cart() {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state
  const removeCartHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty)
    dispatch({ type: 'CARD_ADD_ITEM', payload: { ...item, quantity } })
  }

  return (
    <Layout title={'shopping cart'}>
      <h2 className="text-center">Shopping Cart</h2>
      <div className="container">
        {cartItems.length === 0 ? (
          <div className="container text-center">
            Cart is empty.
            <div className="row">
              <button
                className="btn btn-primary mb-4"
                onClick={() => router.push('/')}
              >
                Back to shopping
              </button>
            </div>
          </div>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <img src={item.image} width={70} height={70} alt="" />
                      &nbsp;
                      {item.name}
                    </td>

                    <td>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>{item.price}$</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartHandler(item)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <div>
                Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}