import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

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
