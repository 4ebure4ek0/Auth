import { Alert } from '@mui/material';
import { type ReactElement } from 'react';

function Error(props: any): ReactElement | null{
  if(props.error == ''){
    return null
  } else{
    return <Alert severity="error">{props.error}</Alert>;
  }
}

export default Error;
