/* eslint-disable @typescript-eslint/no-unused-vars */
import { SyntheticEvent } from 'react';
import { useUsers } from '../../hooks/user.hook';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import registerStyle from './register.module.scss';

export default function Register() {
  const { handleRegister } = useUsers();
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate('/');
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const formRegisterElement = event.target as HTMLFormElement;

    const newUser = {
      username: (
        formRegisterElement.elements.namedItem('username') as HTMLInputElement
      ).value,
      email: (
        formRegisterElement.elements.namedItem('email') as HTMLInputElement
      ).value,
      password: (
        formRegisterElement.elements.namedItem('password') as HTMLInputElement
      ).value,
    };
    if (
      newUser.username === '' ||
      newUser.email === '' ||
      newUser.password === ''
    ) {
      Swal.fire('Any GOOFY can use a computer');
      navigate('/register');
    } else {
      handleRegister(newUser);
      navigate('/');
    }
  };

  return (
    <>
      <div className={registerStyle.main}>
        <h1 className={registerStyle.title}>"SHOEMMELIER"</h1>
        <form onSubmit={handleSubmit} className={registerStyle.form}>
          <h2 className={registerStyle.formTitle}>REGISTER</h2>
          <div className={registerStyle.field}>
            <label className={registerStyle.label} htmlFor="username">
              Username:{' '}
            </label>
            <input
              className={registerStyle.input}
              type="text"
              id="username"
              name="username"
            />
          </div>
          <div className={registerStyle.field}>
            <label className={registerStyle.label} htmlFor="email">
              Email:{' '}
            </label>
            <input
              className={registerStyle.input}
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className={registerStyle.field}>
            <label className={registerStyle.label} htmlFor="password">
              Password:{' '}
            </label>
            <input
              className={registerStyle.input}
              type="password"
              id="password"
              name="password"
            />
          </div>
          <div>
            <button className={registerStyle.submit} type="submit">
              SEND
            </button>
            <button
              className={registerStyle.loginButton}
              role="button"
              onClick={handleLoginPage}
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
