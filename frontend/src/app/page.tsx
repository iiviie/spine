import WalletConnectButton from '@/components/WalletConnectButton'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Spine</h1>
      <WalletConnectButton />
    </main>
  )
}
