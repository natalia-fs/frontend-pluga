import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { AppModal } from './components/AppModal';
import Card from './components/Card';
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
  // Modal
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PlugaApp | null>(null);
  const [lastestItens, setLastestItens] = useState<Array<PlugaApp>>([]);
  
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

  function handlePageClick(page: pageChange) {
    setCurrentPage(page.selected);
  }
  
  function selectItemByClick(item: PlugaApp){
    setSelectedItem(item);
    handleOpenAppModal();
  }

  function handleOpenAppModal(){
    setIsAppModalOpen(true);
    if(selectedItem != null){
      let items = [...lastestItens, selectedItem];
      if (items.length>=3)
        setLastestItens([...items.slice(items.length-3, items.length)]);
      else
        setLastestItens(items);
    }
  }
  function handleCloseAppModal(){
    setIsAppModalOpen(false);
  }

  return (
    <div className='App'>
      <h1>Apps</h1>

      <AppModal
        isOpen={isAppModalOpen}
        onRequestClose={handleCloseAppModal}
        item={selectedItem}
        lastestItems={lastestItens}
      />

      <div className='apps_container'>
        { data.slice(offset, offset +ITEMS_PER_PAGE).map((item: PlugaApp) => {
          return (
            <div
              onClick={() => selectItemByClick(item)}
              key={item.app_id}
            >
              <Card
                item={item}
              />
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
    </div>
  )
}

export default App;