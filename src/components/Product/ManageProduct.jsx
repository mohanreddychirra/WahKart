import React, { Component} from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { addProduct, editProduct } from '../../actions/productAction';
import '../../stylesheets/product.scss'

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkVendor = this.checkVendor.bind(this);

    this.state = {
      page: 1,
      error: null,
      form: {
        title: '',
        price: '',
        image: ''
      }
    }
  }

  checkVendor(props) {
    const { history, match, auth } = props;

    if(auth.role !== 'vendor') {
      history.push('/');
    } else {
      const page = match.path === '/product/add' ? 0 : 1;
      this.setState({ page });
      if (page === 0) {
        this.setState({ form: {
          title: '',
          price: '',
          image: ''
        } });
      }
    }
  }
  
  componentWillMount() {    
    this.checkVendor(this.props);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.state.page !== nextState.page) {
      this.checkVendor(nextProps);
    }
  }

  componentDidMount() {
    const { history, products, match: { params: { productId } } } = this.props;
    const { page } = this.state;

    if (page === 1) {
      const product = products.filter(prod => `${prod.id}` === `${productId}`);
      if (product.length !== 1) {
        history.push('/');
      } else {
        this.setState({ form: {
          ...product[0]
        }})
      }
    }
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
    const { history, match: { params: { productId }} } = this.props;
    const { page } = this.state;
    event.preventDefault();

    const promise = page === 0
      ? this.props.addProduct(this.state.form)
      : this.props.editProduct(productId, this.state.form);

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

  render() {
    const { page, form, error  } = this.state;

    return (
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
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  products: state.productReducer.products
});

const mapDispatchToProps = {
  addProduct,
  editProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
