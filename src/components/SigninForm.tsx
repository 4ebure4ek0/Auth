import React, { type ReactElement } from 'react';
import Error from './Error';

function SignIn(props: any): ReactElement {
  return (
    <form>
      <Error error={props.error} />
      <br />
      <p>
        Create a username:
        <br />
        <input type="text" name="username" onChange={props.onChangeUsername} />
      </p>
      <p>
        Create a password:
        <br />
        <input type="text" name="password" onChange={props.onChangePassword} />
      </p>
      <p>
        Enter your firstname:
        <br />
        <input type="text" name="firstname" onChange={props.onChangeFirstname} />
      </p>
      <br />
      <input type="button" value="Sign in" onClick={props.onSubmit} />
    </form>
  );
}

export default SignIn;
