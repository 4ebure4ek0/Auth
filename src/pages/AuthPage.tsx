import { observer } from "mobx-react-lite";
import LoginForm from "../components/LoginForm";
import SigninForm from "../components/SigninForm";
import { Navigate } from "react-router-dom";
import { ReactElement } from "react";

const AuthPage = observer((props: any):ReactElement => {
    return(
        <>
        {props.store.isLogggedIn? <Navigate to='/profile'/>: null}
        {props.store.isRegistered ? <LoginForm onChange={props.store.handleChange} onSubmit={props.store.handleSubmitLogIn} error={props.store.error} /> : <SigninForm onChange={props.store.handleChange} onSubmit={props.store.handleSubmitSignIn} error={props.store.error} />}
        <input type='button' onClick={props.store.changeIsRegistered} value={props.store.isRegistered? "I'm not registered":"I'm registered"} />
        </>
    )
})

export default AuthPage