import { Box, Button, TextField } from '@mui/material';
import Error from './Error';
import { type ReactElement } from 'react';

function LogIn(props: any): ReactElement {
  return (
    <Box sx={{
      width: 300,
      height: 300,
      display: 'grid',
      gap: 2,
      paddingTop: 30
    }}>
      <Error error={props.error} />
      <TextField label='username' variant="outlined" type="text" name="username" onChange={(e) => props.onChangeUsername(e.target.value)} />
      <TextField label='password' variant="outlined" type="password" name="password" onChange={(e) => props.onChangePassword(e.target.value)}/>
      <Button variant='contained' onClick={props.onSubmit}>Log in</Button>
      <Button variant="text" onClick={props.onChangeLog}>I'm not registered</Button>
    </Box>
  );
}

export default LogIn;
