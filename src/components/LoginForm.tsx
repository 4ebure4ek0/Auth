import Error from './Error';
import { type ReactElement } from 'react';

function LogIn(props: any): ReactElement {
  return (
    <form>
      <Error error={props.error} />
      <br />
      <p>
        Enter your username:
        <br />
        <input type="text" name="username" onChange={props.onChangeUsername} />
      </p>
      <p>
        Enter your password:
        <br />
        <input type="text" name="password" onChange={props.onChangePassword} />
      </p>
      <br />
      <input type="button" value="Log in" onClick={props.onSubmit} />
    </form>
  );
}

export default LogIn;
