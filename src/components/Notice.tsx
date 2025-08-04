export default function Notice() {
  const notices = [
    "🚧 8월 5일부터 킥보드 무단 주차 집중 단속이 시작됩니다.",
    "⚠️ 헬멧 미착용 시 과태료 부과가 강화됩니다.",
    "📢 앱에서 신고하면 포인트가 지급됩니다!",
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-2">📢 공지사항</h3>
      <ul className="list-disc list-inside space-y-1">
        {notices.map((notice, index) => (
          <li key={index}>{notice}</li>
        ))}
      </ul>
    </div>
  );
}