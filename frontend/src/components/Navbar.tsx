import { useReown } from '@/providers/ReownProvider';
import { useContract } from '@/lib/blockchain/useContract';
import { createAndUploadTheory } from '@/lib/ipfs/ipfsUtils';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function Navbar() {
  const { openWalletModal, isConnected, address } = useReown();
  const { mintNFT, loading } = useContract();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theoryTitle, setTheoryTitle] = useState('');
  const [theoryContent, setTheoryContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCreateTheory = async () => {
    if (!isConnected) {
      openWalletModal();
      return;
    }

    if (!theoryTitle || !theoryContent) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Create and upload theory to IPFS using Pinata
      const ipfsURI = await createAndUploadTheory(
        theoryTitle,
        theoryContent,
        selectedImage || undefined
      );

      // Mint NFT with IPFS URI
      await mintNFT(ipfsURI);
      
      // Reset form and close modal
      setIsModalOpen(false);
      setTheoryTitle('');
      setTheoryContent('');
      setSelectedImage(null);
      setError(null);
    } catch (error) {
      console.error('Error creating theory:', error);
      setError('Failed to create theory NFT');
    }
  };

  return (
    <>
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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
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

      {/* Create Theory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Create New Theory</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theory Title
                </label>
                <input
                  type="text"
                  value={theoryTitle}
                  onChange={(e) => setTheoryTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter theory title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theory Content
                </label>
                <textarea
                  value={theoryContent}
                  onChange={(e) => setTheoryContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter theory content"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theory Image (Optional)
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Choose Image
                  </button>
                  {selectedImage && (
                    <span className="text-sm text-gray-500">
                      {selectedImage.name}
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm mt-2">{error}</div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTheory}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? 'Creating...' : 'Create Theory'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}