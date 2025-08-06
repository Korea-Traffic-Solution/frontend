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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-color) 0%, #1b64da 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '48px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        border: 'none'
      }}>
        {/* 로고 */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-color) 0%, #1b64da 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            fontSize: '2.5rem',
            boxShadow: '0 8px 25px rgba(49, 130, 246, 0.3)'
          }}>
            🛴
          </div>
          <h1 style={{
            margin: 0,
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>
            TRAFFIC SOLUTION
          </h1>
          <p style={{
            margin: 0,
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            관리자 로그인
          </p>
        </div>

        {/* 로그인 폼 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--text-primary)'
            }}>
              아이디
            </label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={{
                marginBottom: '0',
                padding: '16px 18px',
                fontSize: '1rem',
                borderRadius: '12px',
                border: '2px solid var(--border-color)',
                transition: 'all 0.2s ease'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
          </div>

          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--text-primary)'
            }}>
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                marginBottom: '0',
                padding: '16px 18px',
                fontSize: '1rem',
                borderRadius: '12px',
                border: '2px solid var(--border-color)',
                transition: 'all 0.2s ease'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '18px',
            fontSize: '1.1rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, var(--primary-color) 0%, #1b64da 100%)',
            border: 'none',
            borderRadius: '12px',
            marginBottom: '24px',
            color: 'white',
            boxShadow: '0 4px 15px rgba(49, 130, 246, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.transform = 'translateY(-2px)';
            target.style.boxShadow = '0 8px 25px rgba(49, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.transform = 'translateY(0)';
            target.style.boxShadow = '0 4px 15px rgba(49, 130, 246, 0.3)';
          }}
        >
          로그인
        </button>

        {/* 부가 정보 */}
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--bg-color)',
          borderRadius: '12px',
          marginTop: '24px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <p style={{ margin: 0, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>🔒</span>
              보안 로그인으로 안전하게 접속하세요
            </p>
            <p style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>💡</span>
              문제가 있으시면 시스템 관리자에게 문의하세요
            </p>
          </div>
        </div>

        {/* 하단 정보 */}
        <div style={{
          marginTop: '32px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          © 2025 Traffic Solution. All rights reserved.
        </div>
      </div>
    </div>
  );
}