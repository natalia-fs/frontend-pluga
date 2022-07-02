import './styles.css';

type PlugaApp = {
  name: string;
  color: string;
  icon: string;
}

interface CardProps{
  item: PlugaApp;
}

export default function Card({ item }: CardProps){
  return (
    <div className="card__container" style={{backgroundColor: item.color}}>

      <img src={item.icon} alt={`${item.name} icon`} className="card__icon" />
      <p className="card__name">{item.name}</p>

    </div>
  )
}