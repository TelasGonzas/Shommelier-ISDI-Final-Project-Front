import { useNavigate } from 'react-router-dom';
import { useSneakers } from '../../hooks/sneaker.hook';
import { SyntheticEvent } from 'react';
import formStyle from './addform.module.scss';
import Header from '../header/header';

export default function SneakerAddForm() {
  const navigate = useNavigate();
  const { handleCreateSneaker } = useSneakers();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const sneakerForm = event.target as HTMLFormElement;
    const sneakerData = new FormData(sneakerForm);

    handleCreateSneaker(sneakerData);
    navigate('/home');
  };
  return (
    <>
      <Header></Header>
      <div className={formStyle.form}>
        <form
          className={formStyle.addForm}
          role="form"
          id="form"
          onSubmit={handleSubmit}
        >
          <label className={formStyle.label} htmlFor="sneakerModel">
            MODEL
          </label>
          <input
            className={formStyle.input}
            type="text"
            id="sneakerModel"
            name="sneakerModel"
          ></input>
          <label className={formStyle.label} htmlFor="colorWay">
            COLORWAY
          </label>
          <input
            className={formStyle.input}
            type="text"
            id="colorWay"
            name="colorWay"
          ></input>
          <label className={formStyle.label} htmlFor="designer">
            DESIGNER
          </label>
          <input
            className={formStyle.input}
            type="text"
            id="designer"
            name="designer"
          ></input>
          <label className={formStyle.label} htmlFor="year">
            YEAR
          </label>
          <input
            className={formStyle.input}
            type="text"
            id="year"
            name="year"
          ></input>
          <label className={formStyle.label} htmlFor="retail">
            RETAIL
          </label>
          <input
            className={formStyle.input}
            type="text"
            id="retail"
            name="retail"
          ></input>
          <label className={formStyle.label} htmlFor="SKU">
            SKU
          </label>
          <input
            className={formStyle.input}
            type="text"
            id="SKU"
            name="SKU"
          ></input>
          <label className={formStyle.label} htmlFor="status">
            STATUS
          </label>
          <select className={formStyle.input} name="status" id="status">
            <option value="DSWT">DSWT</option>
            <option value="DS">DS</option>
            <option value="VNDS">VNDS</option>
            <option value="USED">USED</option>
          </select>
          <label className={formStyle.label} htmlFor="description">
            DESCRIPTION
          </label>
          <input
            className={formStyle.input}
            type="text"
            id="description"
            name="description"
          ></input>
          <div className={formStyle.back}>
            <div className={formStyle.img}>
              <label htmlFor="image">ADDPICTURE</label>
              <img src="../../public/camara.png" alt="camera icon" width={80} />
              <input
                className={formStyle.inputFile}
                type="file"
                name="image"
                id="image"
              ></input>
            </div>
            <button className={formStyle.button} type="submit">
              SUBMIT
            </button>
          </div>
        </form>
        <img className={formStyle.image} src="../../public/hug.webp" alt="" />
      </div>
    </>
  );
}
