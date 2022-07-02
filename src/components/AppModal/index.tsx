import Modal from 'react-modal';
import { PlugaApp } from '../../App';

Modal.setAppElement('#root');

interface AppModalProps{
  isOpen: boolean;
  onRequestClose: () => void;
  item: PlugaApp | null;
}

export function AppModal({isOpen, onRequestClose, item}: AppModalProps){
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={ onRequestClose }
    >
      <div className="modal__container">
        <div className="selectedItem__container">
          <img src={item?.icon} alt="" className="selectedItem__image" />
          <div className="selectedItem__infos">
            <p>{item?.name || ''}</p>
            <a href={item?.link} target="_blank"></a>
          </div>
        </div>
      
        <div className="modal__apps">
          <h3>Ultímas ferramentas visualizadas</h3>
          <ul>
            <li className="modal__apps-item">
              <img src="" alt={''} />
              <p></p>
            </li>
          </ul>
        </div>
      </div>
      
    </Modal>
  )
}