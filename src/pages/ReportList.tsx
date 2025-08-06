import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';
import Notice from '../components/Notice';

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('/reports?page=0&size=10');
        const data = res.data.results;
        if (Array.isArray(data)) {
          setReports(data);
        }
      } catch (err) {
        alert('신고 목록을 불러오지 못했습니다.');
      }
    };
    fetchReports();
  }, []);

  const handleDownloadExcel = async () => {
    try {
      const brand = localStorage.getItem('brand');
      if (!brand) {
        alert('브랜드 정보가 없습니다. 다시 검색 해주세요.');
        return;
      }

      const res = await axios.get('/admin/reports/excel/download', {
        responseType: 'blob',
        params: { brand },
      });

      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reports_${brand}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('엑셀 다운로드에 실패했습니다.');
    }
  };

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
          
          <div className="nav-item active">
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
          
          <div className="nav-item" onClick={() => navigate('/main/statistics')}>
            <span className="nav-item-icon">📊</span>
            통계
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <button className="outline" onClick={() => navigate('/main')}>
            홈으로 돌아가기
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="main-layout">
        <div className="page-header">
          <div className="page-header-content">
            <div>
              <h1 className="page-title">신고 목록</h1>
              <p className="page-subtitle">전체 신고 현황을 확인하고 관리하세요</p>
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
            {/* 통계 카드들 */}
            <div className="stats-grid">
              <div className="stats-card gradient-card">
                <div className="stats-card">
                  <div className="stats-number">{reports.length}</div>
                  <div className="stats-label">전체 신고</div>
                  <div className="stats-percentage">100%</div>
                </div>
              </div>
              
              <div className="stats-card gradient-card blue">
                <div className="stats-card">
                  <div className="stats-number">
                    {reports.filter(r => r.status === 'APPROVED').length}
                  </div>
                  <div className="stats-label">승인 완료</div>
                  <div className="stats-percentage">
                    {reports.length > 0 ? Math.round((reports.filter(r => r.status === 'APPROVED').length / reports.length) * 100) : 0}%
                  </div>
                </div>
              </div>
              
              <div className="stats-card gradient-card green">
                <div className="stats-card">
                  <div className="stats-number">
                    {reports.filter(r => r.status === 'PENDING').length}
                  </div>
                  <div className="stats-label">대기 중</div>
                  <div className="stats-percentage">
                    {reports.length > 0 ? Math.round((reports.filter(r => r.status === 'PENDING').length / reports.length) * 100) : 0}%
                  </div>
                </div>
              </div>
            </div>

            {/* 신고 목록 */}
            <div className="card">
              <div className="card-header-with-border">
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>신고 목록</h3>
                <p style={{ color: '#666', fontSize: '14px', margin: '4px 0 0 0' }}>
                  총 {reports.length}건의 신고가 있습니다
                </p>
              </div>
              
              <div className="card-body">
                {reports.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                    <p>등록된 신고가 없습니다.</p>
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
                            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666' }}>
                              <span>신고자: {report.reporterName}</span>
                              <span>피신고자: {report.targetName}</span>
                              <span>브랜드: {report.detectedBrand || '미확인'}</span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span className={`status-badge status-${report.status.toLowerCase()}`}>
                              {report.status === 'PENDING' && '대기중'}
                              {report.status === 'APPROVED' && '승인됨'}
                              {report.status === 'REJECTED' && '반려됨'}
                            </span>
                            <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                              {new Date(report.reportedAt).toLocaleDateString('ko-KR')}
                            </div>
                          </div>
                        </div>
                        
                        {report.location && (
                          <div style={{ fontSize: '14px', color: '#666' }}>
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