// src/pages/Login.tsx
import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!id.trim() || !password.trim()) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post('/auth/login', { loginId: id, password });
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">관리자 로그인</h1>
        <div className="login-form">
          <div className="form-group">
            <label className="form-label">아이디</label>
            <input
              type="text"
              className="form-input"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              className="form-input"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>

          <button className="btn btn-primary btn-lg" onClick={handleLogin} disabled={isLoading} style={{ width: '100%', marginTop: 8 }}>
            {isLoading ? '로그인 중...' : '로그인'}
          </button>

          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <button className="btn btn-link" onClick={() => navigate('/signup')} disabled={isLoading}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}