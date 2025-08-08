export default function Notice() {
  const notices = [
    "🚧 8월 5일부터 킥보드 무단 주차 집중 단속이 시작됩니다.",
    "⚠️ 헬멧 미착용 시 과태료 부과가 강화됩니다.", 
    "📢 앱에서 신고하면 포인트가 지급됩니다!",
  ];

  return (
    <div className="notice-container">
      <div className="notice-header">
        <h3 className="notice-title">📢 공지사항</h3>
      </div>
      <ul className="notice-list">
        {notices.map((notice, index) => (
          <li key={index} className="notice-item">
            {notice}
          </li>
        ))}
      </ul>
    </div>
  );
}