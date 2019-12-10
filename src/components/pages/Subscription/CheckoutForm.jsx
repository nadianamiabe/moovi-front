import React, { Component } from 'react';
import CardForm from './CardForm';
import  { injectStripe } from 'react-stripe-elements';
import api from '../../../api/api';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: {
        city: '',
        line1: '',
        line2: '',
        postal_code: ''
      },
      email: '',
      phone: '',
      succeeded: false,
      processing: false,
    }
  }

  handleAddressChange = (ev) => {
    const { name, value } = ev.target;
    const { address } = this.state; 
    this.setState({ address: { 
      ...address,
      [name]: value,
    }});
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    const { name, address, phone, email } = this.state;

    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    // becase only one is allowed.
    // See our getElement documentation for more:
    // https://stripe.com/docs/stripe-js/reference#elements-get-element
    const cardElement = this.props.elements.getElement('card');
    console.log(this.props);
    // From here we cal call createPaymentMethod to create a PaymentMethod
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    this.props.stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
         name, 
         address,
         phone,
         email,
        },
      })
      .then( async ({paymentMethod}) => {
        console.log('Received Stripe PaymentMethod:', paymentMethod);
        const customer = await api({
          url: 'http://localhost:5000/api/payments/customer',
          method: 'POST',
          data: {
            name,
            email,
            payment_method: paymentMethod.id
          }
        });
        if (customer.status === 200) {
          const  { planId } = this.props;
          const subscription = await api({
            url: 'http://localhost:5000/api/payments/subscription',
            method: 'POST',
            data: { 
              planId,
            },
          });
          console.log(subscription);
        } else {
          console.log(customer.data);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name}/>
        </label>
        <label>
          email
          <input onChange={this.handleChange} type="email" name="email" value={this.state.email}/>
        </label>
        <label>
          Address
          <input onChange={this.handleAddressChange} type="text" name="line1" value={this.state.address.line1} placeholder="Line 1"></input>
          <input onChange={this.handleAddressChange} type="text" name="line2" value={this.state.address.line2} placeholder="Line 2"></input>
          <input onChange={this.handleAddressChange} type="text" name="city"  value={this.state.address.city} placeholder="City"></input>
          <input onChange={this.handleAddressChange}  type="number" name="postal_code" value={this.state.address.postal_code} placeholder="ZIP Code"/>
        </label>
        <label>
          Phone Number
          <input onChange={this.handleChange} type="tel" name="phone" value={this.state.phone}/>
        </label>
        <CardForm />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);