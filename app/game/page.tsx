'use client'

import Component from '@/system/component';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Module Demo</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <Component />
        </div>
      </div>
    </main>
  )
}
