import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100 app-bg">
      <Header />
      
      <main className="flex-grow-1">
        <Outlet />
      </main>
      
      <Footer />
      
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        theme="colored"
      />
    </div>
  );
}