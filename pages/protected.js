
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedPage() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const correctPassword = process.env.PASSWORD;

  useEffect(() => {
    // 检查本地存储的密码
    const storedPassword = localStorage.getItem('appAccessToken');
    if (storedPassword === correctPassword) {
      setIsVerified(true);
      return;
    }

    // 未验证时弹出密码输入框
    const userInput = prompt('🔐 请输入访问密码:');
    if (userInput === correctPassword) {
      localStorage.setItem('appAccessToken', userInput);
      setIsVerified(true);
    } else {
      alert('访问拒绝: 密码错误');
      router.push('/');
    }
  }, []);

  if (!isVerified) return <div>验证中...</div>;

  return (
    <div>
      <h1>受保护内容</h1>
      <button onClick={() => {
        localStorage.removeItem('appAccessToken');
        router.reload();
      }}>退出登录</button>
    </div>
  );
}
