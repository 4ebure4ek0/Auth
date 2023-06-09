import { observer } from 'mobx-react';
import { Navigate } from 'react-router';
import { useEffect } from 'react';
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import Error from '../components/Error';

interface IPropStore {
  isLoggedIn: boolean;
}
interface IProps {
  store: IPropStore;
  products: IPropProducts;
}
interface IPropProducts {
  loading: boolean;
  products: string[];
  errorMessage: string;
  search: string;
  fetchProducts: () => void;
  handleChangeSearch: (search:string) => void;
}
const ProductsPage = observer((props: IProps) => {
  useEffect(() => {
    props.products.fetchProducts();
  }, []);
  if (props.products.loading) {
    return (
      <Box sx={{
        height: 700,
        display: 'flex',
        alignItems: 'center'
      }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <>
        <TextField label="Search..." variant="filled" onChange={(e) => props.products.handleChangeSearch(e.target.value)} sx={{
          marginTop: 5,
          marginBottom: 5,
          width: 1500
        }} />
        <TableContainer component={Paper} sx={{
          width: 1500
        }}>
          {props.products.errorMessage == '' ? null : <Error error={props.products.errorMessage} />}
          {props.store.isLoggedIn ? null : <Navigate to="/" />}
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Title</h3>
                </TableCell>
                <TableCell>
                  <h3>Description</h3>
                </TableCell>
                <TableCell>
                  <h3>Price</h3>
                </TableCell>
                <TableCell>
                  <h3>Rating</h3>
                </TableCell>
                <TableCell>
                  <h3>Stock</h3>
                </TableCell>
                <TableCell>
                  <h3>Brand</h3>
                </TableCell>
                <TableCell>
                  <h3>Category</h3>
                </TableCell>
                <TableCell>
                  <h3>Thumbnail</h3>
                </TableCell>
                <TableCell>
                  <h3>Images</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.products.products.map((product: any) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.thumbnail}</TableCell>
                    <TableCell>{product.images}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TableFooter>
            <TableRow>
              <TablePagination></TablePagination>
            </TableRow>
          </TableFooter>
        </TableContainer>
      </>
    );
  }
});

export default ProductsPage;
