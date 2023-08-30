import marqueeStyle from './marquee.module.scss';

type Propstype = {
  firstLap: string;
};

export function Marquee({ firstLap }: Propstype) {
  return (
    <>
      <section className={marqueeStyle.container}>
        <div className={marqueeStyle.marquee}>
          <span className={marqueeStyle.text1}>{firstLap}</span>
        </div>
      </section>
    </>
  );
}
