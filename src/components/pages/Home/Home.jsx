import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";
import Carousel from "../Carousel/Carousel";
import PlanCard from "../../atoms/Card/PlanCard";
import Movies from "../movies/Movies";
class Home extends Component {
  state = {
    plans: {
      fanatic: "plan_GG68SiiJKHacGo",
      adventure: "plan_GG61UfbTdoFMtl",
      basic: "plan_GG63EMsmJkPfA6"
    }
  };

  render() {
    return (
      <div>
        <Carousel />
        <Container>
          <Card.Group centered>
            <PlanCard
              planId={this.state.plans.basic}
              title="Basic Plan"
              description="Watch 5 movies per month"
              price="19.99"
            />

            <PlanCard
              planId={this.state.plans.adventure}
              title="Adventure Plan"
              description="Watch 10 movies per month"
              price="29.99"
            />

            <PlanCard
              planId={this.state.plans.fanatic}
              title="Fanatic Plan"
              description="Watch unlimited movies per month"
              price="49.99"
            />
          </Card.Group>
        </Container>
        <Movies />
      </div>
    );
  }
}

export default Home;
