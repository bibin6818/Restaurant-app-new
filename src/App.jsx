import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import CardView from "./pages/CardView";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CardView />} path="/:id/view" />
        <Route element={<Navigate to={"/"} />} path="/*" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;