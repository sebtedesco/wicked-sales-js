import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import Checkout from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));

  }

  setView(setViewName, setViewParams) {
    this.setState({
      view: {
        name: setViewName,
        params: setViewParams
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => console.error(err));
  }

  addToCart(productObj) {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productObj)
    };
    fetch('/api/cart', init)
      .then(response => {
        return response.json();
      })
      .then(response => {
        const newCartArr = [...this.state.cart];
        newCartArr.push(response);
        this.setState({ cart: newCartArr });
      })
      .catch(err => console.error(err));
  }

  placeOrder(orderObject) {
    // console.log('order placed: ', orderObject);
    if (!orderObject.name || !orderObject.creditCard || !orderObject.address) {
      return console.error('one or more fields missing');
    }
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify(orderObject)
    };
    fetch('/api/orders', init)
      .then(response => {
        this.setState({
          cart: [],
          view: { name: 'catalog' }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const arrOfCartItems = this.state.cart;
    let totalPrice = null;
    arrOfCartItems.forEach(item => {
      totalPrice += item.price;
    });
    const totalPriceFormatted = `$${parseFloat(totalPrice / 100).toFixed(2)}`;
    let reactElementToDisplay = null;
    if (this.state.view.name === 'catalog') {
      reactElementToDisplay = <ProductList setViewMethod={this.setView} />;
    } else if (this.state.view.name === 'details') {
      reactElementToDisplay = <ProductDetails productId={this.state.view.params.productId} setViewMethod={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      reactElementToDisplay = <CartSummary totalPrice={totalPriceFormatted} cart={this.state.cart} setViewMethod={this.setView} />;
    } else if (this.state.view.name === 'checkout') {
      reactElementToDisplay = <Checkout totalPrice={totalPriceFormatted} placeOrder={this.placeOrder} setViewMethod={this.setView} cart={this.state.cart} />;
    }
    return (
      <>
        <Header cartItemCount={this.state.cart.length} setViewMethod={this.setView}/>
        { reactElementToDisplay }
      </>
    );
  }
}
