import React, { Fragment, useState } from "react";
import PageTitle from '../../components/pagetitle';
import Navbar from '../../components/Navbar';
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Link from "next/link";
import { connect } from "react-redux";
import { totalPrice } from "../../utils";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../../store/actions/action";
import { useRouter } from "next/navigation";

const CartPage = (props) => {
  const router = useRouter();
  const { carts } = props;

  const [editableCarts, setEditableCarts] = useState(carts);
  const [isChecked, setIsChecked] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [paymentOption, setPaymentOption] = useState("paynow");

  const handleChange = (index, field, value) => {
    const updatedCarts = [...editableCarts];
    updatedCarts[index][field] = value;
    setEditableCarts(updatedCarts);
  };

  const handleProceedToCheckout = async () => {
    const userDetails = localStorage.getItem("user_details");
    if (!userDetails || userDetails === "{}") {
      router.push("/login");
    } else {
      setOpenPopup(true);
    }
  };

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleProceedToPayment = () => {
    setOpenPopup(false);
    router.push("/checkout");
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

                  <div className="terms-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      <div className="custom-checkbox"></div>
                      I accept the{" "}
                      <Link href="/tandc" style={{ textDecoration: 'underline' }} target="_blank">
                        terms and conditions
                      </Link>
                    </label>
                  </div>

                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <div
                          onClick={isChecked ? handleProceedToCheckout : null}
                          className={`theme-btn-s2 ${!isChecked ? 'disabled' : ''}`}
                        >
                          Proceed to Checkout{" "}
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Popup Dialog */}
                  <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
                    <DialogTitle>Thank You!</DialogTitle>
                    <DialogContent>
                      <p>Please choose your payment option:</p>
                      <RadioGroup value={paymentOption} onChange={handlePaymentOptionChange}>
                        <FormControlLabel value="paynow" control={<Radio />} label="Pay Now" />
                        <FormControlLabel value="paylater" control={<Radio />} label="Pay Later" />
                        <FormControlLabel value="payhalf" control={<Radio />} label="Pay Half" />
                      </RadioGroup>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleProceedToPayment} color="primary" variant="contained">
                        Proceed to Payment
                      </Button>
                    </DialogActions>
                  </Dialog>

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
