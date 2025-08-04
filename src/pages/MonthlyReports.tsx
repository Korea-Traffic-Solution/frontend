import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';
import Notice from '../components/Notice';

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
    <div className="flex gap-8 p-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">이번 달 신고 목록</h2>
        <button
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate('/main')}
        >
          메인으로 돌아가기
        </button>
        <ul className="space-y-2">
          {reports.map((report) => (
            <li
              key={report.id}
              className="p-3 bg-white shadow-md rounded cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/main/reports/${report.id}`)}
            >
              <strong>{report.title}</strong> - 상태: {report.status} - 작성자: {report.reporterName}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/3">
        <Notice />
      </div>
    </div>
  );
}