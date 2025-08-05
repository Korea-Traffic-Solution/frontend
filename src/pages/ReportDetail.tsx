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
      }
    };
    fetchDetail();
  }, [id]);

  const handleAction = async (status: 'APPROVED' | 'REJECTED') => {
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
    }
  };

  if (!report) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="loading"></div>
    </div>
  );

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
          <div className="nav-item active" onClick={() => navigate('/main/reports')}>
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
            메인으로 돌아가기
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="main-layout">
        {/* 헤더 */}
        <div className="page-header">
          <div>
            <h1 className="page-title">세부사항 페이지</h1>
            <p className="page-subtitle">2025-05-08/화일</p>
          </div>
          <div className="header-user-info">
            <span>Logout</span>
            <span>🔍 검색</span>
            <span>A 관리자</span>
          </div>
        </div>

        {/* 메인 컨텐츠와 사이드바 */}
        <div style={{ display: 'flex', gap: '30px', padding: '30px' }}>
          {/* 신고 상세 정보 */}
          <div style={{ flex: '3' }}>
            {/* 신고 정보 카드 */}
            <div className="card gradient-card pink" style={{ marginBottom: '20px' }}>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
                      {report.title}
                    </h2>
                    <p style={{ margin: '4px 0 0 0', color: 'rgba(0,0,0,0.7)', fontSize: '0.9rem' }}>
                      신고 ID: {report.id} | 신고일: {new Date(report.reportedAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <span className={`status-badge status-${report.status.toLowerCase()}`}>
                    {report.status === 'PENDING' && '대기중'}
                    {report.status === 'APPROVED' && '승인됨'}
                    {report.status === 'REJECTED' && '반려됨'}
                  </span>
                </div>

                {/* 이미지 영역 */}
                <div style={{ 
                  width: '200px', 
                  height: '300px', 
                  backgroundColor: '#e9ecef', 
                  borderRadius: '12px',
                  border: '2px solid var(--primary-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  backgroundImage: 'linear-gradient(45deg, #f8f9fa 25%, transparent 25%), linear-gradient(-45deg, #f8f9fa 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8f9fa 75%), linear-gradient(-45deg, transparent 75%, #f8f9fa 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}>
                  <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🛴</div>
                    <div style={{ fontSize: '0.8rem' }}>신고 이미지</div>
                  </div>
                </div>

                {/* 기본 정보 */}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: '150px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.6)', marginBottom: '4px' }}>신고자</div>
                    <div style={{ fontWeight: '500' }}>{report.reporterName}</div>
                  </div>
                  <div style={{ minWidth: '150px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.6)', marginBottom: '4px' }}>피신고자</div>
                    <div style={{ fontWeight: '500' }}>{report.targetName}</div>
                  </div>
                  <div style={{ minWidth: '150px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.6)', marginBottom: '4px' }}>감지된 브랜드</div>
                    <div style={{ fontWeight: '500' }}>{report.detectedBrand || '미확인'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="card" style={{ marginBottom: '20px' }}>
              <div className="card-header-with-border">
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>상세 정보</h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>신고 시각</div>
                    <div style={{ fontWeight: '500' }}>{new Date(report.reportedAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>상태</div>
                    <div style={{ fontWeight: '500' }}>{report.status}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>위치</div>
                    <div style={{ fontWeight: '500' }}>{report.location}</div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>AI 분석 결과</div>
                  <div style={{ 
                    backgroundColor: 'var(--primary-light)', 
                    padding: '12px', 
                    borderRadius: '8px',
                    fontWeight: '500'
                  }}>
                    {report.aiResult}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>신고 내용</div>
                  <div style={{ 
                    backgroundColor: 'var(--bg-color)', 
                    padding: '16px', 
                    borderRadius: '8px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {report.reportContent}
                  </div>
                </div>
              </div>
            </div>

            {/* 처리 양식 */}
            {report.status === 'PENDING' && (
              <div className="card">
                <div className="card-header-with-border">
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>신고 처리</h3>
                </div>
                <div className="card-body">
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '8px', color: 'var(--text-primary)' }}>
                      사유
                    </label>
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="처리 사유를 입력하세요"
                      style={{ marginBottom: '0' }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '8px', color: 'var(--text-primary)' }}>
                      벌금 (원)
                    </label>
                    <input
                      type="number"
                      value={fine}
                      onChange={(e) => setFine(parseInt(e.target.value) || 0)}
                      placeholder="벌금을 입력하세요"
                      style={{ marginBottom: '0' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      className="success"
                      onClick={() => handleAction('APPROVED')}
                      style={{ flex: 1 }}
                    >
                      승인
                    </button>
                    <button 
                      className="danger"
                      onClick={() => handleAction('REJECTED')}
                      style={{ flex: 1 }}
                    >
                      반려
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽 사이드바 - 챗봇 */}
          <div style={{ flex: '1' }}>
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
}