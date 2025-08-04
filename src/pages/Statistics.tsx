import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface Statistics {
  totalCount: number;
  monthlyCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export default function Statistics() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/reports/statistics');
        const data = res.data.results?.[0];
        setStats(data);
      } catch (err) {
        alert('통계를 불러오지 못했습니다.');
      }
    };
    fetchStats();
  }, []);

  if (!stats)
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <span className="text-gray-600">로딩 중...</span>
      </div>
    );

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">신고 통계</h2>
      <div className="bg-white shadow p-6 rounded-xl w-full max-w-md space-y-2 text-center">
        <p>📊 전체 신고 수: <strong>{stats.totalCount}</strong></p>
        <p>🗓️ 이번 달 신고 수: <strong>{stats.monthlyCount}</strong></p>
        <p className="text-green-600">✅ 승인된 신고 수: <strong>{stats.approvedCount}</strong></p>
        <p className="text-red-500">❌ 반려된 신고 수: <strong>{stats.rejectedCount}</strong></p>
      </div>
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate('/main')}
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}