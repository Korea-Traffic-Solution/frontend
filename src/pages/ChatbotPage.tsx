import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: '안녕하세요! 전동킥보드 법률 안내 챗봇입니다. 궁금한 점이 있으시면 언제든 물어보세요! 🛴',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateUID = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/askWeb', {
        uid: generateUID(),
        question: currentInput
      });

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.data.result || '응답을 받지 못했습니다.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('챗봇 응답 실패:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: '죄송합니다. 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
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

  const quickQuestions = [
    '헬멧 착용 의무가 있나요?',
    '킥보드 주차 규정은 어떻게 되나요?',
    '무단 주차 시 벌금은 얼마인가요?',
    '음주운전 시 처벌은 어떻게 되나요?'
  ];

  return (
    <div className="layout">
      <div className="main-content">
        {/* 페이지 헤더 */}
        <div className="page-header">
          <h1 className="page-title">법률 안내 챗봇</h1>
          <p className="page-description">전동킥보드 관련 법률에 대해 궁금한 점을 물어보세요</p>
          <div className="page-actions">
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/main')}
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>

        {/* 챗봇 컨테이너 */}
        <div className="card" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
          {/* 채팅 영역 */}
          <div style={{ 
            flex: 1, 
            padding: '20px', 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: '8px'
                }}
              >
                {message.type === 'bot' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    🤖
                  </div>
                )}
                
                <div style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  background: message.type === 'user' 
                    ? 'var(--primary-blue)' 
                    : 'var(--secondary-gray)',
                  color: message.type === 'user' 
                    ? 'white' 
                    : 'var(--text-primary)',
                  borderBottomRightRadius: message.type === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: message.type === 'bot' ? '4px' : '16px'
                }}>
                  {message.content}
                </div>

                {message.type === 'user' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--success-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    👤
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                gap: '8px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--primary-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  🤖
                </div>
                
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px',
                  borderBottomLeftRadius: '4px',
                  background: 'var(--secondary-gray)',
                  color: 'var(--text-secondary)',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--text-secondary)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></div>
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--text-secondary)',
                    animation: 'pulse 1.5s ease-in-out infinite 0.2s'
                  }}></div>
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--text-secondary)',
                    animation: 'pulse 1.5s ease-in-out infinite 0.4s'
                  }}></div>
                  <span style={{ marginLeft: '8px' }}>답변을 생성하고 있습니다...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 질문 버튼들 */}
          {messages.length === 1 && (
            <div style={{ 
              padding: '0 20px 16px',
              borderTop: '1px solid var(--border-light)'
            }}>
              <div style={{ 
                fontSize: '13px', 
                color: 'var(--text-secondary)', 
                marginBottom: '12px',
                marginTop: '16px'
              }}>
                💡 빠른 질문
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '8px' 
              }}>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="btn btn-ghost btn-sm"
                    onClick={() => setInput(question)}
                    style={{ 
                      justifyContent: 'flex-start',
                      padding: '8px 12px',
                      fontSize: '12px',
                      textAlign: 'left'
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 입력 영역 */}
          <div style={{ 
            padding: '16px 20px', 
            borderTop: '1px solid var(--border-light)',
            background: 'var(--background)'
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="궁금한 점을 입력하세요..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'none',
                  minHeight: '44px',
                  maxHeight: '120px',
                  background: 'var(--background)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
              />
              <button
                className="btn btn-primary"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                style={{ 
                  padding: '12px 20px',
                  borderRadius: '12px',
                  minWidth: '60px'
                }}
              >
                {isLoading ? '...' : '전송'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}