import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/orderAction';

import '../../stylesheets/orders.scss';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.renderOrder = this.renderOrder.bind(this);
    this.genIndexes = this.genIndexes.bind(this);
    this.state = {}
  }

  /**
   * 
   * @description Handles page access via link
   * 
   * @param {*} nextProps 
   */
  componentWillMount() {
    const { auth: { role, inProgress, noLogin }, history } = this.props;

    if(!inProgress) {
      if (noLogin || role != 'customer') {
        history.push('/');
      }
    }
  }

  /**
   * 
   * @description Handles when page is reloaded
   * 
   * @param {*} nextProps 
   */
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
  
    return true;
  }

  renderOrder(order) {
    return (
      <div className="order" key={order.id}>
        <div className="order-header clearfix">
          <span>Order ID : { order.trackingId }</span>
          <span>Date : { order.createdAt.split('T')[0] }</span>
          <span>Amount : { order.amount }</span>
        </div>

        <div className="order-table">
          { order.OrderItems.map((orderItem) => (
            <div className="row" key={orderItem.id}>
              <div className="col col-lg-3">
                <img src={orderItem.Product.image} />
              </div>
              <div className="col col-lg-3">
                <span>{orderItem.Product.title}</span>
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
    );
  }

  genIndexes(start, length) {
    return (
      Array(length - start)
        .fill(start)
        .map((num, index) => num + index)
    );
  }

  render() {
    const { orders } = this.props;
  
    const halfCount = (
      orders.length < 2
        ? orders.length
        : ( orders.length - Math.floor(orders.length / 2))
    );

    return (
      <div id="orders">
        <div className="aligner">
          <header>
            <span>{ orders.length }</span>
            Order History
          </header>

          { !orders.length && (
            <span className="empty">You have not made any order yet</span>
          ) }

          <div className="row">
            <div className="col-12 col-xl-6">
              {
                halfCount > 0 && (
                  this.genIndexes(0, halfCount)
                    .map(index => this.renderOrder(orders[index]))
                )
              }
            </div>

            <div className="col-12 col-xl-6">
              {
                this.genIndexes(halfCount, orders.length)
                  .map(index => this.renderOrder(orders[index]))
              }
            </div>
          </div>
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
