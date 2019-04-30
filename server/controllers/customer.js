import db from '../db/models';

const { Customer } = db;

const defaultCustomer = {
  firstName: '',
  lastName: '',
  address: ''
}

class CustomerCtrl {
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
