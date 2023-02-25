import { observer } from 'mobx-react-lite';
import { type MouseEventHandler, type ReactElement } from 'react';
import { Navigate } from 'react-router';

interface IProp {
  isLoggedIn: boolean;
  username: string;
  firstname: string;
  handleLogOut: MouseEventHandler<HTMLInputElement>;
}
interface IProps {
  store: IProp;
}

const ProfilePage = observer((props: IProps): ReactElement => {
  return (
    <div className="container_page">
      {props.store.isLoggedIn ? null : <Navigate to="/" />}
      <img src="./img_person.jpg" alt="person" />
      <h1>Hello {props.store.firstname}</h1>
      <ul>
        <li>Your login is: {props.store.username}</li>
      </ul>
      <input type="button" onClick={props.store.handleLogOut} value="Log out" />
    </div>
  );
});

export default ProfilePage;
