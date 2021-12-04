import React from "react";
import { Link  } from "react-router-dom";

const Categories = () => {
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
  return (
    <div className="categories">
      {categories.map((category) => (
        <Link
          className="categories-comp"
          key={category}
          to={`/${category}/1`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
