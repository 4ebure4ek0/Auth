interface IPropStore {
    isLoggedIn: boolean;
}
interface IProps {
    store: IPropStore;
    products: IPropProducts
}
interface IPropProducts {
    loading: boolean;
    products: Array<string>;
    errorMessage: string;
    fetchProducts: () => void
}
const ProductsPage = (props:IProps) => {
    return(
        <div>hello</div>
    )
}

export default ProductsPage