import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const PlanCard = ({planId, title, description, price}) => {

  return (
    <div style={{background: '#ECECEC', padding: '30px'}}>
      <Card 
      title={title} 
      actions={[
        <Link to={`/subscribe/${planId}`}>
          <Button type="primary" block>
            {`R$${price} / month`}
          </Button>
        </Link>
      ]}>
        <Meta description={description} />
        <img src='/images/movie_ticket_black.svg' width="50" alt="ticket" />
      </Card>
    </div>
  )

}

export default PlanCard;