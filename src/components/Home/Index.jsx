import React, { Component, Fragment } from 'react';
import SearchField from './SearchField';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import NoProducts from './NoProducts';
import { openModal } from '../../actions/modalAction';
import '../../stylesheets/home.scss';

class Home extends Component{
  constructor(props) {
    super(props);
    this.openFilterModal = this.openFilterModal.bind(this);
    this.searchTextChange = this.searchTextChange.bind(this);
    this.state = {
      searchText: '',
      searchResult: null,
      shopFilter: null
    }
  }

  openFilterModal() {
    this.props.openModal('productFilter');
  }

  searchTextChange(event) {
    let { target: { value } } = event;
    const { products } = this.props;

    const results = products.filter(
      product => value.toLowerCase() === product.title.toLowerCase().substr(0, value.length)
    );

    this.setState({
      searchText: value,
      searchResult: results,
      shopFilter: null
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
                openFilterModal={this.openFilterModal}
              />

              <ProductList
                auth={this.props.auth}
                products={
                  this.state.searchResult === null
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
  auth: state.authReducer,
  shops: state.shopReducer.shops
});

const mapDispatchToProps = {
  openModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
