import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Kategori from "./pages/Kategori/Kategori";
import Alat from "./pages/Alat/Alat";
import Pelanggan from "./pages/pelanggan/Pelanggan";
import Penyewaan from "./pages/penyewaan/Penyewaan";
import Laporan from "./pages/laporan/Laporan";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
          }
        />

        {/* Kategori */}
        <Route
          path="/kategori"
          element={
            <ProtectedRoute>
              <Kategori />
            </ProtectedRoute>
          }
        />

        {/* Alat */}
        <Route
          path="/alat"
          element={
            <ProtectedRoute>
              <Alat />
            </ProtectedRoute>
          }
        />

        {/* Pelanggan */}
        <Route
          path="/pelanggan"
          element={
            <ProtectedRoute>
              <Pelanggan />
            </ProtectedRoute>
          }
        />

        {/* Penyewaan */}
        <Route
          path="/penyewaan"
          element={
            <ProtectedRoute>
              <Penyewaan />
            </ProtectedRoute>
          }
        />

        {/* Laporan */}
        <Route
          path="/laporan"
          element={
            <ProtectedRoute>
              <Laporan />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;