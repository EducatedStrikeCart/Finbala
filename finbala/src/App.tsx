import "./App.css";
import { ReactNode } from "react";

function App(props: { children: ReactNode }) {
    return (
        <div className="container-fluid py-5 " data-bs-theme="dark">
            {props.children}
        </div>
    );
}

export default App;
