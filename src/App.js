import React, { useState, useEffect, useRef } from "react";
import {Routes, Route, useLocation, useNavigate, useParams, Outlet} from "react-router-dom";

import "./App.css";
import { CardGroup } from "./Components/card-group/Card-group";
import SearchBox from "./Components/search-box/search-box.component";
import Particles from "react-particles-js";

import ReactPaginate from "react-paginate";
import { particlesOptions } from "./partickle.options";
import Categories from "./Components/Categories";
import Switch from "react-switch";
import usePhotos from "./usePhotos";

const App = () => {
  const [checked, setChecked] = useState(false);
  const [p, setP] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const appRef = useRef();
  const navigate = useNavigate();
  const {photos,query, page, total_pages} = usePhotos({p});
  const onChange = (current_page) => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    setP(current_page.selected + 1);
    navigate(`/${query}/${page}`, { page:page });
  };

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  useEffect(() => {
    if(appRef) setLoaded(true)
    return () => {
      setLoaded(false);
    }
  }, [appRef])

  return (
    
    <Routes>
    <Route path='/' element={<div className="App" ref={appRef}>
      <div className="topPart">
          <Categories />
        </div>
    <SearchBox />
    <div className="onOff">
            <Switch
              checked={checked}
              onChange={handleChange}
              onColor="#DFFF00"
              onHandleColor="#00ffd0"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgb(0, 255, 208,0.2)"
              height={20}
              width={48}
              className="react-switch"
              id="material-switch"
            />
          </div>
      {checked ? (
        <Particles className="particles" params={particlesOptions} />
      ) : (
        <></>
      )}
      
      <Outlet/>
      
        <ReactPaginate
          activeClassName="current"
          containerClassName="paginate"
          activeLinkClassName="paginate-a"
          pageCount={total_pages}
          pageRangeDisplayed="4"
          marginPagesDisplayed="1"
          onPageChange={onChange}
        />
        
    </div>}>
    <Route path='/:id/:page' element={<CardGroup cards={photos}/>}/>
      </Route>
    </Routes>
  );
};

export default App;
