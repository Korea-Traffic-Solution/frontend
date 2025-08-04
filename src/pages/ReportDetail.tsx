import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import type { Report } from '../types';
import Chatbot from '../components/Chatbot';

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [reason, setReason] = useState('');
  const [fine, setFine] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`/reports/${id}`);
        console.log('상세 응답:', res.data);
        if (Array.isArray(res.data.results) && res.data.results.length > 0) {
          setReport(res.data.results[0]);
        } else {
          throw new Error('신고 정보 없음');
        }
      } catch (err) {
        console.error('❌ 상세 정보 불러오기 실패:', err);
        alert('상세 정보를 불러오지 못했습니다.');
      }
    };
    fetchDetail();
  }, [id]);

  const handleAction = async (status: 'APPROVED' | 'REJECTED') => {
    try {
      await axios.patch(`/reports/${id}`, {
        approve: status === 'APPROVED',
        reason,
        fine: status === 'APPROVED' ? fine : undefined,
      });
      alert(`신고가 ${status === 'APPROVED' ? '승인' : '반려'}되었습니다.`);
      navigate('/main/reports');
    } catch (err) {
      alert('처리에 실패했습니다.');
    }
  };

  if (!report) return <div>로딩 중...</div>;

  return (
    <div className="flex gap-8 p-6">
      {/* 왼쪽: 신고 상세 */}
      <div className="flex-1 space-y-4 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold">신고 상세</h2>
        <p><strong>제목:</strong> {report.title}</p>
        <p><strong>신고자:</strong> {report.reporterName}</p>
        <p><strong>피신고자:</strong> {report.targetName}</p>
        <p><strong>신고 시각:</strong> {new Date(report.reportedAt).toLocaleString()}</p>
        <p><strong>상태:</strong> {report.status}</p>
        <p><strong>AI 분석 결과:</strong> {report.aiResult}</p>
        <p><strong>감지된 브랜드:</strong> {report.detectedBrand}</p>
        <p><strong>위치:</strong> {report.location}</p>
        <p><strong>내용:</strong> {report.reportContent}</p>

        <div>
          <label className="block font-semibold">사유</label>
          <input
            className="w-full border rounded p-2 mb-2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold">벌금 (원)</label>
          <input
            type="number"
            className="w-full border rounded p-2 mb-4"
            value={fine}
            onChange={(e) => setFine(parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => handleAction('APPROVED')}
          >
            승인
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => handleAction('REJECTED')}
          >
            반려
          </button>
        </div>
      </div>

      {/* 오른쪽: 챗봇 */}
      <div className="w-1/3">
        <Chatbot />
      </div>
    </div>
  );
}