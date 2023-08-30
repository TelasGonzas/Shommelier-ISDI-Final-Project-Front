import { useNavigate } from 'react-router-dom';
import headerStyle from './header.module.scss';
import { useSneakers } from '../../hooks/sneaker.hook';

export default function Header() {
  const navigate = useNavigate();
  const { getRandomSneaker } = useSneakers();

  const handleNavigateHome = () => {
    navigate('/home');
  };

  const handleAddForm = () => {
    navigate('/addform');
  };

  const handleLogOut = () => {
    navigate('/');
  };

  const handleRandomSneaker = async () => {
    const randomSneaker = await getRandomSneaker();
    if (randomSneaker) {
      navigate(`/detail/${randomSneaker.id}`);
    }
  };

  return (
    <div>
      <header className={headerStyle.header}>
        <button onClick={handleNavigateHome} className={headerStyle.title}>
          "SHOEMMELIER"
        </button>
        <button className={headerStyle.button} onClick={handleAddForm}>
          ADDSNEAKER
        </button>
        <button className={headerStyle.button} onClick={handleRandomSneaker}>
          KOTD
        </button>
        <button className={headerStyle.button} onClick={handleLogOut}>
          LOGOUT
        </button>
      </header>
    </div>
  );
}
