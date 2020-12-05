import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import {CardGroup} from './Components/card-group/Card-group'
import {SearchBox} from './Components/search-box/search-box.component'
import { createClient } from 'pexels';
import Particles from 'react-particles-js';


const client = createClient('***REMOVED***');

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
  'future',
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
      query: 'space'
    }
  }
  fetchData = async () => {
    const {query} = this.state
    try {
      const responseSearch = await client.photos.search({ query,size: 'tiny' , per_page: 21 });
      const dataSearch = await responseSearch.photos;
      console.log(responseSearch)
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
    // have a condition to avoid infinite fetchData calls
    if (prevState.query !== this.state.query) {
      this.fetchData();
    }
  }
 
 

render() {
  const {photos, search, query} = this.state;
  const filteredImages = photos.filter( card =>
     card.photographer.toLowerCase().includes(search.toLowerCase() )
  ) 
  const homePage = () => (
    <div className='nav'>
      {categories.map(category => (
         <button className={'nav-comp'} 
         key={category} prop={category} 
         onClick={() => this.setState({query: category})} >
         <Link to={'/' + category}>{category}</Link>
         </button>
       ))}
    </div>
  )
  
      return (
      <div className="App">
      <Particles className ='particles'
       params={particlesOptions}
       />
       <Route  path='/' component={homePage} />
       <SearchBox  
          placeholder='search cards'
          handleChange={e => this.setState({search: e.target.value})}
        />
        <CardGroup cards={filteredImages} />
      </div>
     );  
}
}




export default App;
