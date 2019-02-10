import React, { Component} from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import history from '../../history'; 
import { addProduct, editProduct } from '../../actions/productAction';
import '../../stylesheets/product.scss'
import Wrapper from './Wrapper';

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.extractProductDetails = this.extractProductDetails.bind(this);

    this.state = {
      page: 0,
      error: null,
      form: {
        title: '',
        price: '',
        image: ''
      }
    }
  }

  componentWillMount() {
    const { products, match, match: { params: { productId } } } = this.props;

    const page = match.path === '/product/add' ? 0 : 1;
    this.setState({ page });
      
    if (page === 0) {
      this.setState({ form: {
        title: '',
        price: '',
        image: ''
      } });
    } else {
      const product = products.filter(prod => `${prod.id}` === `${productId}`)[0] || null;
      if (product) {
        this.setState({ form: {
          ...this.extractProductDetails(product)
        }});
      }
    }
  }

  /**
   * 
   * @description Handles when page is reloaded
   * 
   * @param {*} nextProps 
   */
  componentWillReceiveProps(nextProps) {
    const { auth } = this.props;
    const { page } = this.state;

    const {
      match: { params: { productId } },
      auth: nextAuth,
      products
    } = nextProps;

    if (page === 1) {
      if (auth.inProgress === true && nextAuth.inProgress === false) {
        const product = products.filter(prod => `${prod.id}` === `${productId}`)[0] || null;
        if (!product) {
          history.push('/');
          return false;
        }
        
        this.setState({ form: {
          ...this.extractProductDetails(product)
        }});
      }
    }
  
    return true;
  }

  onChange(event) {
    const { target: { name, value } } = event;

    this.setState(prevState => ({
      error: null,
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  }

  onSubmit(event) {
    const { shopId, history, match: { params: { productId }} } = this.props;
    const { page } = this.state;
    event.preventDefault();

    const promise = page === 0
      ? this.props.addProduct(this.state.form, shopId)
      : this.props.editProduct(productId, this.state.form, shopId);

    promise
      .then(() => {
        history.push('/');
        toastr.success(
          page === 0
            ? 'Product created successfully'
            : 'Product updated successfully'
        );
      })
      .catch(error => {
        const { message } = error.response.data;
        this.setState({ error: message });
      });
  }

  extractProductDetails(product) {
    const { title, image, price } = product;
    return { title, image, price };
  }

  render() {
    const { page, form, error  } = this.state;

    return (
      <Wrapper>
        <div id="manage-product">
          <div className="form-box">
            <div className="heading">
              <i className="fas fa-edit mr-3" />
              { page === 1 ? 'Edit' : 'Add new' } product
            </div>

            <div className={`status-div ${ error && 'error'}`}>
              {
                error
                  ? error
                  : 'Please provide required details'
              }
            </div>

            <form onSubmit={this.onSubmit}>
              <div className="fieldset">
                <label>Title</label>
                <input
                  name="title"
                  type="title"
                  value={form.title}
                  onChange={this.onChange}
                />
              </div>

              <div className="fieldset">
                <label>Price</label>
                <input
                  name="price"
                  type="title"
                  value={form.price}
                  onChange={this.onChange}
                />
              </div>

              <div className="fieldset">
                <label>Image URL</label>
                <input
                  name="image"
                  type="title"
                  value={form.image}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                className="form-button"
              >
                { page === 1 ? 'UPDATE' : 'ADD PRODUCT' }
              </button>
            </form>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  products: state.productReducer.products,
  shopId: state.vendorReducer.shop ? state.vendorReducer.shop.id : null
});

const mapDispatchToProps = {
  addProduct,
  editProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
