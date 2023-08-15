import { observer } from 'mobx-react-lite';
import LoginForm from '../components/LoginForm';
import SigninForm from '../components/SigninForm';
import { Navigate } from 'react-router-dom';
import { type ReactElement, type MouseEventHandler } from 'react';

interface IProp {
  isLoggedIn: boolean;
  isRegistered: boolean;
  handleChangeUsername: (Username:string) => void;
  handleChangePassword: (Password:string) => void;
  handleChangeFirstname: (Firstname:string) => void;
  handleSubmitLogIn: () => void;
  handleSubmitSignIn: () => void;
  error: string;
  changeIsRegistered: MouseEventHandler<HTMLInputElement>;
}
interface IProps {
  store: IProp;
}

const AuthPage:React.FC<IProps> = observer((props): ReactElement => {
  return (
    <div className="container_auth_page">
      {props.store.isLoggedIn ? <Navigate to="/profile" /> : null}
      {props.store.isRegistered ? (
        <LoginForm
          onChangeLog={props.store.changeIsRegistered}
          onChangeUsername={props.store.handleChangeUsername}
          onChangePassword={props.store.handleChangePassword}
          onSubmit={props.store.handleSubmitLogIn}
          error={props.store.error}
        />
      ) : (
        <SigninForm
          onChangeLog={props.store.changeIsRegistered}
          onChangeUsername={props.store.handleChangeUsername}
          onChangePassword={props.store.handleChangePassword}
          onChangeFirstname={props.store.handleChangeFirstname}
          onSubmit={props.store.handleSubmitSignIn}
          error={props.store.error}
        />
      )}
    </div>
  );
});

export default AuthPage;
