import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET } from '../utils';
import db from '../db/models';

const { Customer, Vendor } = db;

class AuthCtrl {
  static generateResponse(res, entry, password) {
    bcrypt.compare(password, entry.password, (error, result) => {
      if(!error && result) {
        const { password, ...user } = entry.get();
        
        jwt.sign({
          id: entry.id,
          email: entry.email,
          role: entry.role
        }, SECRET, (error, token) => {
          res.json(200, {
            message: 'Login was successfully',
            user,
            token
          });
        });
      } else {
        res.json(403, {
          message: 'Login credentials are invalid'
        });
      }
    });
  }

  static authenticate(req, res) {
    const { token } = req.body;
  
    jwt.verify(token, SECRET, (error, user) => {
      if (!user) {
        res.json(403, {
          message: 'Token provided is invalid'
        });
      } else {
        res.json(200, {
          message: 'Token verification successful',
          user,
        });
      }
    });
  }

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
              const { password, ...user } = entry.get();
              jwt.sign({
                id: entry.id,
                email: entry.email,
                role: entry.role
              }, SECRET, (error, token) => {
                res.json(201, {
                  message: 'Customer has been created successfully',
                  user,
                  token
                });
              });
            })
            .catch(() => {
              res.json(500, {
                message: 'Internal server error'
              });
            });
        });
      }
    })
    .catch(() => {
      res.json(500, {
        message: 'Internal server error'
      });
    });;
  }

  static login(req, res) {
    const { email, password } = req.body;

    // Check for customer with email provided
    Customer.findOne({
      where: { email }
    }).then(entry => {
      if (!entry) {

        // Check for vendor with email provided
        Vendor.findOne({
          where: { email }
        }).then(entry => {
          if (!entry) {

            // Respond with 403 for invalid email
            res.json(403, {
              message: 'Email address provided is invalid'
            });
          } else {

            // return response for vendor login
            AuthCtrl.generateResponse(
              res, entry, password
            );
          }
        });
      } else {
        AuthCtrl.generateResponse(
          res, entry, password
        );
      }
    })
    .catch(error => {
      res.json(500, {
        message: 'Internal error',
        error
      });
    });
  }
}

export default AuthCtrl;