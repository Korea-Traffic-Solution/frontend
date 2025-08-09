// src/pages/ReportDetail.tsx  (승인/반려 섹션 복구)
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import type { ConclusionDetail } from '../types';
import Chatbot from '../components/Chatbot';

export default function ReportDetail() {
  const { id } = useParams();
  const [data, setData] = useState<ConclusionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reason, setReason] = useState('');
  const [fine, setFine] = useState<number | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleAction = async (approve: boolean) => {
    if (!id) return;
    if (!reason.trim()) {
      alert('사유를 입력해주세요.');
      return;
    }
    if (approve && (!fine || Number.isNaN(Number(fine)) || Number(fine) < 0)) {
      alert('벌금을 올바르게 입력해주세요.');
      return;
    }
    setIsProcessing(true);
    try {
      await axios.patch(`/reports/${id}`, {
        approve,
        reason,
        fine: approve ? Number(fine) : 0,
      });
      alert(approve ? '승인 완료' : '반려 완료');
      navigate('/main/reports');
    } catch (e) {
      console.error('❌ 처리 실패:', e);
      alert('처리에 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="layout">
        <div className="main-content"><div className="loading">로딩 중...</div></div>
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
              <button className="btn btn-primary" onClick={() => navigate('/main/reports')}>목록으로 돌아가기</button>
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
              <button className="btn btn-secondary" onClick={() => navigate('/main/reports')}>목록으로 돌아가기</button>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <div className="card-header"><h2 className="card-title">📄 신고 정보</h2></div>
            <div className="card-body">
              {img && (
                <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 8 }}>신고 이미지</div>
                  <div style={{ maxWidth: 420, border: '1px solid var(--border-light)', borderRadius: 8, overflow: 'hidden', boxShadow: 'var(--shadow-light)' }}>
                    <img src={img} alt="신고 이미지" style={{ width: '100%', display: 'block' }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <span className="text-subtle">제목</span>
                      <div className="text-strong">{data.violation || '제목 없음'}</div>
                    </div>
                    <div>
                      <span className="text-subtle">신고자 ID</span>
                      <div>{data.userId || '익명'}</div>
                    </div>
                    <div>
                      <span className="text-subtle">신고 시각(원본/KST)</span>
                      <div>{data.date || '—'}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <span className="text-subtle">감지된 브랜드</span>
                      <div>{data.detectedBrand || '미확인'}</div>
                    </div>
                    <div>
                      <span className="text-subtle">GPS</span>
                      <div>{data.gpsInfo || '—'}</div>
                    </div>
                    <div>
                      <span className="text-subtle">지역</span>
                      <div>{data.region || '—'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
                <div style={{ marginBottom: 12 }}>
                  <span className="text-subtle">AI 분석 결과</span>
                  <div>{data.aiConclusion?.length ? data.aiConclusion.join(', ') : '분석 결과 없음'}</div>
                </div>
                <div>
                  <span className="text-subtle">신고 내용</span>
                  <div className="bubble">{data.violation || '—'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ⚖️ 승인/반려 섹션 복구 */}
          <div className="card">
            <div className="card-header"><h2 className="card-title">⚖️ 신고 처리</h2></div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">처리 사유 *</label>
                  <input
                    className="form-input"
                    placeholder="승인 또는 반려 사유를 입력해주세요"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">벌금 (원)</label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="승인 시 부과할 벌금을 입력해주세요"
                    value={fine}
                    onChange={(e) => setFine(e.target.value === '' ? '' : Number(e.target.value))}
                    disabled={isProcessing}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-success" onClick={() => handleAction(true)} disabled={isProcessing} style={{ flex: 1 }}>
                    {isProcessing ? '처리 중...' : '승인'}
                  </button>
                  <button className="btn btn-danger" onClick={() => handleAction(false)} disabled={isProcessing} style={{ flex: 1 }}>
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