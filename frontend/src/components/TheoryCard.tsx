interface Tag {
  name: string;
  className?: string;
}

interface TheoryCardProps {
  address: string;
  timeAgo: string;
  title: string;
  description: string;
  tags: Tag[];
  verifications: number;
  debunks: number;
}

export default function TheoryCard({
  address,
  timeAgo,
  title,
  description,
  tags,
  verifications,
  debunks,
}: TheoryCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-xs">0x</span>
        </div>
        <span className="text-gray-600 text-sm">{address}</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-400 text-sm">{timeAgo}</span>
      </div>

      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm ${tag.className || 'bg-gray-100 text-gray-600'}`}
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Verify ({verifications})</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Debunk ({debunks})</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 