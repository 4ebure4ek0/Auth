import React from 'react';
import Error from './Error';

function LogIn(props:any){
    return(
        <form>
        <Error error = {props.error} /><br />
            <p>Enter your username:<br />
                <input type='text' name='username' onChange={props.onChange}/>
            </p>
            <p>Enter your password:<br />
                <input type='text' name='password' onChange={props.onChange}/>
            </p><br />
            <input type='button' value='Log in' onClick={props.onSubmit} />
        </form>
    )
}

export default LogIn;