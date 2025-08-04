import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Notice() {
  const [notices, setNotices] = useState<string>('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get('/notices');
        setNotices(res.data.results);
      } catch (err) {
        alert('공지사항을 불러오지 못했습니다.');
      }
    };
    fetchNotices();
  }, []);

  return (
    <div style={{ border: '1px solid gray', padding: '1rem', width: '300px' }}>
      <h3>📢 공지사항</h3>
      <div>{notices}</div>
    </div>
  );
}