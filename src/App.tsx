// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import ReportList from './pages/ReportList';
import ReportDetail from './pages/ReportDetail';
import ExcelDownload from './pages/ExcelDownload';
import MonthlyPage from './pages/MonthlyReports';
import Statistics from './pages/Statistics';
import ChatbotPage from './pages/ChatbotPage';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* ✅ /signup 경로 등록 */}

        {/* 보호된 라우트 */}
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
        <Route
          path="/main/chatbot"
          element={
            <ProtectedRoute>
              <ChatbotPage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;