import { useReown } from '@/providers/ReownProvider';
import Link from 'next/link';

export default function Navbar() {
  const { openWalletModal, isConnected, address } = useReown();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-semibold">C</span>
          </div>
          <span className="text-xl font-semibold">Conspire</span>
        </Link>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search theories..."
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Theory</span>
          </button>

          <button
            onClick={openWalletModal}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isConnected && address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
} 