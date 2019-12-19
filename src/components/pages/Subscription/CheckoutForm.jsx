import React, { Component } from 'react';
import CardForm from './CardForm';
import  { injectStripe } from 'react-stripe-elements';
import api from '../../../api/api';
import { Form, Container, FormField, Button, Transition, Image, Header } from 'semantic-ui-react';

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
      disabled: false,
      error: '',
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

  redirect = () => {
    setTimeout(() => {
      this.props.history.push('/movies/now-playing');
    }, 2000);
  }
  

  handleSubmit = (ev) => {
    ev.preventDefault();
    
    
    const { name, address, phone, email } = this.state;
    
    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    // becase only one is allowed.
    // See our getElement documentation for more:
    // https://stripe.com/docs/stripe-js/reference#elements-get-element
    const cardElement = this.props.elements.getElement('card');
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
        this.setState({processing: true, disabled: true });
        const customer = await api({
          url: `${process.env.REACT_APP_API_URL}/payments/customer`,
          method: 'POST',
          data: {
            name,
            email,
            payment_method: paymentMethod.id
          }
        });
        console.log('customer created', customer.id);
        const  { planId } = this.props;
        await api({
          url: `${process.env.REACT_APP_API_URL}/payments/subscription`,
          method: 'POST',
          data: { 
            planId,
          },
        });
        console.log('subscription created')
        this.setState({processing: false, disabled: false, succeeded: true});
      })
      .catch(err => this.setState({processing: false, disabled: false, error: err.message}));
  };

  renderSuccess = () => {
    return (
    <div>
      <Transition 
      animation="pulse" 
      duration={1000} 
      transitionOnMount 
      onStart={this.redirect}>
        <Image centered src="/images/success.svg" size="medium" />
      </Transition>
      <Header textAlign="center" as="h2">Subscription Created!</Header>
    </div>
    )
  }

  renderError = () => {
      return (
      <div>
        <Transition 
        animation="pulse" 
        duration={1000} 
        transitionOnMount>
          <Image centered src="/images/error.svg" size="medium" />
        </Transition>
      <Header textAlign="center" as="h2">{this.state.error}</Header>
      </div>
      )
  }



  renderForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name}/>
        </Form.Field>
        <Form.Field>
          <label>email</label>
          <input onChange={this.handleChange} type="email" name="email" value={this.state.email}/>
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input onChange={this.handleAddressChange} type="text" name="line1" value={this.state.address.line1} placeholder="Line 1"></input>
          <input onChange={this.handleAddressChange} type="text" name="line2" value={this.state.address.line2} placeholder="Line 2"></input>
          <input onChange={this.handleAddressChange} type="text" name="city"  value={this.state.address.city} placeholder="City"></input>
          <input onChange={this.handleAddressChange}  type="number" name="postal_code" value={this.state.address.postal_code} placeholder="ZIP Code"/>
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <input onChange={this.handleChange} type="tel" name="phone" value={this.state.phone}/>
        </Form.Field>
        <FormField>
          <label>Credit Card</label>
          <CardForm />
        </FormField>  
        <Button disabled={this.state.disabled} loading={this.state.processing} color="yellow">Confirm order</Button>
      </Form>
    )
  }
  
  render() {
    return (
    <Container style={{ position:'relative', width: '35%', margin: '0 auto', paddingTop: '100px'}}>
      {(!this.state.succeeded && this.state.error) && this.renderError()}
      {this.state.succeeded && this.renderSuccess()}
      {!this.state.succeeded && this.renderForm()}
    </Container>
    );
  }
}


export default injectStripe(CheckoutForm);