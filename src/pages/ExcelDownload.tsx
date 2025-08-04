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
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">승인된 신고 엑셀 다운로드</h2>
      <input
        type="text"
        className="border p-2 w-full mb-4 rounded"
        placeholder="브랜드 입력 (예: 킥고잉)"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mb-4"
        onClick={handleDownload}
      >
        엑셀 다운로드
      </button>
      <button
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 w-full"
        onClick={() => navigate('/main')}
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}