import { TableCell, TableRow } from "@mui/material";
// import ImgsViewer from "react-images-viewer"

interface IProduct{
    id: string;
    title: string;
    description: string;
    price: string;
    rating: string;
    stock: string;
    brand: string;
    category: string;
    thumbnail: string;
}
interface IProps{
    product: IProduct;
}

export default function Product(props:IProps) {
    return (
        <>
            <TableRow key={props.product.id}>
                <TableCell>{props.product.title}</TableCell>
                <TableCell>{props.product.description}</TableCell>
                <TableCell>{props.product.price}</TableCell>
                <TableCell>{props.product.rating}</TableCell>
                <TableCell>{props.product.stock}</TableCell>
                <TableCell>{props.product.brand}</TableCell>
                <TableCell>{props.product.category}</TableCell>
                {/* <TableCell>{product.images}</TableCell> */}
                <img src={props.product.thumbnail} alt={props.product.title} />
            </TableRow>
        </>
    )
}