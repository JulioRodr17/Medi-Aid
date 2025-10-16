import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage'
import Register from './pages/RegisterPage/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'

import HomePage from './pages/HomePage/HomePage'
import MainLayout from './components/layout/MainLayout/MainLayout'

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
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            {/* Aquí añadiremos las rutas de /catalogo, /donacion, etc. en el futuro */}
            {/* <Route path="catalogo" element={<CatalogPage />} /> */}
            {/* <Route path="donacion" element={<DonationPage />} /> */}
            {/* <Route path="perfil" element={<ProfilePage />} /> */}
          </Route>
          
          {/* Redirección por defecto si ninguna ruta coincide */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
