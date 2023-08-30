import { useNavigate } from 'react-router-dom';
import errorStyle from './errorpage.module.scss';

export default function Error() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/home');
  };
  return (
    <>
      <div className={errorStyle.pageError}>
        <div className={errorStyle.textError}>
          <h2 className={errorStyle.error}>"404 NOT FOUND"</h2>
          <div>
            <p className={errorStyle.errorText}>PUSH THE BUTTON</p>
            <p className={errorStyle.errorText}> BELOW TO RETUN</p>
            <p className={errorStyle.errorText}> TO THE HOMEPAGE</p>
          </div>
          <button
            className={errorStyle.buttonHome}
            onClick={handleNavigateHome}
          >
            JUST GO HOME
          </button>
        </div>
        <img
          className={errorStyle.imageError}
          src="../../public/carlos.png"
          alt="Nike publi"
        />
      </div>
    </>
  );
}
