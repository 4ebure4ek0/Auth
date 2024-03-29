import React, { type ReactElement } from 'react';
import Error from './Error';
import { Box, Button, TextField } from '@mui/material';

function SignIn(props: any): ReactElement {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        display: 'grid',
        gap: 2,
        paddingTop: 30
      }}>
      <Error error={props.error} />
      <TextField variant="outlined" label='username' type="text" name="username" onChange={(e) => props.onChangeUsername(e.target.value)} />
      <TextField variant="outlined" label='password' type="password" name="password" onChange={(e) => props.onChangePassword(e.target.value)} />
      <TextField variant="outlined" label='firstname' type="text" name="firstname" onChange={(e) => props.onChangeFirstname(e.target.value)} />
      <Button variant='contained' onClick={props.onSubmit}>Sign in</Button>
      <Button variant="text" onClick={props.onChangeLog}>I'm registered</Button>
    </Box>
  );
}

export default SignIn;
