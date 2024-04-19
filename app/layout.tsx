import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/util/auth'
import LayoutWrapper from '@/components/layoutWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sitater',
  description: 'Sitater',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className + "min-w-screen min-h-screen"}>
        <LayoutWrapper session={session}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
