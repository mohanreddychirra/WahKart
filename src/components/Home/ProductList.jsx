import React from 'react';
import ProductCard from './ProductCard';
import '../../stylesheets/home.scss';
import prodImage1 from '../../../public/images/products/1.jpg';

const ProductList = (props) => (
  <div className="row">
     { props.products.map((product, index) => (
        <div key={index} className="col-3 text-center">
          <ProductCard
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
