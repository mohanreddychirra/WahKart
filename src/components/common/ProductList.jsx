import React, { Fragment } from 'react';
import ProductCard from './ProductCard';
import '../../stylesheets/home.scss';

const ProductList = (props) => (
  <Fragment>
    <div className="row">
      { props.products.map((product, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 text-center">
            <ProductCard
              id={product.id}
              auth={props.auth}
              isVendorPage={props.isVendorPage}
              title={product.title}

              price={product.price}
              image={product.image}
            />
          </div>
      ))}
    </div>
  </Fragment>
);

export default ProductList;
