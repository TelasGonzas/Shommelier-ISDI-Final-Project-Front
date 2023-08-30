import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginStyle from './login.module.scss';
import Swal from 'sweetalert2';
import { useUsers } from '../../hooks/user.hook';
import { User } from '../../models/user.model';

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useUsers();
  const [authError, setAuthError] = useState(false);

  const handleRegisterPage = () => {
    navigate('/register');
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLFormElement;
    const usernameInput = element.querySelector(
      'input[name="user"]'
    ) as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    if (!usernameInput.value || !passwordInput.value) {
      setAuthError(true);
      return;
    }

    const loggedUser = {
      user: usernameInput.value,
      password: passwordInput.value,
    } as Partial<User>;

    const loginSuccess = await handleLogin(loggedUser);
    if (loginSuccess) {
      navigate('/home');
      Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'LOGGED',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    }
    if (!loginSuccess) {
      setAuthError(true);
      navigate('/');
    }
  };

  return (
    <>
      <div className={loginStyle.main}>
        <h1 className={loginStyle.title}>"SHOEMMELIER"</h1>
        <section className={loginStyle.login}>
          <form className={loginStyle.loginForm} onSubmit={handleSubmit}>
            <h2 className={loginStyle.loginFormTitle}>LOGIN</h2>

            <div className={loginStyle.formGroup}>
              <label className={loginStyle.label} htmlFor="user">
                Username
              </label>
              <input
                className={loginStyle.input}
                type="text"
                id="user"
                name="user"
              />
            </div>
            <div className={loginStyle.formGroup}>
              <label className={loginStyle.label} htmlFor="password">
                Password
              </label>
              <input
                className={loginStyle.input}
                type="password"
                id="password"
                name="password"
              />
            </div>
            {authError && (
              <p className={loginStyle.errorMessage}>
                Invalid username or password.
              </p>
            )}
            <div>
              <button className={loginStyle.loginFormButton} type="submit">
                SEND
              </button>
              <button
                className={loginStyle.registerFormLink}
                role="button"
                aria-selected="true"
                type="button"
                onClick={handleRegisterPage}
              >
                REGISTER
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
