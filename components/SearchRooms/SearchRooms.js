import React from "react";
import Link from "next/link";

const SearchRooms = ({ products, addToCartProduct }) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };


  return (
    <section className="Room-area section-padding">
      <div className="Room-section">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12 sortable-gallery">
              <div className="gallery-container">
                {products.length > 0 &&
                  products.slice(0, 6).map((product, pitem) => (
                    <div className="grid" key={pitem}>
                      <div className="room-item">
                        <img src={product.proImg} alt="" className="img img-responsive" />
                        <div className="room-text-show">
                          <h2>{product.title}</h2>
                        </div>
                        <div className="room-text-hide">
                          <h2><Link onClick={ClickHandler} href="/select-single/[slug]" as={`/select-single/${product.slug}`}>{product.title}</Link></h2>
                          <ul>
                            <li><i className="fi flaticon-expand-arrows"></i>{product.sqm} sqm</li>
                            <li><i className="fi flaticon-bed"></i>{product.bedroom} Bed</li>
                            <li><i className="fi flaticon-bathtub"></i>{product.bathroom} Bathroom</li>
                          </ul>
                          <small>From: <span>${product.price}</span> / Night</small>
                          <Link className="read-more" onClick={ClickHandler} href="/select-single/[slug]" as={`/select-single/${product.slug}`}>Room Details <i className="fa fa-long-arrow-right"></i></Link>
                          <div className="add-to-cart">
                            <button
                              className="theme-btn-s2 mt-3"
                              data-bs-toggle="tooltip"
                              data-bs-html="true"
                              title="Add to Cart"
                              onClick={() => addToCartProduct(product)}
                            >
                              Select this room
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default SearchRooms;
