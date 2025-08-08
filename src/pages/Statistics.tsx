import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface Statistics {
  totalCount: number;
  monthlyCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export default function Statistics() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/reports/statistics');
        const data = res.data.results?.[0];
        setStats(data);
      } catch (err) {
        alert('통계를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getApprovalRate = () => {
    if (!stats || stats.totalCount === 0) return 0;
    return Math.round((stats.approvedCount / stats.totalCount) * 100);
  };

  const getRejectionRate = () => {
    if (!stats || stats.totalCount === 0) return 0;
    return Math.round((stats.rejectedCount / stats.totalCount) * 100);
  };

  const getPendingCount = () => {
    if (!stats) return 0;
    return stats.totalCount - stats.approvedCount - stats.rejectedCount;
  };

  if (isLoading) {
    return (
      <div className="layout">
        <div className="main-content">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="layout">
        <div className="main-content">
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: '40px' }}>
              <p>통계 데이터를 불러올 수 없습니다.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/main')}
              >
                메인으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      <div className="main-content">
        {/* 페이지 헤더 */}
        <div className="page-header">
          <h1 className="page-title">신고 통계</h1>
          <p className="page-description">전체 신고 현황을 한눈에 확인할 수 있습니다</p>
          <div className="page-actions">
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/main')}
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>

        {/* 주요 통계 */}
        <div className="stats-grid" style={{ marginBottom: '32px' }}>
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

        {/* 세부 통계 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {/* 처리 현황 */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📊 처리 현황</h2>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>대기 중</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '600' }}>{getPendingCount().toLocaleString()}건</span>
                    <span className="status-badge status-pending">
                      {stats.totalCount > 0 ? Math.round((getPendingCount() / stats.totalCount) * 100) : 0}%
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>승인</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '600' }}>{stats.approvedCount.toLocaleString()}건</span>
                    <span className="status-badge status-approved">{getApprovalRate()}%</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>반려</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '600' }}>{stats.rejectedCount.toLocaleString()}건</span>
                    <span className="status-badge status-rejected">{getRejectionRate()}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 월간 통계 */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📅 월간 통계</h2>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>이번 달 신고</span>
                  <span style={{ fontWeight: '600', fontSize: '18px', color: 'var(--warning-orange)' }}>
                    {stats.monthlyCount.toLocaleString()}건
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>전체 대비 비율</span>
                  <span style={{ fontWeight: '600' }}>
                    {stats.totalCount > 0 ? Math.round((stats.monthlyCount / stats.totalCount) * 100) : 0}%
                  </span>
                </div>
                
                <div style={{ 
                  padding: '12px', 
                  background: 'var(--warning-orange-light)', 
                  borderRadius: '8px', 
                  textAlign: 'center' 
                }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    일평균 신고 수
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--warning-orange)' }}>
                    {Math.round(stats.monthlyCount / new Date().getDate())}건/일
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 처리 효율성 */}
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div className="card-header">
              <h2 className="card-title">⚡ 처리 효율성</h2>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success-green)', marginBottom: '8px' }}>
                    {getApprovalRate()}%
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>승인율</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--error-red)', marginBottom: '8px' }}>
                    {getRejectionRate()}%
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>반려율</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary-blue)', marginBottom: '8px' }}>
                    {Math.round(((stats.approvedCount + stats.rejectedCount) / stats.totalCount) * 100)}%
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>처리 완료율</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--warning-orange)', marginBottom: '8px' }}>
                    {getPendingCount()}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>대기 중</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}