import express from 'express';
import bodyParser from 'body-parser';
import AuthCtrl from './controllers/auth';
import ProductCtrl from './controllers/product';
import CartCtrl from './controllers/cart';
import AuthMid from './middlewares/auth';

const app = express();
const port = 8000;

app.use(bodyParser());

app.get('/', (req, res) => {
  res.json(200, {
    message: 'Welcome to WahKart API'
  });
});

app.post('/api/register', AuthCtrl.register);
app.post('/api/login', AuthCtrl.login);
app.get('/api/products', ProductCtrl.getAll)
app.post('/api/auth', AuthCtrl.authenticate);

app.get('/api/cart-items', AuthMid.checkToken, CartCtrl.getCartItems)
app.post('/api/cart-items', AuthMid.checkToken, CartCtrl.addCartItem)
app.delete('/api/cart-items', AuthMid.checkToken, CartCtrl.deleteCartItem)

app.listen(port, (error) => {
  if(error) {
    console.log("\nUnable to start server\n");
  } else {
    console.log(`\nServer started on port ${port}\n`);
  }
});
