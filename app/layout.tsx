import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import LeftPanel from './components/LeftPanel'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from './components/Player'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'music playing app',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const songs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
            <LeftPanel songs={songs}>
              {children}
            </LeftPanel>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
