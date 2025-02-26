// Import necessary modules
import moneyFormat from "../../../utils/moneyFormat";
import Api from "../../../services/api";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { useState } from "react";

export default function ProductList({ products, fetchCarts }) {
  // Token
  const token = Cookies.get("token");

  // State to manage loading for each product
  const [loadingStates, setLoadingStates] = useState({});

  // Function to add to cart
  const addToCart = (product) => {
    if (token) {
      // Set authorization header with token
      Api.defaults.headers.common['Authorization'] = token;

      // Create a promise for the API call
      const saveToCart = () => {
        return Api.post('/api/carts', {
          product_id: product.id,
          qty: 1,
          price: product.sell_price
        }).then(response => {
          // Call fetchCarts after successful addition
          fetchCarts();
          return response.data.meta.message; // Return the success message
        });
      };

      // Set loading state for the specific product to true
      setLoadingStates(prev => ({ ...prev, [product.id]: true }));

      // Use toast.promise to handle loading, success, and error states
      toast.promise(
        saveToCart(),
        {
          loading: 'Adding product to cart...',
          success: (message) => {
            // Reset loading state for the specific product
            setLoadingStates(prev => ({ ...prev, [product.id]: false }));
            return <b>{message}</b>; // Use the returned message
          },
          error: () => {
            // Reset loading state for the specific product
            setLoadingStates(prev => ({ ...prev, [product.id]: false }));
            return <b>Tidak dapat menyimpan product cart.</b>;
          },
        }
      );
    }
  };

  return (
    <div className='row mt-3'>
      {
        products.length > 0
          ? products.map((product) => (
            <div className='col-4' key={product.id}>
              <div className="card card-link card-link-pop mt-3 rounded">
                <div className="ribbon bg-success mt-3">
                  <h4 className="mb-0">{moneyFormat(product.sell_price)}</h4>
                </div>
                <div className="card-body text-center">
                  <img
                    src={`${import.meta.env.VITE_APP_BASEURL}/${product.image}`}
                    alt={product.title}
                    className="me-2 rounded"
                  />
                  <h4 className="mb-0 mt-2">{product.title}</h4>
                  <button
                    className="btn btn-primary mt-3 w-100 rounded"
                    disabled={loadingStates[product.id] || false} // Disable button if loading for this product
                    onClick={() => addToCart(product)}
                  >
                    {loadingStates[product.id] ? 'Loading...' : 'Add to Cart'} {/* Change button text based on loading state */}
                  </button>
                </div>
              </div>
            </div>
          ))
          : <div className="alert alert-danger mb-0">Product not available</div>
      }
    </div>
  );
}
