import { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    try {
      const res = await axios.post('http://localhost:8000/chat', {
        message: input,
      });
      setResponse(res.data.response); // FastAPI가 {"response": "..."} 식으로 보내줘야 함
    } catch (err) {
      alert('챗봇 응답 실패');
    }
  };

  return (
    <div className="card" style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>🤖 AI 도우미</h3>
        <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          신고 처리에 대해 질문하세요
        </p>
      </div>
      
      <div style={{ padding: '20px' }}>
        {/* 챗봇 응답 영역 */}
        {response && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              🤖 AI 응답
            </div>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
              {response}
            </div>
          </div>
        )}
        
        {/* 입력 영역 */}
        <div style={{ marginBottom: '16px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            style={{ marginBottom: '12px' }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend}
            style={{ width: '100%' }}
          >
            질문하기
          </button>
        </div>
        
        {/* 빠른 질문 */}
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            빠른 질문
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              '승인 기준은?',
              '벌금 산정 방법',
              '반려 사유 작성법',
              '통계 보는 방법'
            ].map((question, index) => (
              <button
                key={index}
                className="outline"
                onClick={() => setInput(question)}
                style={{
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  textAlign: 'left'
                }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        
        {/* 도움말 */}
        <div style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          fontSize: '0.75rem',
          color: '#0c5aa6'
        }}>
          💡 팁: Enter 키로 빠르게 질문을 보낼 수 있습니다
        </div>
      </div>
    </div>
  );
}