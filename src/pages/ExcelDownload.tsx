import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function ExcelDownloadPage() {
  const [brand, setBrand] = useState('');
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
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
      <h2>승인된 신고 엑셀 다운로드</h2>
      <input
        type="text"
        placeholder="브랜드 입력 (예: 킥고잉)"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <button onClick={handleDownload}>엑셀 다운로드</button>
      <br /><br />
      <button onClick={() => navigate('/main')}>메인으로 돌아가기</button> {/* ✅ 여기 추가 */}
    </div>
  );
}