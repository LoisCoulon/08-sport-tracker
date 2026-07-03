import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSignUp() {
    try {
      await signUp(email, password);
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
      <button onClick={handleSignUp}>Valider</button>
    </div>
  );
}
