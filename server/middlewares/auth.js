import jwt from 'jsonwebtoken';
import { SECRET } from '../utils';

class AuthMid {
  static checkToken(req, res, next) {
    const { token } = req.headers;

    jwt.verify(token, SECRET, (error, payload) => {
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
}

export default AuthMid;
