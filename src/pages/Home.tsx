import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* 왼쪽 사이드바 */}
      <div className="nav-sidebar">
        {/* 로고 */}
        <div className="sidebar-logo">
          <h2>TRAFFICSOLUTION</h2>
        </div>
        
        {/* 네비게이션 */}
        <nav style={{ flex: 1, paddingTop: '16px' }}>
          <div className="nav-item active">
            <span className="nav-item-icon">🏠</span>
            HOME
          </div>
          
          <div
            className="nav-item"
            onClick={() => navigate('/main/reports')}
          >
            <span className="nav-item-icon">📋</span>
            신고 목록
          </div>
          
          <div
            className="nav-item"
            onClick={() => navigate('/main/monthly')}
          >
            <span className="nav-item-icon">📅</span>
            이번 달 신고
          </div>
          
          <div
            className="nav-item"
            onClick={() => navigate('/main/excel')}
          >
            <span className="nav-item-icon">📥</span>
            엑셀 다운로드
          </div>
          
          <div
            className="nav-item"
            onClick={() => navigate('/main/statistics')}
          >
            <span className="nav-item-icon">📊</span>
            통계
          </div>
        </nav>
        
        {/* 로그아웃 버튼 */}
        <div className="sidebar-footer">
          <button 
            className="outline"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="main-layout">
        {/* 헤더 */}
        <div className="page-header">
          <div className="page-header-content">
            <div>
              <h1 className="page-title">관리자 대시보드</h1>
              <p className="page-subtitle">TRAFFIC SOLUTION 통합 관리 시스템</p>
            </div>
            <div className="header-user-info">
              <span>Logout</span>
              <span>🔍 검색</span>
              <span>A 관리자</span>
            </div>
          </div>
        </div>

        {/* 대시보드 컨텐츠 */}
        <div className="page-content">
          <div className="page-content-inner">
            <div className="dashboard-grid">
          {/* 기존 버튼들을 카드로 변경 - 기능은 그대로 */}
          <div className="dashboard-grid">
            {/* 신고 목록 버튼 -> 카드 */}
            <div 
              className="dashboard-card"
              onClick={() => navigate('/main/reports')}
            >
              <div className="card-header">
                <div>
                  <h3 className="card-title">신고 목록</h3>
                  <p className="card-subtitle">전체 신고 내역을 확인하고 관리하세요</p>
                </div>
                <span className="card-icon">📋</span>
              </div>
            </div>

            {/* 이번 달 신고 버튼 -> 카드 */}
            <div 
              className="dashboard-card blue"
              onClick={() => navigate('/main/monthly')}
            >
              <div className="card-header">
                <div>
                  <h3 className="card-title">이번 달 신고</h3>
                  <p className="card-subtitle">이번 달 접수된 신고를 확인하세요</p>
                </div>
                <span className="card-icon">📅</span>
              </div>
            </div>

            {/* 엑셀 다운로드 버튼 -> 카드 */}
            <div 
              className="dashboard-card green"
              onClick={() => navigate('/main/excel')}
            >
              <div className="card-header">
                <div>
                  <h3 className="card-title">엑셀 다운로드</h3>
                  <p className="card-subtitle">승인된 신고 데이터를 다운로드하세요</p>
                </div>
                <span className="card-icon">📥</span>
              </div>
            </div>

            {/* 통계 버튼 -> 카드 */}
            <div 
              className="dashboard-card purple"
              onClick={() => navigate('/main/statistics')}
            >
              <div className="card-header">
                <div>
                  <h3 className="card-title">통계</h3>
                  <p className="card-subtitle">신고 현황과 통계를 확인하세요</p>
                </div>
                <span className="card-icon">📊</span>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}