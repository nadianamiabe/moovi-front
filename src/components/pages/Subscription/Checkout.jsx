import React,{ Component} from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import api from '../../../api'
import './Checkout.css';
import { Redirect } from "react-router-dom";


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
      url: `${process.env.REACT_APP_API_URL}/payments/public-key`,
      method: 'GET',
    });
    const { key } = request.data;
    return key;
  }

  render() {
    if (this.props.isSubscribed) {
      return (
        <Redirect to={'/movies/now-playing'} />
      )
    }
    const { planId }  = this.props.computedMatch.params;
    console.log(planId);
    return (
      <div className="checkout">
        {this.state.apiKey && (
          <StripeProvider apiKey={this.state.apiKey}>
            <Elements>
              <CheckoutForm history={this.props.history} planId={planId} />
            </Elements>
          </StripeProvider>
        )}
      </div>
    );
  }
}

export default Checkout;