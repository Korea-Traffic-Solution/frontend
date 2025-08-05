import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';
import Notice from '../components/Notice';

export default function MonthlyReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonthlyReports = async () => {
      try {
        const res = await axios.get('/reports/monthly?page=0&size=10');
        const data = res.data.results;
        if (Array.isArray(data)) {
          setReports(data);
        }
      } catch (err) {
        alert('이번 달 신고 목록을 불러오지 못했습니다.');
      }
    };
    fetchMonthlyReports();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
          
          <div className="nav-item active">
            <span className="nav-item-icon">📅</span>
            이번 달 신고
          </div>
          
          <div className="nav-item" onClick={() => navigate('/main/excel')}>
            <span className="nav-item-icon">📥</span>
            엑셀 다운로드
          </div>
          
          <div className="nav-item" onClick={() => navigate('/main/statistics')}>
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
        <div className="page-header">
          <div>
            <h1 className="page-title">이번 달 신고 현황</h1>
            <p className="page-subtitle">2025.05.08</p>
          </div>
          <div className="header-user-info">
            <span>Logout</span>
            <span>🔍 검색</span>
            <span>A 관리자</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', padding: '32px', flex: 1 }}>
          <div style={{ flex: 1 }}>
            {/* 이번 달 통계 카드 */}
            <div className="card gradient-card" style={{ marginBottom: '32px' }}>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0, marginBottom: '8px', color: 'white' }}>5월 신고 현황</h3>
                    <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>이번 달 접수된 신고를 확인하세요</p>
                  </div>
                  <span style={{ fontSize: '32px' }}>📅</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px', color: 'white' }}>{reports.length}</div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>전체 신고</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px', color: 'white' }}>
                      {reports.filter(r => r.status === 'APPROVED').length}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>승인 완료</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px', color: 'white' }}>
                      {reports.filter(r => r.status === 'PENDING').length}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>대기 중</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px', color: 'white' }}>
                      {reports.length > 0 ? Math.round((reports.filter(r => r.status === 'APPROVED').length / reports.length) * 100) : 0}%
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>처리율</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 이번 달 신고 목록 */}
            <div className="card">
              <div className="card-header-with-border">
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>이번 달 신고 목록</h3>
                <p style={{ color: '#666', fontSize: '14px', margin: '4px 0 0 0' }}>
                  5월에 접수된 총 {reports.length}건의 신고
                </p>
              </div>
              
              <div className="card-body">
                {reports.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
                    <p>이번 달에는 아직 신고가 없습니다.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className="report-list-item"
                        onClick={() => navigate(`/main/reports/${report.id}`)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0, marginBottom: '8px' }}>
                              {report.title}
                            </h4>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                              <span>신고자: {report.reporterName}</span>
                              <span>피신고자: {report.targetName}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#999' }}>
                              <span>브랜드: {report.detectedBrand || '미확인'}</span>
                              <span>신고시각: {new Date(report.reportedAt).toLocaleDateString('ko-KR')}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span className={`status-badge status-${report.status.toLowerCase()}`}>
                              {report.status === 'PENDING' && '대기중'}
                              {report.status === 'APPROVED' && '승인됨'}
                              {report.status === 'REJECTED' && '반려됨'}
                            </span>
                          </div>
                        </div>
                        
                        {report.location && (
                          <div style={{ fontSize: '14px', color: '#666', borderTop: '1px solid #f0f0f0', paddingTop: '8px' }}>
                            📍 {report.location}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ width: '300px' }}>
            <Notice />
          </div>
        </div>
      </div>
    </div>
  );
}