import React, { Component} from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import history from '../../history'; 
import { addProduct, editProduct } from '../../actions/productAction';
import '../../stylesheets/product.scss'
import Wrapper from './Wrapper';
import { getCategories } from '../../actions/categoryAction';
import iFormData from 'form-data';

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.extractProductDetails = this.extractProductDetails.bind(this);
    this.onImageChange = this.onImageChange.bind(this);

    this.state = {
      page: 0,
      error: null,
      form: {
        title: '',
        price: '',
        categoryId: '',
        image: '',
      },
      selectedImage: null
    }
  }

  componentWillMount() {
    const { products, match, match: { params: { productId } } } = this.props;

    this.props.getCategories();

    const page = match.path === '/product/add' ? 0 : 1;
    this.setState({ page });
      
    if (page === 0) {
      this.setState({ form: {
        title: '',
        price: '',
        categoryId: null,
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

  onImageChange(event) {
    const { target: { value }} = event;
    this.setState({ selectedImage: value });
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
    event.preventDefault();
    const { shopId, history, match: { params: { productId }} } = this.props;
    const { page, form: { title, price, categoryId } , selectedImage } = this.state;

    const formData = new iFormData();
    formData.append('shopId', shopId);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    formData.append('image', selectedImage);

    const promise = page === 0
      ? this.props.addProduct(formData)
      : this.props.editProduct(productId, formData,);

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
    const { title, image, price, categoryId } = product;
    return { title, image, price, categoryId };
  }

  render() {
    const { page, form, error  } = this.state;
    const { categories } = this.props;

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
                <label>Category</label>
                <select
                  name="categoryId"
                  onChange={this.onChange}
                  value={form.categoryId}
                >
                  <option value={null}>-- Select --</option>
                  { categories.map(category => (
                    <option
                      key={category.id}  
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="fieldset">
                <label>Title</label>
                <input
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={this.onChange}
                />
              </div>

              <div className="fieldset">
                <label>Price</label>
                <input
                  name="price"
                  type="text"
                  value={form.price}
                  onChange={this.onChange}
                />
              </div>
              
              <div className="fieldset">
                <div className="row" id="image-section">
                  <div className="col col-8">
                    <label>Select image</label>
                    <input
                      name="image"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={this.onImageChange}
                    />
                  </div>
                  <div className="col col-4">
                    <img src={form.image} />
                  </div>
                </div>
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
  shopId: state.vendorReducer.shop ? state.vendorReducer.shop.id : null,
  categories: state.categoryReducer.categories
});

const mapDispatchToProps = {
  addProduct,
  editProduct,
  getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
