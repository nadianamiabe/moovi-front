import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PlanCard  from '../../atoms/Card/PlanCard';
class Home extends Component {

  state = {
    plans: {
      fanatic: 'plan_GG68SiiJKHacGo',
      adventure: 'plan_GG61UfbTdoFMtl',
      basic: 'plan_GG63EMsmJkPfA6',
    },
  };

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Row>
          <Col span={8}>
            <PlanCard 
            planId={this.state.plans.basic} 
            title="Basic Plan" 
            description="5 movies per month" 
            price="19.99"/>
          </Col>
          <Col span={8}>
            <PlanCard 
            planId={this.state.plans.adventure} 
            title="Adventure Plan" 
            description="10 movies per month" 
            price="29.99"/>
          </Col>
          <Col span={8}>
            <PlanCard 
            planId={this.state.plans.fanatic} 
            title="Fanatic Plan" 
            description="Unlimited movies per month" 
            price="49.99"/>
          </Col>
        </Row>
      </div>
      
    )
  }

}

export default Home;
