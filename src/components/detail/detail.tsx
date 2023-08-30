import { useNavigate, useParams } from 'react-router-dom';
import { Sneaker } from '../../models/sneaker.model';
import { useSneakers } from '../../hooks/sneaker.hook';
import Header from '../header/header';
import detailStyle from './detail.module.scss';

export default function Detail() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { sneakers, handleDelete } = useSneakers();
  const { getRandomSneaker } = useSneakers();

  const sneaker: Sneaker | undefined =
    id === 'random'
      ? getRandomSneaker()
      : sneakers.find((item: Sneaker) => item.id === id);

  const handleReturnHome = () => {
    navigate('/home');
  };

  if (!sneaker) {
    return null;
  }

  return (
    <>
      <div>
        <Header></Header>
        <section className={detailStyle.section} aria-hidden="true">
          <div className={detailStyle.div}>
            <ul className={detailStyle.listImage}>
              <li>
                <img
                  className={detailStyle.image}
                  src={sneaker.image.url}
                  alt={sneaker.sneakerModel}
                  width={160}
                  height={180}
                />
              </li>
            </ul>
            <ul className={detailStyle.listText}>
              <div className={detailStyle.top}>
                <div className={detailStyle.topText}>
                  <li aria-hidden="true" data-testid="list" role="list">
                    {sneaker.sneakerModel.toUpperCase()}
                  </li>
                  <li>{sneaker.colorWay.toUpperCase()}</li>
                </div>
                <button
                  className={detailStyle.button}
                  onClick={() => navigate('/editform/' + sneaker.id)}
                >
                  EDIT
                </button>
                <button
                  className={detailStyle.button}
                  onClick={() => {
                    handleDelete(id as string);
                    navigate('/home');
                  }}
                >
                  DELETE
                </button>
              </div>
              <div className={detailStyle.back}>
                <div className={detailStyle.column}>
                  <li className={detailStyle.detail}>
                    DESIGNER: {sneaker.designer.toUpperCase()}
                  </li>
                  <li className={detailStyle.detail}>
                    YEAR: {sneaker.year.toUpperCase()}
                  </li>
                  <li className={detailStyle.detail}>
                    RETAIL: {sneaker.retail.toUpperCase()}
                  </li>
                  <li className={detailStyle.detail}>
                    SKU: {sneaker.SKU.toUpperCase()}
                  </li>
                  <li className={detailStyle.detail}>
                    STATUS: {sneaker.status.toUpperCase()}
                  </li>
                </div>
                <li className={detailStyle.description}>
                  <p className={detailStyle.titleDescription}>DESCRIPTION:</p>
                  {sneaker.description}
                </li>
              </div>
            </ul>
          </div>
          <button className={detailStyle.buttonBack} onClick={handleReturnHome}>
            GOBACK
          </button>
        </section>
      </div>
    </>
  );
}
