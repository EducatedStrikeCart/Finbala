import { Link } from "react-router"
import "./Footer.css"

const Footer = () => {
    return (
        <div id="footer" className="d-flex flex-column py-3" aria-label="Footer">
             <Link to={"/"}>Home</Link>
            <Link to={"/About"}>About</Link>
            <Link to={"/Contact"}>Contact</Link>
            <Link to={"/Donate"}>Donate</Link>

        </div>
    )
}

export {Footer}