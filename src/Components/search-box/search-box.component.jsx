import React, { useState, useEffect} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./search-box.styles.css";

 const SearchBox = () => {
  let navigate = useNavigate();
   const [category, setCategory] = useState('');
   const {id, page} = useParams()
   const location = useLocation();
   const categorySearch = (e) => {
setCategory(e.target.value)
   }
   const submitNewCategory = (e) => {
     e.preventDefault();
     if(category.length > 0){
        navigate(`/${category}/1`,{state:category, page:'1'})
     setCategory('')
      }
    
   }
   // if go new url if its different from current one
   useEffect(() => {
     let p =isNaN(page)?1:page;
     if(id != location.state)navigate(`/${id}/${p}`,{state:id, page:p})
     if(!location.state && !id)navigate(`/nature/${p}`,{state:'nature, page:p'})
   }, [id])
  return (
  <form className="searchForm" onSubmit={e => submitNewCategory(e)}>
    <input
    className="search"
    type="search"
    placeholder="search cards"
    onChange={categorySearch}
    value={category}
  />
  </form>
)
  }


  export default SearchBox
