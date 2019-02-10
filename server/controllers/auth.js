import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotEnv from 'dotenv';
import db from '../db/models';

dotEnv.config();

const { Auth, VendorRequest, Shop, Product } = db;

class AuthCtrl {
  static getVendor(id) {
    return Auth.findOne({
      where: { id },
      attributes: [ 'id', 'email', 'role' ],
      include: [
        { model: Shop, include: [ { model: Product } ] },
        { model: VendorRequest }
      ]
    })
  }

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
  static genLoginResponse(res, entry, password) {
    bcrypt.compare(password, entry.password, (error, result) => {
      if(!error && result) {
        const { password, ...user } = entry.get();
        
        jwt.sign({
          id: entry.id,
          email: entry.email,
          role: entry.role
        }, process.env.SECRET, (error, token) => {

          // Fetch necessary details for vendor
          if (entry.role === 'vendor') {
            AuthCtrl.getVendor(entry.id)
            .then((vendor) => {
              res.json(200, {
                message: 'Login was successfully',
                user: vendor,
                token
              });
            })
            .catch((error) => {
              console.log(error);
              res.json(500, {
                message: 'Internal error',
              });
            });
          } else {
            res.json(200, {
              message: 'Login was successfully',
              user,
              token
            });
          }
        });
      } else {
        res.json(401, {
          message: 'Login credentials are invalid'
        });
      }
    });
  }

  static validateRegister(res, email, password, role, shopName) {
    if (role !== 'customer' && role !== 'vendor') {
      return res.json(400, {
        message: 'Select a valid role'
      });
    } 
    
    if (role === 'vendor' && (!shopName || !shopName.match(/^[A-Za-z][A-Za-z ]+[A-Za-z]$/))) {
      return res.json(400, {
        message: 'Enter a valid shop name'
      });
    } 

    if (!email.trim()) {
      return res.json(400, {
        message: 'Email field is required'
      });
    } 
    
    if (!password.trim()) {
      return res.json(400, {
        message: 'Password field is required'
      });
    }

    return true;
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
  
    jwt.verify(token, process.env.SECRET, (error, user) => {
      if (!user) {
        res.json(401, {
          message: 'Token provided is invalid'
        });
      } else {
        Auth.findOne({
          where: {
            email: user.email
          }
        }).then((entry) => {
          if (!entry) {
            res.json(401, {
              message: 'Token provided is invalid',
            });
          } else if (entry.role === 'vendor') {
            AuthCtrl.getVendor(entry.id)
            .then((vendor) => {
              res.json(200, {
                message: 'Token verification successful',
                user: vendor
              });
            })
            .catch((error) => {
              res.json(500, {
                message: 'Internal error',
              });
            });
          } else {
            res.json(200, {
              message: 'Token verification successful',
              user,
            });
          }
        })
        .catch(() => {
          res.json(500, {
            message: 'Internal server error'
          });
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
    const { email, password, role, shopName } = req.body;
    
    const status = AuthCtrl.validateRegister(
      res, email, password, role, shopName
    );
    
    if (status !== true) return status;

    // check if email provided is already taken
    Auth.findOne({
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
          Auth.create({
            email,
            password: hash,
            role
          })
            .then(entry => {
              const {
                password,
                updatedAt,
                createdAt,
                ...user
              } = entry.get();

              // after adding to db, geenerate a token to be sent with response
              jwt.sign({
                id: entry.id,
                email: entry.email,
                role: entry.role
              }, process.env.SECRET, (error, token) => {

                // If vendor get request annd shop details
                if (user.role === 'vendor') {
                  VendorRequest.create({
                    vendorId: user.id,
                    shopName,
                    status: 'open'
                  })
                    .then((request) => {
                      const vendor = {
                        ...user,
                        VendorRequest: {
                          ...request.dataValues
                        },
                        Shop: null
                      }

                      res.json(201, {
                        message: 'Registration successfully',
                        user: vendor,
                        token
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                      res.json(500, {
                        message: 'Internal error',
                      });
                    });
                } else {
                  res.json(201, {
                    message: 'Registration successfully',
                    user,
                    token
                  });
                }
              });
            })
            .catch((error) => {
              console.log(error);
              res.json(500, {
                message: 'Internal server error'
              });
            });
        });
      }
    })
    .catch((error) => {
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
    Auth.findOne({
      where: { email }
    }).then(entry => {
      if (!entry) {
        // Respond with 401 for invalid email
        res.json(401, {
          message: 'Email address provided is invalid'
        });
      } else {
        AuthCtrl.genLoginResponse(
          res, entry, password
        );
      }
    })
    .catch(error => {
      res.json(500, {
        message: 'Internal error',
      });
    });
  }
}

export default AuthCtrl;