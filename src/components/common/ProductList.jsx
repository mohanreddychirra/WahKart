import React, { Fragment } from 'react';
import ProductCard from './ProductCard';
// import Pagination from './Pagination';
import '../../stylesheets/home.scss';

const ProductList = (props) => (
  <Fragment>
    <div className="row">
      { props.products.map((product, index) => (
          <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-3 text-center">
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
    {/* <div className="pagination-wrapper"><Pagination /></div> */}
  </Fragment>
);

export default ProductList;
