import React, { Fragment, useState } from "react";
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { connect } from "react-redux";
import { totalPrice } from "../../utils";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../store/actions/action";
import { useRouter } from "next/navigation";

const CartPage = (props) => {
  const router = useRouter();
  const { carts } = props;

  // State for holding editable values (optional)
  const [editableCarts, setEditableCarts] = useState(carts);

  const handleChange = (index, field, value) => {
    const updatedCarts = [...editableCarts];
    updatedCarts[index][field] = value;
    setEditableCarts(updatedCarts);
  };

  const handleProceedToCheckout = async () => {
    const userDetails = localStorage.getItem("user_details");
    
    // Check if userDetails is null or not a valid JSON
    if (!userDetails || userDetails === "{}") {
      // If user_details is not found, redirect to login
      router.push("/login");
    } else {
      // Parse the user details from localStorage
      const parsedUserDetails = JSON.parse(userDetails);
      const email = parsedUserDetails.email; // Assuming user_details contains email
  
      // Prepare the checkout details from the editable carts
      const checkoutDetails = editableCarts.map(item => ({
        title: item.title,
        capacity: item.capacity,
        qty: item.qty,
        checkIn: item.checkIn,
        checkOut: item.checkOut,
        price: item.price,
      }));
  
      console.log("Checkout Details:", checkoutDetails);
  
      try {
        const response = await fetch('https://hotel-website-backend-eosin.vercel.app/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, checkout_details: checkoutDetails }),
        });
  
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log("Checkout successful:", jsonResponse);
          // Redirect to a confirmation page or the checkout page
          router.push("/checkout"); // Adjust this path as necessary
        } else {
          const errorResponse = await response.json();
          console.error("Checkout error:", errorResponse);
          alert("Error during checkout: " + (errorResponse.error || "An unknown error occurred."));
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
      }
    }
  };
  

  return (
    <Fragment>
      <Navbar hclass={'wpo-header-style-3'} />
      <PageTitle pageTitle={"Cart"} pagesub={"Cart"} />
      <div className="cart-area section-padding">
        <div className="container">
          <div className="form">
            <div className="cart-wrapper">
              <div className="row">
                <div className="col-12">
                  <form action="cart">
                    <table className="table-responsive cart-wrap">
                      <thead>
                        <tr>
                          <th className="product-2">Room type</th>
                          <th className="pr">Capacity</th>
                          <th className="ptice">Quantity</th>
                          <th className="stock">Check-in</th>
                          <th className="stock">Check-out</th>
                          <th className="stock">Gross Total</th>
                          <th className="remove remove-b">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts && carts.length > 0 && carts.map((catItem, crt) => (
                          <tr key={crt}>
                            <td className="product">
                              <ul>
                                <li className="first-cart">{catItem.title}</li>
                              </ul>
                            </td>
                            <td className="ptice">
                              <input
                                type="text"
                                value={catItem.capacity}
                                onChange={(e) => handleChange(crt, 'capacity', e.target.value)}
                                className="editable-input"
                              />
                            </td>
                            <td className="ptice">
                              <input
                                type="number"
                                value={catItem.qty}
                                onChange={(e) => handleChange(crt, 'qty', e.target.value)}
                                className="editable-input"
                              />
                            </td>
                            <td className="stock">
                              <input
                                type="datetime-local"
                                value={catItem.checkIn}
                                onChange={(e) => handleChange(crt, 'checkIn', e.target.value)}
                                className="editable-input"
                              />
                            </td>
                            <td className="stock">
                              <input
                                type="datetime-local"
                                value={catItem.checkOut}
                                onChange={(e) => handleChange(crt, 'checkOut', e.target.value)}
                                className="editable-input"
                              />
                            </td>
                            <td className="stock">${catItem.qty * catItem.price}</td>
                            <td className="action">
                              <ul>
                                <li
                                  className="w-btn"
                                  onClick={() => props.removeFromCart(catItem.id)}
                                >
                                  <i className="fi ti-trash"></i>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>
                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <Link onClick={() => window.scrollTo(10, 0)} className="theme-btn-s2" href="/search-result">
                          Add Another{" "}
                        </Link>
                      </li>
                      <li>
                        <button type="submit">Update Cart</button>
                      </li>
                    </ul>
                  </div>
                  <div className="cart-product-list">
                    <ul>
                      <li>
                        Total Room<span>( {carts.length} )</span>
                      </li>
                      <li className="cart-b">
                        Total Price<span>${totalPrice(carts)}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <div onClick={handleProceedToCheckout} className="theme-btn-s2">
                          Proceed to Checkout{" "}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};

export default connect(mapStateToProps, {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
})(CartPage);
