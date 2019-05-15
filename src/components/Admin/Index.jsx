import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';
import toastr from 'toastr';
import { getCategories, addCategory, deleteCategory, updateCategory } from '../../actions/categoryAction';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleAddOrUpdate = this.handleAddOrUpdate.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      category: '',
      categoryEditId: null,
      categoryEdit: ''
    }
  }

  componentWillMount() {
    this.props.getCategories();
  }

  handleAddOrUpdate(addMode, name, id = null) {
    const promise = addMode
      ? this.props.addCategory(name)
      : this.props.updateCategory(id, name);

    promise.then(statOrMsg => {
      if(statOrMsg === true) {
        toastr.success(
          `Category ${ addMode ? 'added' : 'updated' }`
        );
        this.setState({
          category: '',
          categoryEditId: null,
          categoryEdit: ''
        });
      } else {
        toastr.error(statOrMsg);
      }
    })
  }

  handleAdd() {
    const { category } = this.state;

    this.handleAddOrUpdate(
      true,
      category
    )
  }

  handleCancel() {
    this.setState({
      categoryEditId: null,
      categoryEdit: ''
    })
  }

  handleUpdate(categoryName) {
    const { categoryEdit, categoryEditId } = this.state;
    
    if (categoryName.toLowerCase() == categoryEdit.toLowerCase()) {
      this.handleCancel(); return;
    }

    this.handleAddOrUpdate(
      false,
      categoryEdit,
      categoryEditId
    );
  }

  handleEdit({ id, name}) {
    this.setState({
      categoryEditId: id,
      categoryEdit: name
    })
  }

  handleChange(event) {
    const { target: { value, name } } = event;
    this.setState({ [name]: value });
  }

  handleDelete(categoryId) {
    this.props.deleteCategory(categoryId)
      .then(statOrMsg => {
        if(statOrMsg === true) {
          toastr.success('Category deleted');
        } else {
          toastr.error(statOrMsg);
        }
      })
  }

  render() {
    const { categories } = this.props;
    const { categoryEditId, categoryEdit } = this.state;

    return (
      <Wrapper>
        <div id="admin-dashboard">
          <div className="aligner">

            {/* Admin Dashboard
            <br />
             */}

            <div className="page-heading">
              <div> 
                <span className="icon">
                  <i className="fas fa-list-alt" />
                </span>
                Dashboard
              </div>

              <Link to="/admin/requests">
                <span className="reqlink">Vendor Requests</span>
              </Link>
            </div>

            <div id="manage-categories">
              <div id="title">
                Manage Categories
              </div>

              <div id="form">
                <input
                  type="text"
                  value={this.state.category}
                  onChange={this.handleChange}
                  name="category"
                  placeholder="Enter category name"
                />

                <button type="button" onClick={this.handleAdd}>
                  Add
                </button>
              </div>

              { !categories.length && (
                <div>
                  No categories has been added yet
                </div>
              ) }

              { categories.map(category => {
                const isActive = categoryEditId == category.id;
                return (
                  <div className="category-list-item" key={category.id}>
                    <input
                      type="text"
                      name="categoryEdit"
                      value={ !isActive ? category.name : categoryEdit }
                      disabled={!isActive}
                      onChange={this.handleChange}
                      className={ isActive ? 'active': '' }
                    />
                    
                    { isActive && (
                      <Fragment>
                        <button className="icons" type="button" onClick={() => this.handleUpdate(category.name)}>
                          <i className="fas fa-check" />
                        </button>

                        <button className="icons" type="button" onClick={() => this.handleCancel()}>
                          <i className="fas fa-times" />
                        </button>
                      </Fragment>
                    ) }

                    { !isActive && (
                      <Fragment>
                        <button className="icons" type="button" onClick={() => this.handleDelete(category.id)}>
                          <i className="fas fa-trash" />
                        </button>

                        <button className="icons" type="button" onClick={() => this.handleEdit(category)}>
                          <i className="fas fa-edit" />
                        </button>
                      </Fragment>
                    ) }
                  </div>
                )})
              }
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory
}

const mapStateToProps = ({ categoryReducer }) => ({
  categories: categoryReducer.categories
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

