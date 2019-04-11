import React from 'react';
import ProductCard from '../common/ProductCard';
import '../../stylesheets/home.scss';

const ProductList = (props) => (
  <div className="row">
     { props.products.map((product, index) => (
        <div key={index} className="col-xs-12 col-md-6 col-lg-4 col-xl-3 text-center">
          <ProductCard
            id={product.id}
            auth={props.auth}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        </div>
     ))}
  </div>
);

export default ProductList;
