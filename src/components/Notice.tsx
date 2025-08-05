export default function Notice() {
  const notices = [
    "🚧 8월 5일부터 킥보드 무단 주차 집중 단속이 시작됩니다.",
    "⚠️ 헬멧 미착용 시 과태료 부과가 강화됩니다.",
    "📢 앱에서 신고하면 포인트가 지급됩니다!",
  ];

  return (
    <div className="card" style={{ position: 'sticky', top: '20px' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>📢 공지사항</h3>
        <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          중요한 업데이트를 확인하세요
        </p>
      </div>
      
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {notices.map((notice, index) => (
            <div 
              key={index}
              style={{
                padding: '16px',
                backgroundColor: index === 0 ? '#fff3cd' : index === 1 ? '#f8d7da' : '#d1edff',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: index === 0 ? '#ffc107' : index === 1 ? '#dc3545' : '#007bff',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ 
                fontSize: '0.85rem', 
                lineHeight: '1.5',
                color: index === 0 ? '#856404' : index === 1 ? '#721c24' : '#0c5aa6',
                fontWeight: '500'
              }}>
                {notice}
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: index === 0 ? '#856404' : index === 1 ? '#721c24' : '#0c5aa6',
                marginTop: '8px',
                opacity: 0.8
              }}>
                {index === 0 && '2024.08.04'}
                {index === 1 && '2024.08.03'}
                {index === 2 && '2024.08.02'}
              </div>
            </div>
          ))}
        </div>
        
        {/* 더보기 버튼 */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            className="outline"
            style={{ 
              width: '100%',
              padding: '12px',
              fontSize: '0.9rem'
            }}
          >
            더 많은 공지사항 보기
          </button>
        </div>
      </div>
    </div>
  );
}