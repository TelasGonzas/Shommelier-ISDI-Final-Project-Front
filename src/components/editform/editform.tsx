import { SyntheticEvent } from 'react';
import { useSneakers } from '../../hooks/sneaker.hook';
import { Sneaker } from '../../models/sneaker.model';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import editStyle from './editform.module.scss';
import Header from '../header/header';

export default function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sneakers } = useSelector((state: RootState) => state.sneakers);
  const { handleEditSneaker } = useSneakers();

  const sneaker: Sneaker = sneakers.find(
    (item: Sneaker) => item.id === id
  ) as Sneaker;

  const handleEditForm = async (event: SyntheticEvent) => {
    event.preventDefault();

    const formRegisterElement: HTMLFormElement =
      event.target as HTMLFormElement;

    const data: Partial<Sneaker> = {
      id: sneaker.id,
      sneakerModel: (
        formRegisterElement.elements.namedItem(
          'sneakerModel'
        ) as HTMLFormElement
      ).value,
      colorWay: (
        formRegisterElement.elements.namedItem('colorWay') as HTMLFormElement
      ).value,
      designer: (
        formRegisterElement.elements.namedItem('designer') as HTMLFormElement
      ).value,
      year: (formRegisterElement.elements.namedItem('year') as HTMLFormElement)
        .value,
      status: (
        formRegisterElement.elements.namedItem('status') as HTMLFormElement
      ).value,
      retail: (
        formRegisterElement.elements.namedItem('retail') as HTMLFormElement
      ).value,
      SKU: (formRegisterElement.elements.namedItem('SKU') as HTMLFormElement)
        .value,
      description: (
        formRegisterElement.elements.namedItem('description') as HTMLFormElement
      ).value,
    };

    await handleEditSneaker(data);
    navigate('/home');
  };

  return (
    <>
      <Header></Header>
      <div className={editStyle.form}>
        <form
          className={editStyle.editForm}
          id="form"
          onSubmit={handleEditForm}
        >
          <label className={editStyle.label} htmlFor="sneakerModel">
            MODEL
          </label>

          <input
            className={editStyle.input}
            id="sneakerModel"
            type="text"
            defaultValue={sneaker.sneakerModel}
            name="sneakerModel"
          ></input>
          <label className={editStyle.label} htmlFor="colorWay">
            COLORWAY
          </label>

          <input
            className={editStyle.input}
            type="text"
            defaultValue={sneaker.colorWay}
            name="colorWay"
          ></input>
          <label className={editStyle.label} htmlFor="designer">
            DESIGNER
          </label>

          <input
            className={editStyle.input}
            type="text"
            defaultValue={sneaker.designer}
            name="designer"
          ></input>
          <label className={editStyle.label} htmlFor="year">
            YEAR
          </label>

          <input
            className={editStyle.input}
            type="text"
            defaultValue={sneaker.year}
            name="year"
          ></input>
          <label className={editStyle.label} htmlFor="status">
            STATUS
          </label>
          <select className={editStyle.input} name="status" id="status">
            <option value="DSWT">DSWT</option>
            <option value="DS">DS</option>
            <option value="VNDS">VNDS</option>
            <option value="USED">USED</option>
          </select>
          <label className={editStyle.label} htmlFor="retail">
            RETAIL
          </label>
          <input
            className={editStyle.input}
            type="text"
            defaultValue={sneaker.retail}
            name="retail"
          ></input>
          <label className={editStyle.label} htmlFor="SKU">
            SKU
          </label>
          <input
            className={editStyle.input}
            type="text"
            defaultValue={sneaker.SKU}
            name="SKU"
          ></input>
          <label className={editStyle.label} htmlFor="description">
            DESCRIPTION
          </label>
          <input
            className={editStyle.input}
            type="text"
            defaultValue={sneaker.description}
            name="description"
          ></input>

          <button className={editStyle.button} type="submit">
            SEND
          </button>
        </form>
        <img
          className={editStyle.image}
          src="../../public/jordan2.jpeg"
          alt=""
        />
      </div>
    </>
  );
}
