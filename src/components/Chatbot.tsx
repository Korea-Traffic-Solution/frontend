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
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-2">🤖 챗봇</h3>
      <input
        className="border rounded w-full p-2 mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="질문 입력"
      />
      <button
        className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
        onClick={handleSend}
      >
        보내기
      </button>
      <p className="mt-2 whitespace-pre-wrap">{response}</p>
    </div>
  );
}