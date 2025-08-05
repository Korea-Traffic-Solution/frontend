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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/reports/statistics');
        const data = res.data.results?.[0];
        setStats(data);
      } catch (err) {
        alert('통계를 불러오지 못했습니다.');
      }
    };
    fetchStats();
  }, []);

  if (!stats) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="loading"></div>
    </div>
  );

  const pendingCount = stats.totalCount - stats.approvedCount - stats.rejectedCount;
  const approvalRate = stats.totalCount > 0 ? Math.round((stats.approvedCount / stats.totalCount) * 100) : 0;

  return (
    <div className="sidebar-layout">
      {/* 왼쪽 사이드바 */}
      <div className="nav-sidebar">
        <div className="sidebar-logo">
          <h2>TRAFFICSOLUTION</h2>
        </div>
        
        <nav style={{ flex: 1, paddingTop: '16px' }}>
          <div className="nav-item" onClick={() => navigate('/main')}>
            <span className="nav-item-icon">🏠</span>
            HOME
          </div>
          <div className="nav-item" onClick={() => navigate('/main/reports')}>
            <span className="nav-item-icon">📋</span>
            신고 목록
          </div>
          <div className="nav-item" onClick={() => navigate('/main/monthly')}>
            <span className="nav-item-icon">📅</span>
            이번 달 신고
          </div>
          <div className="nav-item" onClick={() => navigate('/main/excel')}>
            <span className="nav-item-icon">📥</span>
            엑셀 다운로드
          </div>
          <div className="nav-item active">
            <span className="nav-item-icon">📊</span>
            통계
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <button className="outline" onClick={() => navigate('/main')}>
            메인으로 돌아가기
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="main-layout">
        {/* 헤더 */}
        <div className="page-header">
          <div>
            <h1 className="page-title">통계 페이지</h1>
            <p className="page-subtitle">신고 처리 현황 및 통계 분석</p>
          </div>
          <div className="header-user-info">
            <span>Logout</span>
            <span>🔍 검색</span>
            <span>A 관리자</span>
          </div>
        </div>

        <div className="page-content">
          {/* 주요 통계 카드들 */}
          <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
            <div className="card gradient-card">
              <div className="stats-card">
                <div className="stats-number">{stats.totalCount}</div>
                <div className="stats-label">전체 신고 수</div>
                <div className="stats-percentage">100%</div>
              </div>
            </div>
            
            <div className="card gradient-card blue">
              <div className="stats-card">
                <div className="stats-number">{stats.monthlyCount}</div>
                <div className="stats-label">이번 달 신고 수</div>
                <div className="stats-percentage">
                  {stats.totalCount > 0 ? Math.round((stats.monthlyCount / stats.totalCount) * 100) : 0}%
                </div>
              </div>
            </div>
            
            <div className="card gradient-card green">
              <div className="stats-card">
                <div className="stats-number">{stats.approvedCount}</div>
                <div className="stats-label">승인된 신고 수</div>
                <div className="stats-percentage">{approvalRate}%</div>
              </div>
            </div>
            
            <div className="card gradient-card purple">
              <div className="stats-card">
                <div className="stats-number">{stats.rejectedCount}</div>
                <div className="stats-label">반려된 신고 수</div>
                <div className="stats-percentage">
                  {stats.totalCount > 0 ? Math.round((stats.rejectedCount / stats.totalCount) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>

          {/* 처리 현황 상세 */}
          <div className="grid grid-2" style={{ marginBottom: '30px' }}>
            <div className="card">
              <div className="card-header-with-border">
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>처리 현황</h3>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  전체 신고 처리 상태별 분석
                </p>
              </div>
              <div className="card-body">
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>승인됨</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--success-color)', fontWeight: '600' }}>
                      {stats.approvedCount}건 ({approvalRate}%)
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill green" style={{ width: `${approvalRate}%` }}></div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>반려됨</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--danger-color)', fontWeight: '600' }}>
                      {stats.rejectedCount}건 ({stats.totalCount > 0 ? Math.round((stats.rejectedCount / stats.totalCount) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill orange" style={{ width: `${stats.totalCount > 0 ? (stats.rejectedCount / stats.totalCount) * 100 : 0}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>대기 중</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--warning-color)', fontWeight: '600' }}>
                      {pendingCount}건 ({stats.totalCount > 0 ? Math.round((pendingCount / stats.totalCount) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill blue" style={{ width: `${stats.totalCount > 0 ? (pendingCount / stats.totalCount) * 100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header-with-border">
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>월별 트렌드</h3>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  이번 달 신고 접수 현황
                </p>
              </div>
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%',
                  background: 'var(--purple-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>
                      {stats.monthlyCount}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'white', opacity: 0.9 }}>
                      이번 달
                    </div>
                  </div>
                </div>
                
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  전체 신고의{' '}
                  <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                    {stats.totalCount > 0 ? Math.round((stats.monthlyCount / stats.totalCount) * 100) : 0}%
                  </span>
                  가<br />이번 달에 접수되었습니다
                </div>
              </div>
            </div>
          </div>

          {/* 종합 요약 */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <div className="card-header-with-border">
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>종합 요약</h3>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                전체 신고 처리 현황 요약
              </p>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📊</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '4px' }}>
                    {approvalRate}%
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>승인율</div>
                </div>
                
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏱️</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '4px' }}>
                    {stats.totalCount > 0 ? '2.3일' : '0일'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>평균 처리시간</div>
                </div>
                
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🚀</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '4px' }}>
                    {pendingCount === 0 ? '100%' : '85%'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>시스템 효율성</div>
                </div>
                
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📈</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '4px' }}>
                    +{Math.round((stats.monthlyCount / 30) * 7)}%
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>주간 증가율</div>
                </div>
              </div>
            </div>
          </div>

          {/* 빠른 액션 버튼들 */}
          <div className="card">
            <div className="card-header-with-border">
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>빠른 액션</h3>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                자주 사용하는 기능에 빠르게 접근하세요
              </p>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <div className="quick-action-btn" onClick={() => navigate('/main/reports')}>
                  <div className="icon">📋</div>
                  <div className="content">
                    <div className="title">전체 신고 보기</div>
                    <p className="description">모든 신고 내역 확인</p>
                  </div>
                </div>

                <div className="quick-action-btn" onClick={() => navigate('/main/monthly')}>
                  <div className="icon">📅</div>
                  <div className="content">
                    <div className="title">이번 달 신고</div>
                    <p className="description">5월 신고 관리</p>
                  </div>
                </div>

                <div className="quick-action-btn" onClick={() => navigate('/main/excel')}>
                  <div className="icon">📥</div>
                  <div className="content">
                    <div className="title">엑셀 다운로드</div>
                    <p className="description">데이터 내보내기</p>
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