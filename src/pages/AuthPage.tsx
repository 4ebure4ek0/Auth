import { observer } from 'mobx-react-lite';
import LoginForm from '../components/LoginForm';
import SigninForm from '../components/SigninForm';
import { Navigate } from 'react-router-dom';
import { type ReactElement, type MouseEventHandler } from 'react';

interface IProp {
  isLoggedIn: boolean;
  isRegistered: boolean;
  handleChange: (event: any) => void;
  handleSubmitLogIn: () => void;
  handleSubmitSignIn: () => void;
  error: string;
  changeIsRegistered: MouseEventHandler<HTMLInputElement>;
}
interface IProps {
  store: IProp;
}

const AuthPage = observer((props: IProps): ReactElement => {
  return (
    <div className="container_auth_page">
      {props.store.isLoggedIn ? <Navigate to="/profile" /> : null}
      {props.store.isRegistered ? (
        <LoginForm
          onChange={props.store.handleChange}
          onSubmit={props.store.handleSubmitLogIn}
          error={props.store.error}
        />
      ) : (
        <SigninForm
          onChange={props.store.handleChange}
          onSubmit={props.store.handleSubmitSignIn}
          error={props.store.error}
        />
      )}
      <input
        type="button"
        onClick={props.store.changeIsRegistered}
        value={props.store.isRegistered ? "I'm not registered" : "I'm registered"}
      />
    </div>
  );
});

export default AuthPage;
