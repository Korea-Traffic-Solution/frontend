// src/pages/ReportDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import type { ConclusionDetail } from '../types';
import Chatbot from '../components/Chatbot';

export default function ReportDetail() {
  const { id } = useParams();
  const [data, setData] = useState<ConclusionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`/reports/${id}`);
        const item = Array.isArray(res.data?.results) ? res.data.results[0] : null;
        setData(item ?? null);
      } catch (err) {
        console.error('❌ 상세 정보 불러오기 실패:', err);
        alert('상세 정보를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="layout">
        <div className="main-content">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="layout">
        <div className="main-content">
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: 40 }}>
              <p>신고를 찾을 수 없습니다.</p>
              <button className="btn btn-primary" onClick={() => navigate('/main/reports')}>
                목록으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const img = data.imageUrl || data.reportImgUrl;

  return (
    <div className="layout">
      <div className="content-with-sidebar">
        <div className="content-main">
          <div className="page-header">
            <h1 className="page-title">신고 상세</h1>
            <p className="page-description">Firestore Conclusion 데이터를 그대로 표시합니다</p>
            <div className="page-actions">
              <button className="btn btn-secondary" onClick={() => navigate('/main/reports')}>
                목록으로 돌아가기
              </button>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <div className="card-header">
              <h2 className="card-title">📄 신고 정보</h2>
            </div>
            <div className="card-body">
              {img && (
                <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 8 }}>
                    신고 이미지
                  </div>
                  <div style={{ maxWidth: 420, border: '1px solid var(--border-light)', borderRadius: 8, overflow: 'hidden', boxShadow: 'var(--shadow-light)' }}>
                    <img src={img} alt="신고 이미지" style={{ width: '100%', display: 'block' }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>제목</span>
                      <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>{data.violation || '제목 없음'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>신고자 ID</span>
                      <div style={{ fontSize: 16, marginTop: 4 }}>{data.userId || '익명'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>신고 시각(원본)</span>
                      <div style={{ fontSize: 16, marginTop: 4 }}>{data.date || '—'}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>감지된 브랜드</span>
                      <div style={{ fontSize: 16, marginTop: 4 }}>{data.detectedBrand || '미확인'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>GPS</span>
                      <div style={{ fontSize: 16, marginTop: 4 }}>{data.gpsInfo || '—'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>지역</span>
                      <div style={{ fontSize: 16, marginTop: 4 }}>{data.region || '—'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>AI 분석 결과</span>
                  <div style={{ fontSize: 16, marginTop: 4 }}>
                    {data.aiConclusion && data.aiConclusion.length > 0 ? data.aiConclusion.join(', ') : '분석 결과 없음'}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>신고 내용</span>
                  <div
                    style={{
                      fontSize: 16,
                      marginTop: 4,
                      padding: 12,
                      background: 'var(--secondary-gray)',
                      borderRadius: 8,
                      lineHeight: 1.6
                    }}
                  >
                    {data.violation || '—'}
                  </div>
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