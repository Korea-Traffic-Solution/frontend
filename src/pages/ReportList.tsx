// src/pages/ReportList.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import type { ReportSimple } from '../types';
import Notice from '../components/Notice';

export default function ReportList() {
  const [reports, setReports] = useState<ReportSimple[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('/reports?page=0&size=10');
        const data = Array.isArray(res.data?.results) ? res.data.results : [];
        setReports(data);
      } catch (err) {
        alert('신고 목록을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
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
          <div className="page-header">
            <h1 className="page-title">신고 목록</h1>
            <p className="page-description">접수된 모든 신고를 확인할 수 있습니다</p>
            <div className="page-actions">
              <button className="btn btn-secondary" onClick={() => navigate('/main')}>
                홈으로 돌아가기
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📋 전체 신고 ({reports.length}건)</h2>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {reports.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
                  신고가 없습니다.
                </div>
              ) : (
                <div style={{ padding: 8 }}>
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
                        <span>
                          {report.reportedAt
                            ? new Date(report.reportedAt).toLocaleDateString()
                            : '—'}
                        </span>
                        <span>•</span>
                        {getStatusBadge(report.status)}
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