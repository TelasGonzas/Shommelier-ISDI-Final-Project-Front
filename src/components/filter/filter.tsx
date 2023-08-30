import { SyntheticEvent } from 'react';
import { useSneakers } from '../../hooks/sneaker.hook';
import filterStyle from './filter.module.scss';

export default function Filter() {
  const { handleLoadSneakers, handleLoadFiltered } = useSneakers();

  const handleFilter = (event: SyntheticEvent) => {
    const element = event.target as HTMLButtonElement;
    if (element.name === 'status') {
      const filter = `status=${element.value}`;
      handleLoadFiltered(filter);
    }
  };
  return (
    <section>
      <div className={filterStyle.div}>
        <button className={filterStyle.button} onClick={handleLoadSneakers}>
          SHOW ALL
        </button>
        <button
          className={filterStyle.button}
          onClick={handleFilter}
          name="status"
          value="DSWT"
        >
          DSWT
        </button>
        <button
          className={filterStyle.button}
          onClick={handleFilter}
          name="status"
          value="DS"
        >
          DS
        </button>
        <button
          className={filterStyle.button}
          onClick={handleFilter}
          name="status"
          value="VNDS"
        >
          VNDS
        </button>
        <button
          className={filterStyle.button}
          onClick={handleFilter}
          name="status"
          value="USED"
        >
          USED
        </button>
      </div>
    </section>
  );
}
