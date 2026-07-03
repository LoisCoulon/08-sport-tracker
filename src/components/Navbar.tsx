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
    <nav className="bg-[#111111] border-b border-[#2a2a2f] px-6 py-3 flex items-center justify-between">
      <span className="text-white font-semibold text-lg tracking-tight">
        Sport tracker
      </span>
      <div className="flex gap-6">
        <button
          className="text-white font-semibold text-sm tracking-tight"
          onClick={handleSignOut}
        >
          Déconnexion
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </nav>
  );
}
