import { ReactNode } from 'react'

export const metadata = {
  title: 'Shugaosha Admin Studio',
  description: 'Manage Shugaosha bilingual content',
}

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
