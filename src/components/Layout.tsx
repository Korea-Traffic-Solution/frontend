import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function Layout({ children, title, subtitle }: LayoutProps) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* 왼쪽 사이드바 - app.css의 .nav-sidebar 규칙 사용 */}
      <aside className="nav-sidebar">
        <div className="sidebar-logo">
          <h2>TRAFFICSOLUTION</h2>
        </div>

        <button className="nav-item" onClick={() => navigate('/main')}>🏠 홈</button>
        <button className="nav-item" onClick={() => navigate('/main/reports')}>📋 신고내역</button>
        <button className="nav-item" onClick={() => navigate('/main/monthly')}>📅 월별내역</button>
        <button className="nav-item" onClick={() => navigate('/main/excel')}>📥 엑셀다운로드</button>
        <button className="nav-item" onClick={() => navigate('/main/statistics')}>📊 통계</button>

        <div className="sidebar-footer">
          <button className="primary" onClick={logout}>로그아웃</button>
        </div>
      </aside>

      {/* 본문 영역 - app.css의 .main-layout, .page-header-content 등 사용 */}
      <div className="main-layout">
        <header className="page-header">
          <div className="page-header-content">
            <div>
              {title && <h1 className="page-title">{title}</h1>}
              {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
            <div className="header-user-info">
              <span>관리자</span>
            </div>
          </div>
        </header>

        <main className="page-content">
          <div className="page-content-inner">{children}</div>
        </main>
      </div>
    </>
  );
}