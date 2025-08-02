import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';

export default function MonthlyReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonthlyReports = async () => {
      try {
        const res = await axios.get('/reports/monthly?page=0&size=10');
        const data = res.data.results;
        if (Array.isArray(data)) {
          setReports(data);
        }
      } catch (err) {
        alert('이번 달 신고 목록을 불러오지 못했습니다.');
      }
    };
    fetchMonthlyReports();
  }, []);

  return (
    <div>
      <h2>이번 달 신고 목록</h2>
      <button onClick={() => navigate('/main')}>메인으로 돌아가기</button>
      <ul>
        {reports.map((report) => (
          <li
            key={report.id}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/main/reports/${report.id}`)}
          >
            <strong>{report.title}</strong> - 상태: {report.status} - 작성자: {report.reporterName}
          </li>
        ))}
      </ul>
    </div>
  );
}