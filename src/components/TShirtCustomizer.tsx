import React, { useState } from 'react';
import { Shirt } from 'lucide-react';

interface TShirtCustomizerProps {
  onConfirm: (customization: { name: string; color: string; size: string }) => void;
  onSkip: () => void;
}

export function TShirtCustomizer({ onConfirm, onSkip }: TShirtCustomizerProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('black');
  const [size, setSize] = useState('L');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm({ name, color, size });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="bg-pink-400 p-6 text-white">
          <div className="mb-2 flex items-center justify-center">
            <Shirt className="h-12 w-12" />
          </div>
          <h2 className="text-center text-2xl font-bold">Congratulations!</h2>
          <p className="text-center text-pink-100">
            You spent over $30! Customize your free T-Shirt.
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6 flex justify-center">
            <div 
              className={`relative flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors duration-300`}
              style={{ backgroundColor: color === 'white' ? '#f3f4f6' : color }}
            >
              <Shirt 
                className={`h-40 w-40 ${color === 'white' ? 'text-gray-400' : 'text-white/20'}`} 
                strokeWidth={1}
              />
              <span 
                className={`absolute font-bold uppercase tracking-wider ${
                  color === 'white' || color === 'yellow' ? 'text-black' : 'text-white'
                }`}
                style={{ fontSize: '1.25rem' }}
              >
                {name || 'YOUR NAME'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name on Shirt
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={12}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-pink-300 p-2.5 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Color
                </label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full rounded-lg border border-pink-300 p-2.5 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                >
                  <option value="black">Black</option>
                  <option value="navy">Navy</option>
                  <option value="maroon">Maroon</option>
                  <option value="white">White</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-lg border border-pink-300 p-2.5 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                >
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">Extra Large</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onSkip}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                No Thanks
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-pink-500 px-4 py-2 font-medium text-white hover:bg-pink-600"
              >
                Claim Reward
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
