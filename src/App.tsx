import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './styles/App.css';
import './styles/reset.css';

const ITEMS_PER_PAGE = 12;
const URL_JSON = 'https://pluga.co/ferramentas_search.json';

export interface PlugaApp{
  app_id: string;
  name: string;
  color: string;
  icon: string;
  link: string;
}

export type pageChange = {
  selected: number;
}

function App() {

  const [data, setData] = useState([]);
  // Pagination states and variables
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * ITEMS_PER_PAGE;
  const pageCount = Math.ceil( data.length / ITEMS_PER_PAGE );
  
  useEffect(() => {
    fetchData();
  }, []);

  const currentPageData = data
  .slice(offset, offset + ITEMS_PER_PAGE)
  .map(( item: PlugaApp ) => {
    return (
      <div key={item.app_id}>
        <p>{item.name}</p>
      </div>
    )
  });

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

  function handlePageClick(page: pageChange) {
    setCurrentPage(page.selected);
  }

  return (
    <>
      <h1>Apps</h1>
      <div className='apps_container'>
        { data.slice(offset, offset +ITEMS_PER_PAGE).map((item: PlugaApp) => {
          return (
            <div key={item.app_id}>
              <p>{item.name}</p>
            </div>
          )
        }) }
      </div>
      <ReactPaginate
        pageCount={pageCount}
        previousLabel={"←"}
        nextLabel={"→"}
        onPageChange={handlePageClick}
        marginPagesDisplayed={1}
        breakLabel={"..."}
        containerClassName={"pagination"}
        pageLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </>
  )
}

export default App;