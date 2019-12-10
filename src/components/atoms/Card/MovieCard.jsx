import React from "react";
import { Card } from "antd";
import { Meta } from "Card";

const MovieCard = ({
  movieTitle,
  overview,
  releaseDate,
  cover,
  title,
  movieCover,
  src
}) => {
  // eslint-disable-next-line no-unused-expressions
  <Card cover={movieCover}>
    <Meta title={movieTitle} />
    <Meta description={overview} />
    <Meta description={releaseDate} />
  </Card>;
};

export default MovieCard;
