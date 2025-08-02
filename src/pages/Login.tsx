import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/auth/login', {
        loginId: id,
        password: password,
      });

      console.log('✅ 로그인 응답:', res.data);

      const token = res.data?.results?.[0]?.token;
      if (!token) {
        alert('토큰이 존재하지 않습니다.');
        return;
      }

      localStorage.setItem('token', token);
      alert('로그인 성공');
      navigate('/main');
    } catch (err) {
      console.error('❌ 로그인 에러:', err);
      alert('로그인 실패');
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}