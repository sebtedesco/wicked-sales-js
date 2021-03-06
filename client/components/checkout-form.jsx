/* eslint-disable */
import React from 'react';
import BottomNav from './bottom-nav'

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      fullName: '',
      creditCardNumber: '',
      expiration: '',
      cvv: '',
      errors: {
        fName: false,
        lName: false,
        street: false,
        city: false,
        state: false,
        zip: false,
        fullName: false,
        creditCardNumber: false,
        expiration: false,
        cvv: false,
        checkbox: 'init'
      },
      errorFree: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    let value;
    if (name === 'checkbox') {
      // console.log('checkbox conditional')
      const errors = { ...this.state.errors };
      if (errors.checkbox === '') {
        // console.log('empty string')
        errors[name] = false;
      } else {
        errors[name] = !errors.checkbox
      }
      this.setState({
        errors
      })
    } else {
      value = event.target.value;
      const errors = { ...this.state.errors };
      errors[name] = false
      this.setState({
        [name]: value,
        errors
      })
    }
  }

  handleValidation(event) {
    event.preventDefault();
    const name = event.target.name;
    const errors = { ...this.state.errors };
    const value = event.target.value;
    const oneWordRegex = new RegExp(/^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$/);
    const streetRegex = new RegExp(/\d+\w+\s\w+\s\w+/);
    const zipRegex = new RegExp(/^\d{5}(\-?\d{4})?$/);
    const fullNameRegex = new RegExp(/(?:(\w+-?\w+)) (?:(\w+))(?: (\w+))?$/)
    const ccRegex = new RegExp(/(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g);
    const expRegex = new RegExp(/^(0[1-9]|1[012])[ -\/]\d\d$/);
    const cvvRegex = new RegExp(/^[0-9]{3,4}$/);

    switch (name) {
      case 'fName':
      case 'lName':
      case 'city':
      case 'state':
        if (!oneWordRegex.test(this.state[name])) {
          errors[name] = true;
          this.setState({
            errors
          })
        };
        break;
      case 'street':
        if (!streetRegex.test(this.state[name])) {
          errors.street = true;
          this.setState({
            errors
          })
        };
        break;
      case 'zip':
        if (!zipRegex.test(this.state[name])) {
          errors.zip = true;
          this.setState({
            errors
          })
        };
        break;
      case 'fullName':
        if (!fullNameRegex.test(this.state[name])) {
          errors.fullName = true;
          this.setState({
            errors
          })
        };
        break;
      case 'creditCardNumber':
        if (!ccRegex.test(this.state[name])) {
          errors.creditCardNumber = true;
          this.setState({
            errors
          })
        };
        break;
      case 'expiration':
        if (!expRegex.test(this.state[name])) {
          errors.expiration = true;
          this.setState({
            errors
          })
        };
        break;
      case 'cvv':
        if (!cvvRegex.test(this.state[name])) {
          errors.cvv = true;
          this.setState({
            errors
          })
        };
        break;
      case 'checkbox':
        if (this.state.errors.checkbox === 'init') {
          // console.log('its a string to changing to true')
          errors.checkbox = false;
        }else{
          // console.log(`its ${errors.checkbox} so changing to ${!errors.checkbox}`)
          errors.checkbox = !errors.checkbox;
        }
        this.setState({
          errors
        })
    }

    this.setState({ errors }, () => {
      this.errorFree();
    })
    // this.setState({ errors })
    // this.errorFree();
  }

  errorFree() {
    if (!this.state.errors.fName && this.state.fName && !this.state.errors.lName && this.state.lName && !this.state.errors.street && this.state.street && !this.state.errors.city && this.state.city && !this.state.errors.state && this.state.state && !this.state.errors.zip && this.state.zip && !this.state.errors.fullName && this.state.fullName && !this.state.errors.creditCardNumber && this.state.creditCardNumber && !this.state.errors.expiration && this.state.expiration && !this.state.errors.cvv && this.state.cvv && !this.state.errors.checkbox) {
      // console.log('error free!')
      this.setState({ errorFree: true });
    } else {
      // console.log('errors...')
      this.setState({ errorFree: false });
    }
  }

  render() {
    let checkboxChecked = false;
    const arrOfCartItems = this.props.cart;
    let totalPrice = null;
    arrOfCartItems.forEach(item => {
      totalPrice += item.price;
    });
    const totalPriceFormatted = `$${parseFloat(totalPrice / 100).toFixed(2)}`;
    return (
      <>
        <div className="container checkout-form container-bottom-nav">
          <div className="row m-0">
            <div className="col checkout-fields">
              <h2 className="m2">Checkout</h2>
              <div className="row">
                <h4 className="m-3">Shipping Information</h4>
              </div>
              <div className="row mt-2">
                <div className=" col-5 checkout-field">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="fName"
                    value={this.state.name}
                    onChange={this.handleChange}
                    onBlur={this.handleValidation}
                  />
                  <small className={`form-text text-muted ${this.state.errors.fName ? 'red' : ''}`}> {this.state.errors.fName ? 'First name is invalid' : ''} </small>
                </div>
                <div className="col-5 checkout-field">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lName"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.handleChange}
                    onBlur={this.handleValidation}
                  />
                  <small className={`form-text text-muted ${this.state.errors.lName ? 'red' : ''}`}> {this.state.errors.lName ? 'Last name is invalid' : ''} </small>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-5 checkout-field">
                  <input
                    type="text"
                    placeholder="Street Address"
                    name="street"
                    className="form-control"
                    value={this.state.address}
                    onChange={this.handleChange}
                    onBlur={this.handleValidation}
                  />

                  <small className={`form-text text-muted ${this.state.errors.street ? 'red' : ''}`}> {this.state.errors.street ? 'Street is invalid' : ''} </small>
                </div>
                <div className="col-5 checkout-field">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="form-control"
                    value={this.state.address}
                    // onChange={this.handleChange}
                    onBlur={this.handleChange}
                  />
                  <small className={`form-text text-muted ${this.state.errors.city ? 'red' : ''}`}> {this.state.errors.city ? 'City is invalid' : ''} </small>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3 checkout-field">
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    className="form-control"
                    value={this.state.address}
                    onChange={this.handleChange}
                    onBlur={this.handleValidation}
                  />
                  <small className={`form-text text-muted ${this.state.errors.state ? 'red' : ''}`}> {this.state.errors.state ? 'State is invalid' : ''} </small>
                </div>
                <div className="col-3 checkout-field">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    name="zip"
                    className="form-control"
                    value={this.state.address}
                    onChange={this.handleChange}
                    onBlur={this.handleValidation}
                  />
                  <small className={`form-text text-muted ${this.state.errors.zip ? 'red' : ''}`}> {this.state.errors.zip ? 'Zip Code is invalid' : ''} </small>
                </div>
              </div>
              <div className="row mt-2">
                <h4 className="m-3">Payment Information</h4>
              </div>
              <div className="row mt-2">
                <div className="col-5 checkout-field">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    className="form-control"
                    value={this.state.creditCard}
                    onChange={this.handleChange}
                    onBlur={this.handleValidation}
                  />
                  <small className={`form-text text-muted ${this.state.errors.fullName ? 'red' : ''}`}> {this.state.errors.fullName ? 'Full name is invalid' : ''} </small>
                </div>
                <div className="col-5 checkout-field">
                  <input
                    type="text"
                    placeholder="Credit Card Number"
                    name="creditCardNumber"
                    className="form-control"
                    value={this.state.creditCard}
                    onChange={this.handleChange}
                    onBlur={this.handleValidation}
                  />
                  <small className={`form-text text-muted ${this.state.errors.creditCardNumber ? 'red' : ''}`}> {this.state.errors.creditCardNumber ? 'Credit card number is invalid' : ''} </small>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3 checkout-field">
                  <input
                    type="text"
                    placeholder="Expiration (MM/YY)"
                    name="expiration"
                    className="form-control"
                    value={this.state.creditCard}
                    onChange={this.handleChange}
                    onBlur={this.handleValidation}
                  />
                  <small className={`form-text text-muted ${this.state.errors.expiration ? 'red' : ''}`}> {this.state.errors.expiration ? 'Expiration date is invalid' : ''} </small>
                </div>
                <div className="col-3 checkout-field">
                  <input
                    type="text"
                    placeholder="CVV"
                    name="cvv"
                    className="form-control"
                    value={this.state.creditCard}
                    onChange={this.handleChange}
                    onBlur={this.handleValidation}
                  />
                  <small className={`form-text text-muted ${this.state.errors.cvv ? 'red' : ''}`}> {this.state.errors.cvv ? 'CVV is invalid' : ''} </small>
                </div>
              </div>
              <div className="row mt-4">
                <form className="col-12">
                  <div>
                    <label><input
                      type="checkbox"
                      placeholder="checkbox"
                      name="checkbox"
                      className="d-inline mr-2 pb-1"
                      value={this.state.checkbox}
                      onChange={console.log('checkbox changed')}
                      onBlur={this.handleValidation}
                    /> I understand that by clicking "Place Order" I am not placing an order.</label>
                    <small className={`form-text text-muted ${this.state.errors.checkbox ? 'red' : ''}`}> {this.state.errors.checkbox ? 'You must check the box if you wish to proceed' : ''} </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <BottomNav cart={this.props.cart} orderDetails={this.state} view={this.props.view} setViewMethod={this.props.setViewMethod} errorFree={this.state.errorFree} placeOrder={this.props.placeOrder} />
      </>
    );
  }
}
