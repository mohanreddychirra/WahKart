import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/orderAction';

import '../../stylesheets/orders.scss';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  shouldComponentUpdate(nextProps) {
    const { auth, history } = this.props;
    const { auth: nextAuth } = nextProps;

    if (nextAuth.noLogin) {
      history.push('/');
      return false;
    }

    if (auth.inProgress === true && nextAuth.inProgress === false) {
      if (nextAuth.role !== 'customer') {
        history.push('/');
        return false;
      }
    }

    this.props.getOrders();
    return true;
  }

  
  render() {
    const { orders } = this.props;

    return (
      <div id="orders">
        <div className="aligner">
          { orders.map((order) => (
            <div className="order" key={order.id}>
              <div className="order-header clearfix">
                <span>Order ID : { order.trackingId }</span>
                <span>Date : { order.createdAt.split('T')[0] }</span>
              </div>

              <div className="order-table">
                { order.OrderItems.map((orderItem) => (
                  <div className="row" key={orderItem.id}>
                    <div className="col col-lg-3">
                      <img src={orderItem.Product.image} />
                    </div>
                    <div className="col col-lg-3">
                      <span>{ orderItem.Product.title }</span>
                    </div>
                    <div className="col col-lg-3">
                      <span>{ orderItem.quantity }</span>
                    </div>
                    <div className="col col-lg-3">
                      <span>{ orderItem.price }</span>
                    </div>
                  </div>
                )) }
              </div>
            </div>
          )) }
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  orders: state.orderReducer.orders
});

const mapDispatchToProps = { getOrders };

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
