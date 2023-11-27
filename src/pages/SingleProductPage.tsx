import { Box, CircularProgress, Container, Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import Error from "../components/Error";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import { observer } from "mobx-react";
import productStore from "../stores/productStore";

const SingleProductPage = observer(() => {
    let {id}: any = useParams()
    const [curImg, setCurImg] = useState(0)
    const [isViewerOpen, setIsViewerOpen] = useState(false)

    const toggleViewer = (index?: number) => {
        if (!!index) {
            setCurImg(index)
        }
        setIsViewerOpen((prev) => !prev)
    }

    useEffect(() => {
        productStore.fetchProduct(id)
    }, [])

    if (productStore.loading) {
      return (
        <Box sx={{
          height: 700,
          display: 'flex',
          alignItems: 'center'
        }}>
          <CircularProgress />
        </Box>
      );
    } else if(!!productStore.product){
      return(
        <Box>
          <Grid container spacing={2}>
          {productStore.errorMessage.length ? null : <Error error={productStore.errorMessage} />}
          <Grid item xs={7}>
            <img src={productStore.product.thumbnail} alt={productStore.product.title} onClick={() => toggleViewer(curImg)}/>
          </Grid>
          <Grid item xs={2}>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
              <TableRow>
                <TableCell>Title:</TableCell>
                <TableCell>{productStore.product.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description:</TableCell>
                <TableCell>{productStore.product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Category:</TableCell>
                <TableCell>{productStore.product.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand:</TableCell>
                <TableCell>{productStore.product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price:</TableCell>
                <TableCell>{productStore.product.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rating:</TableCell>
                <TableCell>{productStore.product.rating}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock:</TableCell>
                <TableCell>{productStore.product.stock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </Grid>
        </Grid>
        {isViewerOpen &&
            <ReactSimpleImageViewer src={productStore.product.images} currentIndex={curImg} onClose={toggleViewer} closeOnClickOutside={true} />
        }
        </Box>
        )
    } else{
      return null
    }
})

export default SingleProductPage