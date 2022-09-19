import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import data from '../../utils/data'
import { Store } from '../../utils/Store'
import Swal from 'sweetalert2'
export default function ProductScreen() {
  const { state, dispatch } = useContext(Store)
  const router = useRouter()
  const { query } = useRouter()
  const { slug } = query
  const product = data.products.find((x) => x.slug === slug)

  if (!product) {
    return <div>This product not found</div>
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.countInStock < quantity) {
      Swal.fire(`Sorry, ${product.name}, is out of stock`)
      return
    }

    dispatch({ type: 'CARD_ADD_ITEM', payload: { ...product, quantity } })
    router.push('/cart')
  }
  return (
    <div>
      <Layout title={`${product.name} page`}>
        <h2 className="text-center mt-5 mb-5">{product.name}</h2>

        <div className="container-fluid">
          <div
            className="card mb-3 maximo-card"
            style={{ margin: '0 auto', float: 'none', marginBottom: '10px' }}
          >
            <div className="row g-0 d-flex ">
              <div className="col-md-4 ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid card-img-top rounded-start"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Name: {product.name}</h5>
                  <h5 className="card-title">Price: {product.price}</h5>
                  <h5 className="card-title">Category: {product.category}</h5>
                  <h5 className="card-title">Rating: {product.rating}</h5>
                  <p>Description: {product.description}</p>
                  <p>
                    In Stock:{' '}
                    {product.countInStock > 0
                      ? ` ${product.countInStock} units`
                      : ('No', (product.countInStock = 0))}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-content-center">
            <button
              className="btn btn-primary mb-4 "
              onClick={() => router.push('/')}
            >
              Back to shopping
            </button>
          </div>
        </div>
      </Layout>
    </div>
  )
}
