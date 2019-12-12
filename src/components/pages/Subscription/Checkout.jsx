import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import api from '../../../api/api';
import './Checkout.css';


class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: null
    };
  }

  async componentDidMount() {
    const key = await this.getKey();
    console.log(key);
      this.setState({
        apiKey: key
      });
  }

  getKey = async () => {
    const request = await api({
      url: 'http://localhost:5000/api/payments/public-key',
      method: 'GET',
    });
    const { key } = request.data;
    return key;
  }

  render() {
    const { planId }  = this.props.computedMatch.params;
    console.log(planId);
    return (
      <div className="checkout">
        {this.state.apiKey && (
          <StripeProvider apiKey={this.state.apiKey}>
            <Elements>
              <CheckoutForm planId={planId} />
            </Elements>
          </StripeProvider>
        )}
      </div>
    );
  }
}

export default Checkout;