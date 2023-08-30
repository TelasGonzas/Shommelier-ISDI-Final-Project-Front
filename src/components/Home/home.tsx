import { useEffect } from 'react';
import { useSneakers } from '../../hooks/sneaker.hook';
import { SneakerCard } from '../card/card';
import Header from '../header/header';
import homeStyle from './home.module.scss';

import Paginate from '../paginate/paginate';
import { Marquee } from '../marquee/marquee';

export default function Home() {
  const { sneakers, handleLoadSneakers } = useSneakers();

  useEffect(() => {
    handleLoadSneakers();
  }, [handleLoadSneakers]);

  return (
    <>
      <Header></Header>

      <div>
        <Paginate></Paginate>
        <ul className={homeStyle.list}>
          {sneakers.map((sneaker) => (
            <SneakerCard sneaker={sneaker} key={sneaker.id}></SneakerCard>
          ))}
        </ul>
      </div>
      <Marquee
        firstLap={
          'A SHOEMMELIER IS SOMEONE WHO LEARNED ROMAN NUMERALS BY COLLECTING JORDANS. A SHOEMMELIER IS SOMEONE WHO LEARNED ROMAN NUMERALS BY COLLECTING JORDANS. '
        }
      ></Marquee>
    </>
  );
}
