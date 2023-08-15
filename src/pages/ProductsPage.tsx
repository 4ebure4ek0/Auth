import { observer } from 'mobx-react';
import { Navigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import Error from '../components/Error';
import Product from '../components/product';

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
  pageNum: number;
  fetchProducts: () => void;
  handleChangeSearch: (search:string) => void;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}
const ProductsPage:React.FC<IProps> = observer((props) => {
  useEffect(() => {
    props.products.fetchProducts();
  }, [props.products.pageNum]);

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
          {props.products.errorMessage.length ? null : <Error error={props.products.errorMessage} />}
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
                  <Product product={product} />
                );
              })}
            </TableBody>
          </Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={100}
                page={props.products.pageNum}
                rowsPerPage={props.products.products.length}
                onPageChange={props.products.handleChangePage}
              ></TablePagination>
            </TableRow>
          </TableFooter>
        </TableContainer>
      </>
    );
  }
});

export default ProductsPage;
