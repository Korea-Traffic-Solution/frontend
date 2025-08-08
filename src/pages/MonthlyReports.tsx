import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';
import Notice from '../components/Notice';

export default function MonthlyReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchMonthlyReports();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="status-badge status-approved">승인</span>;
      case 'REJECTED':
        return <span className="status-badge status-rejected">반려</span>;
      default:
        return <span className="status-badge status-pending">대기</span>;
    }
  };

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}년 ${now.getMonth() + 1}월`;
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

  return (
    <div className="layout">
      <div className="content-with-sidebar">
        <div className="content-main">
          {/* 페이지 헤더 */}
          <div className="page-header">
            <h1 className="page-title">이번 달 신고 목록</h1>
            <p className="page-description">{getCurrentMonth()}에 접수된 신고를 확인할 수 있습니다</p>
            <div className="page-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => navigate('/main')}
              >
                메인으로 돌아가기
              </button>
            </div>
          </div>

          {/* 이번 달 통계 */}
          <div className="stats-grid" style={{ marginBottom: '24px' }}>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--primary-blue)' }}>
                {reports.length.toLocaleString()}
              </div>
              <div className="stat-label">이번 달 신고</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--success-green)' }}>
                {reports.filter(r => r.status === 'APPROVED').length.toLocaleString()}
              </div>
              <div className="stat-label">승인</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--error-red)' }}>
                {reports.filter(r => r.status === 'REJECTED').length.toLocaleString()}
              </div>
              <div className="stat-label">반려</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--warning-orange)' }}>
                {reports.filter(r => r.status === 'PENDING').length.toLocaleString()}
              </div>
              <div className="stat-label">대기</div>
            </div>
          </div>

          {/* 신고 목록 */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📅 {getCurrentMonth()} 신고 목록 ({reports.length}건)</h2>
            </div>
            <div className="card-body" style={{ padding: '0' }}>
              {reports.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  이번 달 신고가 없습니다.
                </div>
              ) : (
                <div style={{ padding: '8px' }}>
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="list-item"
                      onClick={() => navigate(`/main/reports/${report.id}`)}
                    >
                      <div className="list-item-title">{report.title}</div>
                      <div className="list-item-meta">
                        <span>작성자: {report.reporterName}</span>
                        <span>•</span>
                        <span>{new Date(report.reportedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        {getStatusBadge(report.status)}
                        {report.detectedBrand && (
                          <>
                            <span>•</span>
                            <span>브랜드: {report.detectedBrand}</span>
                          </>
                        )}
                      </div>
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
  );
}