import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET } from '../utils';
import db from '../db/models';

const { Customer, Vendor } = db;

class AuthCtrl {
  /**
   * 
   * @description
   * A plain function to abstract common token generation
   * code for both register and login controller methods
   * 
   * @param { Object } res 
   * @param { Object } entry 
   * @param { String } password 
   */
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
        res.json(401, {
          message: 'Login credentials are invalid'
        });
      }
    });
  }

  /**
   * 
   * @description
   * Controller method to verify the token is valid
   * and respond with the user details signed into the token
   * 
   * @param { Object } req 
   * @param { object } res 
   */
  static authenticate(req, res) {
    const { token } = req.body;
  
    jwt.verify(token, SECRET, (error, user) => {
      if (!user) {
        res.json(401, {
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

  /**
   * 
   * @description
   * handles register request, this endpoint requires
   * that user credentials (email and password) should be passed
   * through the request body which is accessible at {req.body} object
   * 
   * @param { Object } req
   * @param { Object } res
   */
  static register(req, res) {
    const { email, password } = req.body;
    
    // check if email provided is already taken
    Customer.findOne({
      where: { email }
    }).then(entry => {

      // respond with 409 if there is an entry with provided email
      if (entry) {
        res.json(409, {
          message: 'Email provided is already taken'
        });
      } else {

        // check if the email provided already belongs to a vendor
        Vendor.findOne({
          where: { email }
        }).then(entry => {

          // respond with 409 if there is an entry with provided email
          if (entry) {
            res.json(409, {
              message: 'Email provided is already taken'
            });
          } else {

            // otherwise, encrypt password with the bcrypt module
            bcrypt.hash(password, 8, (error, hash) => {

              // insert new customer innto the database
              Customer.create({
                email,
                password: hash
              })
                .then(entry => {
                  const { password, ...user } = entry.get();

                  // after adding to db, geenerate a token to be sent with response
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
        });
      }
    })
    .catch(() => {
      res.json(500, {
        message: 'Internal server error'
      });
    });
  }

  /**
   * 
   * @description
   * handles login request, this endpoint requires
   * that user credentials (email and password) should be passed
   * through the request body which is accessible at {req.body} object
   * 
   * @param { Object } req
   * @param { Object } res
   */
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

            // Respond with 401 for invalid email
            res.json(401, {
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