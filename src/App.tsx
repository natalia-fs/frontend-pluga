import { useState, useEffect } from 'react';
import './App.css'

const ITEMS_PER_PAGE = 12;
const URL_JSON = 'https://pluga.co/ferramentas_search.json';

export interface PlugaApp{
  app_id: string;
  name: string;
  color: string;
  icon: string;
  link: string;
}

function App() {

  const [data, setData] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  function fetchData(): void {
    fetch(URL_JSON)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <h1>Apps</h1>
      <ul>
        {data && data.map((item: PlugaApp) => {
          return (
            <li key={item.app_id}>{item.name}</li>
          )
        })}
      </ul>
    </>
  )
}

export default App
