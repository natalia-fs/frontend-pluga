import Modal from 'react-modal';
import { PlugaApp } from '../../App';
import './styles.css';

Modal.setAppElement('#root');

interface AppModalProps{
  isOpen: boolean;
  onRequestClose: () => void;
  item: PlugaApp | null;
  lastestItems: Array<PlugaApp>;
}

export function AppModal({isOpen, onRequestClose, item, lastestItems}: AppModalProps){
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={ onRequestClose }
      overlayClassName="Overlay"
      className="Modal"
    >
      <div className="modal__container">
        <div className="selectedItem__container">
          <img src={item?.icon} alt="" className="selectedItem__image" />
          <div className="selectedItem__infos">
            <p>{item?.name || ''}</p>
            <a href={item?.link} target="_blank">Acessar</a>
          </div>
        </div>
      
        <div className="modal__apps">
          <h3>Ultímas ferramentas visualizadas</h3>
          <ul>
            {
              lastestItems && lastestItems.map((app: PlugaApp) =>{
                return (
                  <li className="modal__apps-item" key={app.app_id}>
                    <img src={app.icon} alt={`${app.name} icon`} />
                    <p>{app.name}</p>
                  </li>
                )
              })
            }
            
          </ul>
        </div>
      </div>
      
    </Modal>
  )
}