import React , { useState, useEffect  } from 'react'
import '../App.css';
import axios from 'axios';

import SearchForm from './SearchForm';
import GifList from './GifList';

function App() {
  
  const [data, setdata] = useState([]);
  const [query, setQuery] = useState('anime');
  const [isLoading, setIsLoading] = useState(true);

  const performSearch = (value) => setQuery(value)

  useEffect( () => {
    axios(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=RFLdpkjUGFesFP13u7kk4ANpcQ5DJs2W`)
    .then(response => setdata(response.data.data))
      .catch(error => console.log('Error fetching and parsing data', error))
      .finally(() => setIsLoading(false));
  },  [query]);

  return (
    <>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">Gif Search</h1>
          <SearchForm onSearch={performSearch} />
        </div>
      </div>
      <div className="main-content">
      {
        isLoading
          ? <p>Loading...</p>
          : <GifList data={data} />
      }
      </div>
    </>
  );
}

export default App

