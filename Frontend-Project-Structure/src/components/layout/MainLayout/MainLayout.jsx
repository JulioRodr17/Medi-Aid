import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './MainLayout.css';

// Este componente define la estructura que compartirán todas las páginas principales.
const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        {/* El componente <Outlet /> de react-router-dom renderizará aquí
            la página que corresponda a la ruta (ej. HomePage, CatalogPage, etc.) */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
