import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage'
import Register from './pages/RegisterPage/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import HomePage from './pages/HomePage/HomePage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import DonationPage from './pages/DonationPage/DonationPage'
import MainLayout from './components/layout/MainLayout/MainLayout'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import InventoryPage from './pages/InventoryPage/InventoryPage';

import ProtectedRoute from './components/utility/ProtectedRoute';
import AdminRoute from './components/utility/AdminRoute';


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Rutas de Autenticación (no usan el MainLayout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/recuperar-contrasena" element={<ForgotPasswordPage />} />
          <Route path="/restablecer-contrasena" element={<ResetPasswordPage />} />

          {/* 2. Rutas Principales (usan el MainLayout) */}
          <Route 
            path="/" 
            element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>  
            }
          >
              <Route index element={<HomePage />} />
              <Route path="catalogo" element={<CatalogPage />} />
              <Route path="donacion" element={<DonationPage />} />
              <Route path="perfil" element={<ProfilePage />} />

              <Route 
              path="inventario" 
              element={
                <AdminRoute>
                  <InventoryPage />
                </AdminRoute>
              } 
            />
          </Route>
          
          {/* Redirección por defecto si ninguna ruta coincide */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
