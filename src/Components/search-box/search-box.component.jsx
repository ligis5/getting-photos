import React, {useRef} from "react";
import "./search-box.styles.css";

 const SearchBox = ({ chooseCategory }) => {
   const categoryRef = useRef();
   const submitNewCategory = (e) => {
     e.preventDefault();
    chooseCategory(categoryRef.current.value)
   }
  return (
  <form className="searchForm" onSubmit={e => submitNewCategory(e)}>
    <input
    className="search"
    type="search"
    placeholder="search cards"
    ref={categoryRef}
  />
  </form>
)
  }


  export default SearchBox
