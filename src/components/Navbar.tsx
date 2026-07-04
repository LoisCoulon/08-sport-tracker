import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useState } from 'react';

export default function Navbar() {
  const { signOut } = useAuth();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <nav className="bg-linear-to-r from-[#1a0a0a] via-[#141414] to-[#1a0a0a] border-b border-[#2a2a2a] px-8 py-4 flex items-center justify-between">
      <span className="text-white font-bold text-2xl tracking-tight">
        Sport Tracker
      </span>
      <div className="flex items-center gap-6">
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button
          className="bg-transparent border border-gray-600 hover:border-white text-white text-sm font-medium px-4 py-1.5 rounded transition-colors"
          onClick={handleSignOut}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
