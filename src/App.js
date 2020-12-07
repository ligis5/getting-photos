import React, {Component} from 'react';
import { Route, Link, BrowserRouter as Routing } from 'react-router-dom';
import './App.css';
import {CardGroup} from './Components/card-group/Card-group';
import {SearchBox} from './Components/search-box/search-box.component';
import Particles from 'react-particles-js';
import client from './client';
import ReactPaginate from 'react-paginate';






const particlesOptions = {
  particles: {
      number: {
          value: 80,
          density: {
              enable: true,
              value_area: 800
          }
      },
      line_linked: {
          enable: true,
          opacity: 0.02
      },
      move: {
          direction: "right",
          speed: 0.05
      },
      size: {
          value: 2
      },
      opacity: {
          anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05
          }
      }
  },
  
}
const categories = [
  'beautiful',
  'space',
  'art',
  "abstract",
  "colorful",
  "nature",
  'people',
  'animals',
  'dark',
  'minimalistic'
 ]

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      photos: [],
      query: 'nature',
      page: 1,
      per_page: 21,
      total_pages: []
    }
  }

  fetchData = async () => {
    const {query, page, per_page} = this.state
    try {
      const responseSearch = await client.photos.search({ page, query, size: 'tiny' , per_page });
      const pages = await Math.round(responseSearch.total_results / responseSearch.per_page) -1;
      this.setState({total_pages: pages})
      const dataSearch = await responseSearch.photos;
      this.setState({ photos: dataSearch })
      if (responseSearch.ok) {
        throw Error(responseSearch.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchData();
    }
    if (prevState.page !== this.state.page) {
      this.fetchData();
    }
  }
 
  onChange = current_page => {
    this.setState({
      page: current_page.selected+1,
    });
  };


render() {
  const {photos, search, total_pages, page, query} = this.state;
  const filteredImages = photos.filter( card =>
     card.photographer.toLowerCase().includes(search.toLowerCase() )
  ) 

  const homePage = props => {
    console.log(props.location)
  return(
    
    <div className='nav'>
      {categories.map(category => (
         <button className='nav-comp'
         key={category} prop={category} 
         onClick={() => this.setState({query: category})} >
         <Link style={{textDecoration: 'none'}} to={'/' + category}>{category}</Link>
         </button>
       ))}
    </div>
  )}

  
  
      return (
      <div className="App">
      <Particles className ='particles'
       params={particlesOptions}
       />
       <Route path='/' component={homePage} />
       <SearchBox  
          placeholder='search cards'
          handleChange={e => this.setState({search: e.target.value})}
        />
        <Routing>
        <CardGroup cards={filteredImages} />
        
        <ReactPaginate
        activeClassName='current'
      containerClassName='paginate'
      activeLinkClassName='paginate-a'
      initialPage='1'
        pageCount={total_pages}
        pageRangeDisplayed='4'
        marginPagesDisplayed='1'
        onPageChange={this.onChange}
      />
      </Routing>
      </div>
     );  
}
}




export default App;
