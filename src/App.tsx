import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import ReportList from './pages/ReportList';
import ReportDetail from './pages/ReportDetail';
import ExcelDownload from './pages/ExcelDownload';
import MonthlyPage from './pages/MonthlyReports';
import Statistics from './pages/Statistics';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main/reports"
            element={
              <ProtectedRoute>
                <ReportList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main/reports/:id"
            element={
              <ProtectedRoute>
                <ReportDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main/excel"
            element={
              <ProtectedRoute>
                <ExcelDownload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main/monthly"
            element={
              <ProtectedRoute>
                <MonthlyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main/statistics"
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;