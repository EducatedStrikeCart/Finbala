import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { TransactionWindow } from "./components/TransactionWindow/TransactionWindow.tsx";
import { NavBar } from "./components/layout/NavBar/NavBar.tsx";
import { Footer } from "./components/layout/Footer/Footer.tsx";
import { MainWindow } from "./components/layout/MainWindow/MainWindow.tsx";
import { AboutPage } from "./components/AboutPage/AboutPage.tsx";
import { DonatePage } from "./components/DonatePage/DonatePage.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <NavBar />
            <App>
                <Routes>
                    <Route path="/" element={<MainWindow />} />
                    <Route
                        path="/transactions"
                        element={<TransactionWindow />}
                    />
                    <Route path="/About" element={<AboutPage />}></Route>
                    <Route path="/Donate" element={<DonatePage />}></Route>
                </Routes>
            </App>
            <Footer />
        </BrowserRouter>
    </StrictMode>
);
