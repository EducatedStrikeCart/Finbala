import { Link } from "react-router";
import "./NavBar.css";

const NavBar = () => {
    return (
        <div
            id="navbar"
            className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
            aria-label="Nav bar"
            data-bs-theme="dark"
        >
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    Home
                </Link>
                <Link className="nav-item" to={"/"}>
                    test
                </Link>
                <Link className="nav-item" to={"/transactions"}>
                    Transactions
                </Link>
                <Link className="nav-item" to={"/"}>
                    Login
                </Link>
            </div>
        </div>
    );
};

export { NavBar };
