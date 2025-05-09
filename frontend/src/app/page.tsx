'use client';

import Navbar from '@/components/Navbar';
import TheoryCard from '@/components/TheoryCard';

const SAMPLE_THEORIES = [
  {
    address: '0x7Fc...3B2a',
    timeAgo: '2 hours ago',
    title: 'The real reason behind the global chip shortage',
    description: "What if the global chip shortage isn't about supply chain issues but about preparing for a massive AI infrastructure rollout that the public isn't supposed to know about yet?",
    tags: [
      { name: 'Technology' },
      { name: 'AI' },
      { name: 'Global' }
    ],
    verifications: 423,
    debunks: 89
  },
  {
    address: '0x3Ae...9F1c',
    timeAgo: '5 hours ago',
    title: 'Decentralized identities are being tracked by a central authority',
    description: "I've been analyzing blockchain transactions and found patterns suggesting that a single entity is mapping and correlating decentralized identities across multiple chains.",
    tags: [
      { name: 'Blockchain' },
      { name: 'Privacy' },
      { name: 'Identity' }
    ],
    verifications: 256,
    debunks: 45
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Conspiracy Theories</h1>
          <p className="text-gray-600">Explore and evaluate theories from the community</p>
        </div>

        <div className="space-y-6">
          {SAMPLE_THEORIES.map((theory, index) => (
            <TheoryCard
              key={index}
              {...theory}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
