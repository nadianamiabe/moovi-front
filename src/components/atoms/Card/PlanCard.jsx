import React from 'react';
import { Card, Button, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const PlanCard = ({planId, title, description, price, planName}) => {

  return (
    <Card raised style={{marginRight: '50px'}}>
      <Card.Content textAlign="center">
        <Card.Header>{title}</Card.Header>
        <Card.Description>{description}</Card.Description>
        <Image verticalAlign="middle" size="small" src="/images/movie_ticket_black.svg"></Image>
        <Card.Content extra>
          <Link to={`/subscribe/${planId}`}>
            <Button fluid color="yellow" animated='fade'>
              <Button.Content visible>Sign-up for a {planName} plan</Button.Content>
              <Button.Content hidden>${price} a month</Button.Content>
            </Button>
          </Link>
        </Card.Content>
      </Card.Content>
    </Card>
  )

}

export default PlanCard;