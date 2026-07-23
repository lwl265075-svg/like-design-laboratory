import './globals.css'

export const metadata = {
  title: '来点设计实验室｜LIKE.DESIGN LABORATORY',
  description: '来点设计实验室作品网站，聚焦产品设计、工业设计与设计表达。',
  openGraph: {
    title: '来点设计实验室',
    description: 'LIKE.DESIGN LABORATORY — Selected Works',
    type: 'website',
    locale: 'zh_CN',
  },
}

export const viewport = {
  themeColor: '#090909',
  colorScheme: 'dark',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
