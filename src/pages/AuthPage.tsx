import { observer } from 'mobx-react-lite';
import LoginForm from '../components/LoginForm';
import SigninForm from '../components/SigninForm';
import { Navigate } from 'react-router-dom';
import { type ReactElement, type MouseEventHandler } from 'react';

interface IProp {
  isLoggedIn: boolean;
  isRegistered: boolean;
  handleChangeUsername: (event: any) => void;
  handleChangePassword: (event: any) => void;
  handleChangeFirstname: (event: any) => void;
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
      {/* <input onClick={props.store.changeIsRegistered} value={props.store.isRegistered ? "I'm not registered" : "I'm registered"}/> */}
    </div>
  );
});

export default AuthPage;
