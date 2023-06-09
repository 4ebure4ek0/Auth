import { Avatar, Button, Container, List, ListItemText } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { type MouseEventHandler, type ReactElement } from 'react';
import { Navigate } from 'react-router';

interface IProp {
  isLoggedIn: boolean;
  username: string;
  firstname: string;
  handleLogOut: any;
}
interface IProps {
  store: IProp;
}

const ProfilePage = observer((props: IProps): ReactElement => {
  return (
    <Container sx={{
      paddingTop: 20,
      textAlign: 'center'
    }}>
      {props.store.isLoggedIn ? null : <Navigate to="/" />}
      <Avatar src="./img_person.jpg" alt="person" sx={{width: 300, height: 300}}/>
      <h1>Hello {props.store.firstname}</h1>
      <List>
        <ListItemText>Your login is: {props.store.username}</ListItemText>
      </List>
      <Button variant="contained" onClick={props.store.handleLogOut}>Log out</Button>
    </Container>
  );
});

export default ProfilePage;
