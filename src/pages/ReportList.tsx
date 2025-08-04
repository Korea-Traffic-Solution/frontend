import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import type { Report } from '../types';
import Notice from '../components/Notice';

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
        }
      } catch (err) {
        alert('신고 목록을 불러오지 못했습니다.');
      }
    };
    fetchReports();
  }, []);

  const handleDownloadExcel = async () => {
    try {
      const brand = localStorage.getItem('brand');
      if (!brand) {
        alert('브랜드 정보가 없습니다. 다시 검색 해주세요.');
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
      alert('엑셀 다운로드에 실패했습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 3 }}>
        <h2>신고 목록</h2>
        <button onClick={() => navigate('/main')}>홈으로 돌아가기</button>
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
      <div style={{ flex: 1 }}>
        <Notice />
      </div>
    </div>
  );
}