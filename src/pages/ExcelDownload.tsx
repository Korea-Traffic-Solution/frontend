import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function ExcelDownloadPage() {
  const [brand, setBrand] = useState('');
  const navigate = useNavigate();

  const handleDownload = async () => {
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
    } catch (err) {
      console.error('❌ 엑셀 다운로드 실패:', err);
      alert('엑셀 다운로드에 실패했습니다.');
    }
  };

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
          <div className="nav-item" onClick={() => navigate('/main/reports')}>
            <span className="nav-item-icon">📋</span>
            신고 목록
          </div>
          <div className="nav-item" onClick={() => navigate('/main/monthly')}>
            <span className="nav-item-icon">📅</span>
            이번 달 신고
          </div>
          <div className="nav-item active">
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
          <div className="page-header-content">
            <div>
              <h1 className="page-title">엑셀 다운로드</h1>
              <p className="page-subtitle">승인된 신고 데이터를 엑셀 파일로 다운로드</p>
            </div>
            <div className="header-user-info">
              <span>Logout</span>
              <span>🔍 검색</span>
              <span>A 관리자</span>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className="page-content-inner">
          {/* 다운로드 메인 카드 */}
          <div className="card gradient-card green" style={{ marginBottom: '30px', textAlign: 'center' }}>
            <div style={{ padding: '40px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📥</div>
              <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '600', marginBottom: '12px' }}>
                승인된 신고 엑셀 다운로드
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(0,0,0,0.7)', marginBottom: '30px' }}>
                브랜드별로 승인된 신고 데이터를 엑셀 파일로 다운로드할 수 있습니다
              </p>
              
              <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <input
                  type="text"
                  placeholder="브랜드 입력 (예: 킥고잉)"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  style={{ 
                    marginBottom: '20px',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    padding: '16px'
                  }}
                />
                <button 
                  onClick={handleDownload}
                  className="success"
                  style={{ 
                    width: '100%',
                    fontSize: '1.1rem',
                    padding: '16px 24px'
                  }}
                >
                  📥 엑셀 다운로드
                </button>
              </div>
            </div>
          </div>

          {/* 기능 설명 카드들 */}
          <div className="stats-grid" style={{ marginBottom: '30px' }}>
            <div className="card">
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📊</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>
                  실시간 데이터
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  최신 승인된 신고 데이터를 실시간으로 다운로드
                </p>
              </div>
            </div>

            <div className="card">
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🏷️</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>
                  브랜드별 분류
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  특정 브랜드의 신고 데이터만 선별적으로 다운로드
                </p>
              </div>
            </div>

            <div className="card">
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📋</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>
                  완전한 정보
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  신고자, 위치, 처리 결과 등 모든 정보 포함
                </p>
              </div>
            </div>
          </div>

          {/* 인기 브랜드 */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <div className="card-header-with-border">
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>자주 다운로드하는 브랜드</h3>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                클릭하면 해당 브랜드가 자동으로 입력됩니다
              </p>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {['킥고잉', '씽씽', '라임', '빔', '지쿠터'].map((brandName) => (
                  <button
                    key={brandName}
                    className="outline"
                    onClick={() => setBrand(brandName)}
                    style={{
                      padding: '12px 20px',
                      fontSize: '0.9rem',
                      borderRadius: '20px'
                    }}
                  >
                    {brandName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 다운로드 안내 */}
          <div className="card" style={{ backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-color)' }}>
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>💡</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '8px' }}>
                    다운로드 안내사항
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--primary-color)' }}>
                    <li style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
                      승인된 신고만 다운로드됩니다
                    </li>
                    <li style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
                      파일명에는 브랜드명과 다운로드 날짜가 포함됩니다
                    </li>
                    <li style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
                      브랜드명은 대소문자를 구분하지 않습니다
                    </li>
                    <li style={{ fontSize: '0.9rem' }}>
                      데이터가 많을 경우 다운로드에 시간이 소요될 수 있습니다
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}