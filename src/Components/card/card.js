import React, { useRef } from "react";
import "./card.css";
import useObserver from "../../Observer";

export const Card = ({ image, name, imageLink }) => {
  const ref = useRef();
  const onScreen = useObserver(ref);

  return (
    <div ref={ref} className="inner-card">
      {onScreen ? (
        <>
          <a href={imageLink} target="_blank" rel="noreferrer">
            <img
              loading="lazy"
              className="inner-img"
              alt="monster"
              src={image}
            />
          </a>
          <h3 className="h1-css">Author:{name}</h3>
        </>
      ) : (
        <h1>...Loading</h1>
      )}
    </div>
  );
};
