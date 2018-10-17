import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import db from './db/models';
import jwt from 'jsonwebtoken';

const { Customer } = db;
const app = express();
const port = 8000;
const SECRET = 'VT733RF73FRVY3RYR7YRF3RFYF3RY7RGYR3R3YR7GY3GYYRFGVR83TT94T48Y44';

app.use(bodyParser());

app.get('/', (req, res) => {
  res.json(200, {
    message: 'Welcome to WahKart API'
  });
});

app.post('/register', (req, res) => {
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
});

app.listen(port, (error) => {
  if(error) {
    console.log("\nUnable to start server\n");
  } else {
    console.log(`\nServer started on port ${port}\n`);
  }
});
