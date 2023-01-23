import React from 'react';
import Error from './Error';

function SignIn(props:any){
    return(
        <form>
            <Error error = {props.error} /><br />
            <p>Create a username:<br />
                <input type='text' name='username' onChange={props.onChange} />
            </p>
            <p>Create a password:<br />
                <input type='text' name='password' onChange={props.onChange} />
            </p>
            <p>Enter your firstname:<br />
                <input type='text' name='firstname' onChange={props.onChange} />
            </p><br />
            <input type='button' value='Sign in' onClick={props.onSubmit}/>
        </form>
    )
}

export default SignIn;