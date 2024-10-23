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
// import './CartPage.scss'; // Import your custom styles

const CartPage = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { carts } = props;

  // State for holding editable values (optional, can be managed through Redux)
  const [editableCarts, setEditableCarts] = useState(carts);

  const handleChange = (index, field, value) => {
    const updatedCarts = [...editableCarts];
    updatedCarts[index][field] = value;
    setEditableCarts(updatedCarts);
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
                                value={catItem.checkIn} // Ensure this is in 'YYYY-MM-DDTHH:MM' format
                                onChange={(e) => handleChange(crt, 'checkIn', e.target.value)}
                                className="editable-input"
                              />
                            </td>
                            <td className="stock">
                              <input
                                type="datetime-local"
                                value={catItem.checkOut} // Ensure this is in 'YYYY-MM-DDTHH:MM' format
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
                        <Link
                          onClick={ClickHandler}
                          className="theme-btn-s2"
                          href="/search-result"
                        >
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
                      <li>
                        Sub Price<span>${totalPrice(carts)}</span>
                      </li>
                      <li>
                        Vat<span>$0</span>
                      </li>
                      <li>
                        Eco Tax<span>$0</span>
                      </li>
                      <li>
                        Delivery Charge<span>$0</span>
                      </li>
                      <li className="cart-b">
                        Total Price<span>${totalPrice(carts)}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          className="theme-btn-s2"
                          href="/checkout"
                        >
                          Proceed to Checkout{" "}
                        </Link>
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
