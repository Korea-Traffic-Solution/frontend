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

  if (!stats) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>신고 통계</h2>
      <p>전체 신고 수: {stats.totalCount}</p>
      <p>이번 달 신고 수: {stats.monthlyCount}</p>
      <p>승인된 신고 수: {stats.approvedCount}</p>
      <p>반려된 신고 수: {stats.rejectedCount}</p>
      <button onClick={() => navigate('/main')}>메인으로 돌아가기</button>
    </div>
  );
}