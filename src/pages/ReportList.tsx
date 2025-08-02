import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('/reports?page=0&size=10');
        const data = res.data.results;
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.error('results가 배열이 아님:', data);
        }
      } catch (err) {
        console.error('❌ 목록 불러오기 실패:', err);
        alert('신고 목록을 불러오지 못했습니다.');
      }
    };
    fetchReports();
  }, []);

  const handleDownloadExcel = async () => {
    try {
      const brand = localStorage.getItem('brand');
      if (!brand) {
        alert('브랜드 정보가 없습니다. 다시 로그인해주세요.');
        return;
      }

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
    <div>
      <h2>신고 목록</h2>
      <button onClick={() => navigate('/main')}>홈으로 돌아가기</button>
      <button onClick={handleDownloadExcel}>Excel 다운로드</button>
      <ul>
        {reports.map((report) => (
          <li
            key={report.id}
            onClick={() => navigate(`/main/reports/${report.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <strong>{report.title}</strong> - 상태: {report.status} - 작성자: {report.reporterName}
          </li>
        ))}
      </ul>
    </div>
  );
}