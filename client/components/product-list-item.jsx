import React from 'react';

export default function ProductListItem(props) {
  const price = `$${parseInt((props.product.price) / 100).toFixed(2)}`;
  return (
    <div
      className="product-list-item justify-content-center card col-lg-3 col-md-5 m-4"
      onClick={() => props.setViewCallback('details', {
        productId: props.product.productId
      })}>
      <div className="container product-image-container">
        <img
          src={props.product.image}
          className="card-img-top product-image"
          alt="product image"
        />
      </div>
      <div className="card-body p-2">
        <h5 className="card-title">{props.product.name}</h5>
        <p className="card-text">{price}</p>
        <p className="card-text">{props.product.shortDescription}</p>
      </div>
    </div>
  );
}
