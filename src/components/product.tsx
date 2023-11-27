import { TableCell, TableRow } from "@mui/material";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";

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
  images: string[];
}
interface IProps {
  product: IProduct;
}

export default function Product(props: IProps) {
  return (
    <>
      <TableRow key={props.product.id} sx={{ cursor: "pointer" }}>
        <Link to={`./${props.product.id}`}>
          <TableCell>
            <img
              style={{ width: "300px" }}
              src={props.product.thumbnail}
              alt={props.product.title}
            />
          </TableCell>
          <TableCell>{props.product.title}</TableCell>
          <TableCell>{props.product.price}</TableCell>
          <TableCell>{props.product.brand}</TableCell>
          <TableCell>{props.product.category}</TableCell>
        </Link>
      </TableRow>
    </>
  );
}
