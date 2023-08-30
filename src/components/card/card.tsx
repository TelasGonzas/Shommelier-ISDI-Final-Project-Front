import { Sneaker } from '../../models/sneaker.model';
import cardStyle from './card.module.scss';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  sneaker: Sneaker;
};

export function SneakerCard({ sneaker }: PropsType) {
  const navigate = useNavigate();
  const handleAddForm = () => {
    navigate('/detail/' + sneaker.id);
  };

  return (
    <li className={cardStyle.main} key={sneaker.id}>
      <img
        className={cardStyle.image}
        src={sneaker.image.url}
        alt={sneaker.sneakerModel}
        width="250"
        height="220"
      />{' '}
      <div className={cardStyle.info}>
        <div className={cardStyle.text}>
          <p className={cardStyle.model}>
            {sneaker.sneakerModel.toUpperCase()}
          </p>
          <p className={cardStyle.colorWay}>{sneaker.colorWay.toUpperCase()}</p>
        </div>
        <button onClick={handleAddForm} className={cardStyle.button}>
          <img
            className={cardStyle.plusImage}
            src="../../public/plus.png"
            alt=" plus icon"
            width="50"
            height="50"
          />
        </button>
      </div>
    </li>
  );
}
