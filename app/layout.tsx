import type { Metadata } from "next";
import "./globals.css";
import Navbar from './components/Navbar'
// ParticleBackground组件移除

export const metadata: Metadata = {
  title: "自律委员会",
  description: "自律委员会官方网站 - 自我管理、自我服务、自我教育、自我监督",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body
        className="antialiased"
      >
        {/* 无障碍跳过导航链接 */}
        <a href="#main-content" className="skip-link">
          跳转到主要内容
        </a>
        {/* 背景粒子效果移除 */}
        <Navbar />
        <main id="main-content" className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}