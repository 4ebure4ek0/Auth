import { Box, CircularProgress, Container, Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import Error from "../components/Error";
import ReactSimpleImageViewer from "react-simple-image-viewer";

// interface IProduct {
//   title: string;
//   thumbnail: string;
//   description: string;
//   id
// }

interface IPropProduct {
    loading: boolean;
    product: Array<string> | {} | any;
    errorMessage: string;
    fetchProduct: (id:string) => void;
  }

interface IProps {
    product: IPropProduct;
  }

const SingleProductPage = (props:IProps) => {
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
        props.product.fetchProduct(id);
        console.log(props.product.loading)
    }, [])

    if (props.product.loading) {
      return (
        <Box sx={{
          height: 700,
          display: 'flex',
          alignItems: 'center'
        }}>
          <CircularProgress />
        </Box>
      );
    } else{
      return(
        <Box>
          <Grid container spacing={2}>
          {props.product.errorMessage.length ? null : <Error error={props.product.errorMessage} />}
          <Grid item xs={7}>
            <img src={props.product.product.thumbnail} alt={props.product.product.title} onClick={() => toggleViewer(curImg)}/>
          </Grid>
          <Grid item xs={2}>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
              <TableRow>
                <TableCell>Title:</TableCell>
                <TableCell>{props.product.product.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description:</TableCell>
                <TableCell>{props.product.product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Category:</TableCell>
                <TableCell>{props.product.product.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand:</TableCell>
                <TableCell>{props.product.product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price:</TableCell>
                <TableCell>{props.product.product.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rating:</TableCell>
                <TableCell>{props.product.product.rating}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock:</TableCell>
                <TableCell>{props.product.product.stock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </Grid>
        </Grid>
        {isViewerOpen &&
            <ReactSimpleImageViewer src={props.product.product.images} currentIndex={curImg} onClose={toggleViewer} closeOnClickOutside={true} />
        }
        </Box>
        )
    }
}

export default SingleProductPage