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
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h3>🤖 챗봇</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="질문 입력"
        style={{ width: '100%' }}
      />
      <button onClick={handleSend}>보내기</button>
      <p>{response}</p>
    </div>
  );
}