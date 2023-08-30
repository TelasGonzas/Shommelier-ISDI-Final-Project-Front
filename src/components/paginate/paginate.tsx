import { useSneakers } from '../../hooks/sneaker.hook';
import Filter from '../filter/filter';
import pageStyle from './paginate.module.scss';

export default function Paginate() {
  const { handleNextPage, handlePreviousPage, next, previous } = useSneakers();

  const handleLoadNext = () => {
    const url = next;
    if (!url) return;
    handleNextPage(url);
  };

  const handleLoadPrevious = () => {
    const url = previous;
    if (!url) return;
    handlePreviousPage(url);
  };
  return (
    <div className={pageStyle.button}>
      <div>
        {previous ? (
          <button className={pageStyle.buttonPrev} onClick={handleLoadPrevious}>
            <img src="../../public/prev.png" alt="previous page button" />
          </button>
        ) : (
          <button
            className={pageStyle.buttonPrev}
            onClick={handleLoadPrevious}
            disabled
          >
            <img src="../../public/prev.png" alt="previous page button" />
          </button>
        )}
      </div>
      <Filter></Filter>
      {next ? (
        <button className={pageStyle.buttonNext} onClick={handleLoadNext}>
          {' '}
          <img src="../../public/next.png" alt="next page button" />
        </button>
      ) : (
        <button
          className={pageStyle.buttonNext}
          onClick={handleLoadNext}
          disabled
        >
          <img src="../../public/next.png" alt="next page button" />
        </button>
      )}
    </div>
  );
}
