import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
import db from '../db/models';

const { Auth } = db;

dotEnv.config()

// Middlewares are to be run before hitting actually request controllers
// the are placed before the actual controller methods in the route declaration

class AuthMid {

  /**
   * 
   * @description
   * This middleware helps to check if the passed token is valid for
   * controller methods that requires that the client making the request
   * should be authenticated clients, the payload extracted from the token
   * is binded to the request object as req.payload = payload,
   * if verification is successfull, the next() function is called to pass control
   * to actual controller method.
   * 
   * @param { Object } req 
   * @param { Object } res 
   * @param { Function } next 
   */
  static checkToken(req, res, next) {
    const { token } = req.headers;

    jwt.verify(token, process.env.SECRET, (error, payload) => {
      if (error) {
        res.status(401).json({
          message: "token provided is invalid"
        });
      } else {
        req.payload = payload;
        next();
      }
    });
  }

  static checkVendorToken(req, res, next) {
    const { token } = req.headers;

    jwt.verify(token, process.env.SECRET, (error, payload) => {
      if (error) {
        res.status(401).json({
          message: "token provided is invalid"
        });
      } else if (payload.role !== 'vendor') {
        res.status(401).json({
          message: "Only vendors can access this endpoint"
        });
      } else {
        Auth.findOne({
          where: {
            email: payload.email,
            id: payload.id,
            role: payload.role
          }
        })
          .then(user => {
            if(user) {
              req.payload = payload;
              next();
            } else {
              res.status(401).json({
                message: "User does not exist"
              });
            }
          })
          .catch(error => {
            res.status(500).json({
              message: "Error occured while authenticating"
            });
          });
      }
    });

  }

  static checkAdminToken(req, res, next) {
    const { token } = req.headers;

    jwt.verify(token, process.env.SECRET, (error, payload) => {
      if (error) {
        res.status(401).json({
          message: "token provided is invalid"
        });
      } else if (payload.role !== 'admin') {
        res.status(401).json({
          message: "You have no permissions to access this resource"
        });
      } else {
        Auth.findOne({
          where: {
            email: payload.email,
            id: payload.id,
            role: payload.role
          }
        })
          .then(user => {
            if(user) {
              req.payload = payload;
              next();
            } else {
              res.status(401).json({
                message: "User does not exist"
              });
            }
          })
          .catch(error => {
            res.status(500).json({
              message: "Error occured while authenticating"
            });
          });
      }
    });
  }

  /**
   * 
   * @description
   * This middleware helps to extract token payload if exist,
   * it then attach it to the request object via the payload key.
   * 
   * This is different from the above, as this allow for when even token is invalid 
   * 
   * @param { Object } req 
   * @param { Object } res 
   * @param { Function } next 
   */
  static extractToken(req, res, next) {
    const { token } = req.headers;

    jwt.verify(token, process.env.SECRET, (error, payload) => {
      if (error) { req.payload = null }
      else { req.payload = payload; }
      next();
    });
  }
}

export default AuthMid;
