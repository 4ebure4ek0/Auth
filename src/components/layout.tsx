import { Outlet } from 'react-router';
import Header from './header';
import { Box, Container } from '@mui/material';

export default function Layout() {
  return (
    <>
      <Header />
      <Container maxWidth='md' sx={{
        display: 'grid',
        justifyContent: 'center'
      }}>
          <Outlet />
      </Container></>
  );
}
