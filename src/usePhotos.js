import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClient } from 'pexels';

const usePhotos = ({p}) => {
    const location = useLocation()
    const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState(location.state ? location.state : 'nature');
  const [page, setPage] = useState(p);
  const [total_pages, setTotal_pages] = useState([]);
  const client = createClient('***REMOVED***');
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
    if(location.state){
      setQuery(location.state)
    }
  }, [location.state, p])
  useEffect(() => {
    if(p && !isNaN(p)){
      setPage(p)
    }
  }, [p])
  useEffect(() => {
    fetchData();
  }, [page, query]);

return {
    photos,query, page, total_pages
}
}
export default usePhotos;