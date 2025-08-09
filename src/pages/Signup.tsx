// src/pages/Signup.tsx
import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');       // 관할지구 (예: 영통구)
  const [email, setEmail] = useState('');
  const [classname, setClassname] = useState(''); // 소속/직급 등
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
  if (!loginId.trim() || !password.trim() || !name.trim() || !region.trim() || !email.trim() || !classname.trim()) {
    alert('모든 항목을 입력해주세요.');
    return;
  }
  if (password.length < 6) {     
    alert('비밀번호는 최소 6자 이상이어야 합니다.');
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert('이메일 형식이 올바르지 않습니다.');
    return;
  }

  setIsLoading(true);
  try {
    await axios.post('/auth/signup', { loginId, password, name, region, email, classname });
    alert('회원가입 성공! 로그인 해주세요.');
    navigate('/login');
  } catch (err: any) {
    const msg = err?.response?.data?.status?.message || '회원가입에 실패했습니다.';
    alert(msg);
  } finally {
    setIsLoading(false);
  }
};

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSignup();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">관리자 회원가입</h1>

        <div className="login-form">
          <div className="form-group">
            <label className="form-label">아이디</label>
            <input
              className="form-input"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              onKeyPress={onEnter}
              disabled={isLoading}
              placeholder="로그인에 사용할 아이디"
            />
          </div>

          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={onEnter}
              disabled={isLoading}
              placeholder="비밀번호"
            />
          </div>

          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={onEnter}
              disabled={isLoading}
              placeholder="관리자 이름"
            />
          </div>

          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={onEnter}
              disabled={isLoading}
              placeholder="example@domain.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">관할지구</label>
            <input
              className="form-input"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              onKeyPress={onEnter}
              disabled={isLoading}
              placeholder="예) 영통구"
            />
          </div>

          <div className="form-group">
            <label className="form-label">소속/직급</label>
            <input
              className="form-input"
              value={classname}
              onChange={(e) => setClassname(e.target.value)}
              onKeyPress={onEnter}
              disabled={isLoading}
              placeholder="예) 형사과 / 경위"
            />
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleSignup}
            disabled={isLoading}
            style={{ width: '100%', marginTop: 8 }}
          >
            {isLoading ? '가입 중...' : '회원가입'}
          </button>

          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <button className="btn btn-link" onClick={() => navigate('/login')} disabled={isLoading}>
              로그인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}