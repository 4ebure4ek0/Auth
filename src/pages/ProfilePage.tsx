import { observer } from "mobx-react-lite"
import {ReactElement} from 'react'

const ProfilePage = observer((props:any): ReactElement => {
    return(
        <>
            <img src='./img_person.jpg' alt='person'/>
            <h1>Hello {props.store.firstname}</h1>
            <ul>
                <li>Your login is: {props.store.username}</li>
            </ul>
        </>
    )
})

export default ProfilePage