import db from '../db/models';

const { Customer, ViewedProduct, Product } = db;

const defaultCustomer = {
  firstName: '',
  lastName: '',
  address: ''
}

class CustomerCtrl {
  static getViewed(req, res) {
    const { id } = req.payload;

    ViewedProduct.findAll({
      where: {
        customerId: id,
      },
      include: [
        {
          model: Product
        }
      ]
    })
      .then(products => {
        if(!products) products = [];

        products = products.map(record => record.Product);

        return res.status(200).json({
          message: 'Viewed product fetched',
          products
        });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Error occured while confirming existence'
        });
      })
  }

  static setViewed(req, res) {
    const { id } = req.payload;
    const { productId } = req.params;

    ViewedProduct.findOne({
      where: {
        customerId: id,
        productId
      }
    })
      .then(record => {
        if(!record) {
          ViewedProduct.create({
            customerId: id,
            productId
          })
            .then(() => {
              return res.status(201).json({
                message: 'Product set for customer as viewed product'
              });
            })
            .catch(() => {
              res.status(500).json({
                message: 'Error occured while setting a product as viewed product for customer'
              });
            })
        }
        else {
          return res.status(200).json({
            message: 'Product already viewed'
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Error occured while confirming existence'
        });
      })   
  }

  static get(req, res) {
    const { id } = req.payload;
    Customer.findOne({
      where: { authId: id }
    })
      .then(customer => {
        if(!customer) {
          customer = { ...defaultCustomer };
        }

        res.status(200).json({
          message: 'Customer fetched successfully',
          customer
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Error occured while getting customer'
        });
      });
  }

  static update(req, res) {
    const { id } = req.payload;
    const { firstName, lastName, address } = req.body;

    if (typeof firstName != 'string' || firstName.trim() == '') {
      return res.status(400).json({
        message: 'First name was not provided'
      });
    }

    if (typeof lastName != 'string' || lastName.trim() == '') {
      return res.status(400).json({
        message: 'Last name was not provided'
      });
    }

    if (typeof address != 'string' || address.trim() == '') {
      return res.status(400).json({
        message: 'Address was not provided'
      });
    }

    Customer.findOne({
      where: { authId: id }
    })
      .then(customer => {
        if(!customer) {
          return res.status(404).json({
            message: 'Customer not foun'
          })
        }

        customer.firstName = firstName.trim();
        customer.lastName = lastName.trim();
        customer.address = address.trim();
        customer.save();

        res.status(200).json({
          message: 'Customer updated successfully',
          customer
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Error occured while getting customer'
        });
      });
  }
}

export default CustomerCtrl;
