import { TableCell, TableRow } from "@mui/material";
import { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer"

interface IProduct {
    id: string;
    title: string;
    description: string;
    price: string;
    rating: string;
    stock: string;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[]
}
interface IProps {
    product: IProduct;
}

export default function Product(props: IProps) {
    const [curImg, setCurImg] = useState(0)
    const [isViewerOpen, setIsViewerOpen] = useState(false)

    const toggleViewer = (index?: number) => {
        if (!!index) {
            setCurImg(index)
        }
        setIsViewerOpen((prev) => !prev)
    }

    return (
        <>
            <TableRow key={props.product.id}>
                <TableCell>
                    <img style={{ width: '300px', cursor: 'pointer' }} src={props.product.thumbnail} alt={props.product.title} onClick={() => toggleViewer()} />
                </TableCell>
                <TableCell>{props.product.title}</TableCell>
                <TableCell>{props.product.description}</TableCell>
                <TableCell>{props.product.price}</TableCell>
                <TableCell>{props.product.rating}</TableCell>
                <TableCell>{props.product.stock}</TableCell>
                <TableCell>{props.product.brand}</TableCell>
                <TableCell>{props.product.category}</TableCell>
            </TableRow>
            {isViewerOpen &&
                <ImageViewer src={props.product.images} currentIndex={curImg} onClose={toggleViewer} closeOnClickOutside={true} />
            }
        </>
    )
}