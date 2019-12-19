import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";
import Carousel from "../Carousel/Carousel";
import PlanCard from "../../atoms/Card/PlanCard";
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
        <article className="pa3 pa5-ns" style={{ paddingBottom: "20px" }}>
          <h1 className="f3 f2-m f2-l">Moovi</h1>
          <p className="lh-copy">
            Moovi é uma aplicação feita para quem gosta de ir ao cinema e
            gostaria de uma alternativa aos preços altos dos ingressos. Nós
            apresentamos uma plataforma completa e organizada dos filmes
            disponíveis em cartaz nos cinemas parceiros mais próximos a você.
            Assine um dos nossos planos e desfrute de uma experiência fácil e
            simples e aproveite todos os filmes sem preocupação.
          </p>
        </article>
        <Container style={{ marginTop: "50px" }}>
          <Card.Group centered style={{ marginBottom: "50px" }}>
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
      </div>
    );
  }
}

export default Home;
