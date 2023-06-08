import { AppBar, Container, MenuItem, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar>
          <Link style={{textDecoration:'none'}} to="/profile">
            <MenuItem sx={{color:'#ffffff'}}>Profile</MenuItem>
          </Link>
          <Link style={{textDecoration:'none'}} to="currencies">
          <MenuItem sx={{color:'#ffffff'}}>Currencies</MenuItem>
          </Link>
          <Link style={{textDecoration:'none'}} to="/products">
          <MenuItem sx={{color:'#ffffff'}}>Products</MenuItem>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
