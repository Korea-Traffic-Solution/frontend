import { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/chat', {
        message: input,
      });
      setResponse(res.data.response || '응답을 받지 못했습니다.');
      setInput(''); // 입력 필드 초기화
    } catch (err) {
      console.error('챗봇 응답 실패:', err);
      setResponse('챗봇 응답에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3 className="chatbot-title">🤖 AI 어시스턴트</h3>
      </div>
      <div className="chatbot-body">
        <div className="chatbot-input-group">
          <input
            className="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="질문을 입력하세요..."
            disabled={isLoading}
          />
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? '전송 중' : '전송'}
          </button>
        </div>
        
        <div className="chatbot-response">
          {response || '안녕하세요! 신고 처리에 대해 궁금한 점이 있으시면 언제든 물어보세요.'}
        </div>
        
        {/* 빠른 질문 버튼들 */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-light)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
            빠른 질문
          </div>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setInput('신고 승인 기준이 무엇인가요?')}
            disabled={isLoading}
            style={{ 
              justifyContent: 'flex-start', 
              fontSize: '12px',
              padding: '8px 12px'
            }}
          >
            승인 기준
          </button>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setInput('벌금은 어떻게 책정하나요?')}
            disabled={isLoading}
            style={{ 
              justifyContent: 'flex-start', 
              fontSize: '12px',
              padding: '8px 12px'
            }}
          >
            벌금 책정
          </button>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setInput('반려 사유는 어떻게 작성하나요?')}
            disabled={isLoading}
            style={{ 
              justifyContent: 'flex-start', 
              fontSize: '12px',
              padding: '8px 12px'
            }}
          >
            반려 사유
          </button>
        </div>
      </div>
    </div>
  );
}