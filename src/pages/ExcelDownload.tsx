import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function ExcelDownloadPage() {
  const [brand, setBrand] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!brand.trim()) {
      alert('브랜드명을 입력해주세요.');
      return;
    }

    setIsDownloading(true);
    try {
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
      
      alert('엑셀 파일이 다운로드되었습니다.');
    } catch (err) {
      console.error('❌ 엑셀 다운로드 실패:', err);
      alert('엑셀 다운로드에 실패했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  return (
    <div className="layout">
      <div className="main-content">
        {/* 페이지 헤더 */}
        <div className="page-header">
          <h1 className="page-title">엑셀 다운로드</h1>
          <p className="page-description">승인된 신고 데이터를 브랜드별로 엑셀 파일로 다운로드할 수 있습니다</p>
          <div className="page-actions">
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/main')}
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>

        {/* 다운로드 섹션 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          {/* 다운로드 폼 */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📄 엑셀 다운로드</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">브랜드명 *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="브랜드명을 입력하세요 (예: 킥고잉)"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isDownloading}
                />
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  입력한 브랜드의 승인된 신고만 다운로드됩니다.
                </div>
              </div>
              
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleDownload}
                disabled={isDownloading || !brand.trim()}
                style={{ width: '100%', marginTop: '8px' }}
              >
                {isDownloading ? '다운로드 중...' : '엑셀 다운로드'}
              </button>
            </div>
          </div>

          {/* 안내 정보 */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">ℹ️ 다운로드 안내</h2>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ 
                  padding: '12px', 
                  background: 'var(--primary-blue-light)', 
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--primary-blue)'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px', color: 'var(--primary-blue)' }}>
                    다운로드 범위
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                    승인 상태(APPROVED)인 신고만 포함됩니다.
                  </div>
                </div>
                
                <div style={{ 
                  padding: '12px', 
                  background: 'var(--success-green-light)', 
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--success-green)'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px', color: 'var(--success-green)' }}>
                    파일 형식
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                    Microsoft Excel 형식(.xlsx)으로 제공됩니다.
                  </div>
                </div>
                
                <div style={{ 
                  padding: '12px', 
                  background: 'var(--warning-orange-light)', 
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--warning-orange)'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px', color: 'var(--warning-orange)' }}>
                    파일명 규칙
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                    reports_[브랜드명]_[날짜].xlsx
                  </div>
                </div>
                
                <div style={{ 
                  padding: '12px', 
                  background: 'var(--secondary-gray)', 
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--border-medium)'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>포함 정보</div>
                  <ul style={{ fontSize: '14px', margin: '0', paddingLeft: '16px', lineHeight: '1.6' }}>
                    <li>신고 제목 및 내용</li>
                    <li>신고자/피신고자 정보</li>
                    <li>신고 일시 및 위치</li>
                    <li>AI 분석 결과</li>
                    <li>처리 결과 및 벌금</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 최근 다운로드 (예시) */}
        <div className="card" style={{ marginTop: '24px' }}>
          <div className="card-header">
            <h2 className="card-title">📊 브랜드별 승인 현황</h2>
          </div>
          <div className="card-body">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px',
              textAlign: 'center' 
            }}>
              <div style={{ padding: '16px', background: 'var(--secondary-gray)', borderRadius: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>킥고잉</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  대표 브랜드
                </div>
              </div>
              <div style={{ padding: '16px', background: 'var(--secondary-gray)', borderRadius: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>씽씽</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  주요 브랜드
                </div>
              </div>
              <div style={{ padding: '16px', background: 'var(--secondary-gray)', borderRadius: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>따릉이</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  공공 브랜드
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}