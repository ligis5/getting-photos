import React from "react";
import { Card } from "../card/card";
import "./card-group.css";

export const CardGroup = (props) => {
  return (
    <div className="card-group">
      {props.cards.map((card) => (
        <Card
          key={card.id}
          name={card.photographer}
          image={card.src.portrait}
          imageLink={card.src.original}
          category={card.category}
        />
      ))}
    </div>
  );
};
