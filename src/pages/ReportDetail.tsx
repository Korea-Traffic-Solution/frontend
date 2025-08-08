import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import type { Report } from '../types';
import Chatbot from '../components/Chatbot';

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [reason, setReason] = useState('');
  const [fine, setFine] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`/reports/${id}`);
        console.log('상세 응답:', res.data);
        if (Array.isArray(res.data.results) && res.data.results.length > 0) {
          setReport(res.data.results[0]);
        } else {
          throw new Error('신고 정보 없음');
        }
      } catch (err) {
        console.error('❌ 상세 정보 불러오기 실패:', err);
        alert('상세 정보를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleAction = async (status: 'APPROVED' | 'REJECTED') => {
    if (!reason.trim()) {
      alert('사유를 입력해주세요.');
      return;
    }

    setIsProcessing(true);
    try {
      await axios.patch(`/reports/${id}`, {
        approve: status === 'APPROVED',
        reason,
        fine: status === 'APPROVED' ? fine : undefined,
      });
      alert(`신고가 ${status === 'APPROVED' ? '승인' : '반려'}되었습니다.`);
      navigate('/main/reports');
    } catch (err) {
      alert('처리에 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

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

  if (!report) {
    return (
      <div className="layout">
        <div className="main-content">
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: '40px' }}>
              <p>신고를 찾을 수 없습니다.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/main/reports')}
              >
                목록으로 돌아가기
              </button>
            </div>
          </div>
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
            <h1 className="page-title">신고 상세</h1>
            <p className="page-description">신고 내용을 확인하고 승인 또는 반려를 결정해주세요</p>
            <div className="page-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => navigate('/main/reports')}
              >
                목록으로 돌아가기
              </button>
            </div>
          </div>

          {/* 신고 정보 */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h2 className="card-title">📄 신고 정보</h2>
            </div>
            <div className="card-body">
              {/* 신고 이미지가 있는 경우 */}
              {report.imageUrl && (
                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '8px' }}>
                    신고 이미지
                  </div>
                  <div style={{ 
                    maxWidth: '400px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-light)'
                  }}>
                    <img 
                      src={report.imageUrl} 
                      alt="신고 이미지"
                      style={{ 
                        width: '100%', 
                        height: 'auto',
                        display: 'block'
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>제목</span>
                      <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '4px' }}>{report.title}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>신고자</span>
                      <div style={{ fontSize: '16px', marginTop: '4px' }}>{report.reporterName}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>피신고자</span>
                      <div style={{ fontSize: '16px', marginTop: '4px' }}>{report.targetName}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>신고 시각</span>
                      <div style={{ fontSize: '16px', marginTop: '4px' }}>{new Date(report.reportedAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>상태</span>
                      <div style={{ marginTop: '4px' }}>{getStatusBadge(report.status)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>감지된 브랜드</span>
                      <div style={{ fontSize: '16px', marginTop: '4px' }}>{report.detectedBrand || '미확인'}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>위치</span>
                  <div style={{ fontSize: '16px', marginTop: '4px' }}>{report.location}</div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>AI 분석 결과</span>
                  <div style={{ fontSize: '16px', marginTop: '4px' }}>{report.aiResult}</div>
                </div>
                <div>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>신고 내용</span>
                  <div style={{ 
                    fontSize: '16px', 
                    marginTop: '4px', 
                    padding: '12px', 
                    background: 'var(--secondary-gray)', 
                    borderRadius: '8px',
                    lineHeight: '1.6'
                  }}>
                    {report.reportContent}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 처리 섹션 */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">⚖️ 신고 처리</h2>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">처리 사유 *</label>
                  <input 
                    className="form-input"
                    placeholder="승인 또는 반려 사유를 입력해주세요"
                    value={reason} 
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">벌금 (원)</label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="승인 시 부과할 벌금을 입력해주세요"
                    value={fine}
                    onChange={(e) => setFine(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', paddingTop: '12px' }}>
                  <button 
                    className="btn btn-success"
                    onClick={() => handleAction('APPROVED')}
                    disabled={isProcessing}
                    style={{ flex: 1 }}
                  >
                    {isProcessing ? '처리 중...' : '승인'}
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleAction('REJECTED')}
                    disabled={isProcessing}
                    style={{ flex: 1 }}
                  >
                    {isProcessing ? '처리 중...' : '반려'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-sidebar">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}