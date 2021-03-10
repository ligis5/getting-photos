import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import "./App.css";
import { CardGroup } from "./Components/card-group/Card-group";
import SearchBox from "./Components/search-box/search-box.component";
import Particles from "react-particles-js";
import client from "./client";
import ReactPaginate from "react-paginate";
import { particlesOptions } from "./partickle.options";
import Categories from "./Components/Categories";
import Switch from "react-switch";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("nature");
  const [page, setPage] = useState(1);
  const [total_pages, setTotal_pages] = useState([]);
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const chooseCategory = (category) => {
    setQuery(category);
  };

  const fetchData = async () => {
    try {
      const per_page = 27;
      const responseSearch = await client.photos.search({
        page,
        query,
        per_page,
      });
      const pages =
        (await Math.round(
          responseSearch.total_results / responseSearch.per_page
        )) - 1;
      setTotal_pages(pages);
      const dataSearch = await responseSearch.photos;
      setPhotos(dataSearch);
      if (responseSearch.ok) {
        throw Error(responseSearch.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    history.push(`/${query}/${page}`);
    fetchData();
  }, [page, query]);

  const onChange = (current_page) => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

    setPage(current_page.selected + 1);
  };

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <div className="App">
      {checked ? (
        <Particles className="particles" params={particlesOptions} />
      ) : (
        <></>
      )}
      <Route path="/:category/:page">
        <div className="topPart">
          <Categories chooseCategory={chooseCategory} />
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
        </div>
        <SearchBox chooseCategory={chooseCategory} />
        <CardGroup cards={photos} />
        <ReactPaginate
          activeClassName="current"
          containerClassName="paginate"
          activeLinkClassName="paginate-a"
          pageCount={total_pages}
          pageRangeDisplayed="4"
          marginPagesDisplayed="1"
          onPageChange={onChange}
        />
      </Route>
    </div>
  );
};

export default App;
