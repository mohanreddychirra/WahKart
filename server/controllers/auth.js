import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET } from '../utils';
import db from '../db/models';

const { Customer } = db;

class AuthCtrl {
  static register(req, res) {
    const { email, password } = req.body;
  
    Customer.findOne({
      where: { email }
    }).then(entry => {
      if (entry) {
        res.json(409, {
          message: 'Email provided is already taken'
        });
      } else {
        bcrypt.hash(password, 8, (error, hash) => {
          Customer.create({
            email,
            password: hash
          })
            .then(entry => {
              const { password, ...customer } = entry.get();
              jwt.sign({
                id: entry.id,
                email: entry.email
              }, SECRET, (error, token) => {
                res.json(201, {
                  message: 'Customer has been created successfully',
                  customer,
                  token
                });
              });
            });
        });
      }
    });
  }

  static login(req, res) {
    
  }
}

export default AuthCtrl;