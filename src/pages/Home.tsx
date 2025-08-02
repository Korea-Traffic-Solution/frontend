import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>관리자 대시보드</h2>
      <button onClick={() => navigate('/main/reports')}>신고 목록</button>
      <button onClick={() => navigate('/main/monthly')}>이번 달 신고</button>
      <button onClick={() => navigate('/main/excel')}>엑셀 다운로드</button>
      <button onClick={() => navigate('/main/statistics')}>통계</button>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
      >
        로그아웃
      </button>
    </div>
  );
}