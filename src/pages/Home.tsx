import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

interface DashboardStats {
  totalCount: number;
  monthlyCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/reports/statistics');
        const data = res.data.results?.[0];
        setStats(data);
      } catch (err) {
        console.error('통계 로딩 실패:', err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="layout">
      <div className="main-content">
        {/* 페이지 헤더 */}
        <div className="page-header">
          <h1 className="page-title">관리자 대시보드</h1>
          <p className="page-description">킥보드 신고 관리 시스템에 오신 것을 환영합니다</p>
          <div className="page-actions">
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--primary-blue)' }}>
                {stats.totalCount.toLocaleString()}
              </div>
              <div className="stat-label">전체 신고</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--warning-orange)' }}>
                {stats.monthlyCount.toLocaleString()}
              </div>
              <div className="stat-label">이번 달 신고</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--success-green)' }}>
                {stats.approvedCount.toLocaleString()}
              </div>
              <div className="stat-label">승인된 신고</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--error-red)' }}>
                {stats.rejectedCount.toLocaleString()}
              </div>
              <div className="stat-label">반려된 신고</div>
            </div>
          </div>
        )}

        {/* 대시보드 메뉴 */}
        <div className="dashboard-grid">
          <div 
            className="dashboard-card"
            onClick={() => navigate('/main/reports')}
          >
            <div className="dashboard-card-icon icon-blue">
              📋
            </div>
            <h3 className="dashboard-card-title">신고 목록</h3>
            <p className="dashboard-card-description">
              모든 신고를 확인하고 승인/반려 처리할 수 있습니다
            </p>
          </div>

          <div 
            className="dashboard-card"
            onClick={() => navigate('/main/monthly')}
          >
            <div className="dashboard-card-icon icon-orange">
              📅
            </div>
            <h3 className="dashboard-card-title">이번 달 신고</h3>
            <p className="dashboard-card-description">
              이번 달에 접수된 신고만 별도로 확인할 수 있습니다
            </p>
          </div>

          <div 
            className="dashboard-card"
            onClick={() => navigate('/main/statistics')}
          >
            <div className="dashboard-card-icon icon-green">
              📊
            </div>
            <h3 className="dashboard-card-title">통계</h3>
            <p className="dashboard-card-description">
              신고 현황을 통계로 한눈에 확인할 수 있습니다
            </p>
          </div>

          <div 
            className="dashboard-card"
            onClick={() => navigate('/main/excel')}
          >
            <div className="dashboard-card-icon icon-red">
              📄
            </div>
            <h3 className="dashboard-card-title">엑셀 다운로드</h3>
            <p className="dashboard-card-description">
              승인된 신고 데이터를 엑셀 파일로 다운로드합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}