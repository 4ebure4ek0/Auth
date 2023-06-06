import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link className="menu_bar" to="/profile">
                Profile
            </Link>
            <Link className="menu_bar" to="currencies">
                Currencies
            </Link>
            <Link className="menu_bar" to="/products">
                Products
            </Link>
        </header>
    )
}