export default function Notice() {
  const notices = [
    "🚧 8월 5일부터 킥보드 무단 주차 집중 단속이 시작됩니다.",
    "⚠️ 헬멧 미착용 시 과태료 부과가 강화됩니다.",
    "📢 앱에서 신고하면 포인트가 지급됩니다!",
  ];

  return (
    <div style={{ border: '1px solid gray', padding: '1rem', width: '300px' }}>
      <h3>📢 공지사항</h3>
      <ul style={{ paddingLeft: '1rem' }}>
        {notices.map((notice, index) => (
          <li key={index}>{notice}</li>
        ))}
      </ul>
    </div>
  );
}