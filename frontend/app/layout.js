//frontend/app/Layout.js

export const metadata = {
  title: 'MERN Auth App',
  description: 'MERN app with JWT authentication',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

