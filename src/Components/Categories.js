import React from "react";
import { useHistory } from "react-router-dom";

const Categories = ({ chooseCategory }) => {
  const categories = [
    "beautiful",
    "space",
    "art",
    "abstract",
    "colorful",
    "nature",
    "people",
    "animals",
    "dark",
    "minimalistic",
  ];
  const history = useHistory();
  const x = (category) => {
    chooseCategory(category);
    history.push(`/${category}`);
  };
  return (
    <div className="categories">
      {categories.map((category) => (
        <button
          className="categories-comp"
          key={category}
          prop={category}
          onClick={() => x(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
