import AuthProvider from './auth'
import Chat from './components/Chat'

export default function Home() {
  return (
    <>
      <AuthProvider />
      <Chat />
    </>
  )
}
