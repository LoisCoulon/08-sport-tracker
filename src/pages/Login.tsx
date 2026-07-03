import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input type="text" placeholder="email" onChange={handleEmailChange} />
      <input
        type="password"
        placeholder="mot de passe"
        onChange={handlePasswordChange}
      />
      <button onClick={handleSignIn}>Valider</button>
    </div>
  );
}
