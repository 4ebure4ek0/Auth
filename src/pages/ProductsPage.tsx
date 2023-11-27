import { observer } from 'mobx-react';
import { Navigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
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
  addStatus: boolean;
  loading: boolean;
  products: string[];
  errorMessage: string;
  search: string;
  pageNum: number;
  total: number;
  pageQuantity: number;
  setAddStatus: (status:boolean) => void;
  fetchProducts: () => void;
  addProduct: (product: Array<string> | 
    {}) => void | number;
  handleChangeSearch: (search: string) => void;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeQuantity: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const ProductsPage: React.FC<IProps> = observer((props) => {
  let [newProduct, setNewProduct] = useState({})
  let [openModal, setOpenModal] = useState(false)

  const addNewProduct = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct({...newProduct, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    props.products.fetchProducts();
  }, [props.products.pageNum, props.products.pageQuantity]);

  useEffect(() => {
    props.products.setAddStatus(false)
    setOpenModal(false)
  }, [props.products.addStatus])

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
        <Grid container spacing={1} justifyContent="space-between" alignItems="center" sx={{
          paddingTop: 2,
          paddingBottom: 2
        }}>
          <Grid item xs={10}>
            <TextField label="Search..." variant="filled" onChange={(e) => props.products.handleChangeSearch(e.target.value)} sx={{
              width: '100%',
              height: 60,
            }} />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => setOpenModal(!openModal)} variant="outlined" sx={{
              width: "100%",
              height: 60
            }}>
              Add product
            </Button>
          </Grid>
        </Grid>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(!openModal)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{
            bgcolor: '#fff',
            width: 400,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}>
            <TextField id="standard-basic" label="Title" name='title' variant="standard" sx={{width: '100%'}} onChange={(e) => addNewProduct(e)}/>
            <TextField id="standard-basic" label="Description" name='Description' variant="standard" sx={{width: '100%'}} onChange={(e) => addNewProduct(e)}/>
            <TextField id="standard-basic" label="Price" type='number' name='Price' variant="standard" sx={{width: '100%'}} onChange={(e) => addNewProduct(e)}/>
            <TextField id="standard-basic" label="Rating" type='number' name='Rating' variant="standard" sx={{width: '100%'}} onChange={(e) => addNewProduct(e)}/>
            <TextField id="standard-basic" label="Stock" type='number' name='Stock' variant="standard" sx={{width: '100%'}} onChange={(e) => addNewProduct(e)}/>
            <TextField id="standard-basic" label="Brand" name='Brand' variant="standard" sx={{width: '100%'}} onChange={(e) => addNewProduct(e)}/>
            <TextField id="standard-basic" label="Category" name='Category' variant="standard" sx={{width: '100%'}} onChange={(e) => addNewProduct(e)}/>
            <TextField id="standard-basic" label="Thumbnail" type='file' name='Thumbnail' variant="standard" sx={{width: '100%'}} onChange={(e) => addNewProduct(e)}/>
            <TextField id="standard-basic" label="images" type='file' name='images' variant="standard" sx={{width: '100%'}} onChange={(e) => addNewProduct(e)}/>
            <Button variant="contained" sx={{width: '100%'}} onClick={() => props.products.addProduct(newProduct)}>Send</Button>
          </Box>
        </Modal>
        <TableContainer component={Paper} sx={{ minWidth: 1050 }}>
          {props.products.errorMessage.length ? null : <Error error={props.products.errorMessage} />}
          {/* {props.store.isLoggedIn ? null : <Navigate to="/" />} */}
          <Table sx={{ minWidth: 1050 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Thumbnail</h3>
                </TableCell>
                <TableCell>
                  <h3>Title</h3>
                </TableCell>
                <TableCell>
                  <h3>Price</h3>
                </TableCell>
                <TableCell>
                  <h3>Brand</h3>
                </TableCell>
                <TableCell>
                  <h3>Category</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.products.products.map((product: any, n: number) => {
                return (
                  <Product product={product} />
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={props.products.total}
                  page={props.products.pageNum}
                  rowsPerPage={props.products.pageQuantity}
                  onPageChange={props.products.handleChangePage}
                  onRowsPerPageChange={props.products.handleChangeQuantity}
                ></TablePagination>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>
    );
  }
});

export default ProductsPage;
