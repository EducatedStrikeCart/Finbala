import "./App.css";
import { MainWindow } from "./components/layout/MainWindow/MainWindow";
import { Footer } from "./components/layout/Footer/Footer";
import { NavBar } from "./components/layout/NavBar/NavBar";

function App() {
    return (
        <>
                <NavBar />
                <MainWindow />
                <Footer />
        </>
    );
}

export default App;
