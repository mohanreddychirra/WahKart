import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotEnv from 'dotenv';
import db from '../db/models';

dotEnv.config();

const { Auth } = db;

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
        }, process.env.SECRET, (error, token) => {
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
    const { email, password, role } = req.body;
    
    if (role !== 'customer' && role !== 'vendor') {
      res.json(400, {
        message: 'Select a valid role'
      });
    } 
    else if (!email.trim()) {
      res.json(400, {
        message: 'Email field is required'
      });
    } 
    else if (!password.trim()) {
      res.json(400, {
        message: 'Password field is required'
      });
    } 
    else {

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
                const { password, ...user } = entry.get();

                // after adding to db, geenerate a token to be sent with response
                jwt.sign({
                  id: entry.id,
                  email: entry.email,
                  role: entry.role
                }, process.env.SECRET, (error, token) => {
                  res.json(201, {
                    message: 'Registration successfully',
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
        // return response for vendor login
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