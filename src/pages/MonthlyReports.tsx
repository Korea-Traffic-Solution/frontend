import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';
import Notice from '../components/Notice';

export default function MonthlyReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 1월 = 0이므로 +1
  const date = today.getDate();
  const formattedDate = `${year}.${String(month).padStart(2, '0')}.${String(date).padStart(2, '0')}`;
  const formattedMonth = `${month}월`;

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

      <div className="main-layout">
        <div className="page-header">
          <div className="page-header-content">
            <div>
              <h1 className="page-title">이번 달 신고 현황</h1>
              <p className="page-subtitle">{formattedDate}</p>
            </div>
            <div className="header-user-info">
              <span>Logout</span>
              <span>🔍 검색</span>
              <span>A 관리자</span>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className="content-with-sidebar">
            <div className="content-main">
              <div className="card gradient-card" style={{ marginBottom: '32px' }}>
                <div className="monthly-stats-card">
                  <div className="monthly-header">
                    <div>
                      <h3 className="monthly-title">{formattedMonth} 신고 현황</h3>
                      <p className="monthly-subtitle">이번 달 접수된 신고를 확인하세요</p>
                    </div>
                    <span className="monthly-icon">📅</span>
                  </div>
                  
                  <div className="monthly-stats">
                    <div className="monthly-stat">
                      <div className="monthly-number">{reports.length}</div>
                      <div className="monthly-label">전체 신고</div>
                    </div>
                    <div className="monthly-stat">
                      <div className="monthly-number">
                        {reports.filter(r => r.status === 'APPROVED').length}
                      </div>
                      <div className="monthly-label">승인 완료</div>
                    </div>
                    <div className="monthly-stat">
                      <div className="monthly-number">
                        {reports.filter(r => r.status === 'PENDING').length}
                      </div>
                      <div className="monthly-label">대기 중</div>
                    </div>
                    <div className="monthly-stat">
                      <div className="monthly-number">
                        {reports.length > 0 ? Math.round((reports.filter(r => r.status === 'APPROVED').length / reports.length) * 100) : 0}%
                      </div>
                      <div className="monthly-label">처리율</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header-with-border">
                  <h3>이번 달 신고 목록</h3>
                  <p>{formattedMonth}에 접수된 총 {reports.length}건의 신고</p>
                </div>
                
                <div className="card-body">
                  {reports.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">📅</div>
                      <p>이번 달에는 아직 신고가 없습니다.</p>
                    </div>
                  ) : (
                    <div className="report-list">
                      {reports.map((report) => (
                        <div
                          key={report.id}
                          className="report-list-item"
                          onClick={() => navigate(`/main/reports/${report.id}`)}
                        >
                          <div className="report-header">
                            <div className="report-info">
                              <h4 className="report-title">{report.title}</h4>
                              <div className="report-meta">
                                <span>신고자: {report.reporterName}</span>
                                <span>피신고자: {report.targetName}</span>
                              </div>
                              <div className="report-sub-meta">
                                <span>브랜드: {report.detectedBrand || '미확인'}</span>
                                <span>신고시각: {new Date(report.reportedAt).toLocaleDateString('ko-KR')}</span>
                              </div>
                            </div>
                            <div className="report-status">
                              <span className={`status-badge status-${report.status.toLowerCase()}`}>
                                {report.status === 'PENDING' && '대기중'}
                                {report.status === 'APPROVED' && '승인됨'}
                                {report.status === 'REJECTED' && '반려됨'}
                              </span>
                            </div>
                          </div>
                          
                          {report.location && (
                            <div className="report-location-border">
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

            <div className="content-sidebar">
              <Notice />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}