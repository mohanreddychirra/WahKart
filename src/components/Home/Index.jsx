import React, { Component, Fragment } from 'react';
import SearchField from './SearchField';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import NoProducts from './NoProducts';
import '../../stylesheets/home.scss';

class Home extends Component{
  constructor(props) {
    super(props);
    this.searchTextChange = this.searchTextChange.bind(this);
    this.state = {
      searchText: '',
      searchResult: []
    }
  }

  searchTextChange(event) {
    const { target: { value } } = event;
    const { products } = this.props;

    const result = products.filter(
      product => value.toLowerCase() === product.title.toLowerCase().substr(0, value.length)
    );

    this.setState({
      searchText: value,
      searchResult: result
    });
  }

  render() {
    return (
      <div id="home" className="aligner">

        {
          this.props.products.length > 0
          ? (
            <Fragment>
              <SearchField
                value={this.state.searchText}
                onChange={this.searchTextChange}
              />

              <ProductList
                auth={this.props.auth}
                products={
                  this.state.searchText.trim() === ''
                    ? this.props.products
                    : this.state.searchResult
                }
              />
            </Fragment>
          )
          : <NoProducts />
        }
        
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  auth: state.authReducer
});

export default connect(mapStateToProps, null)(Home);
