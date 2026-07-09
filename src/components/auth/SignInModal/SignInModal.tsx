// Sign In Modal
// Email magic link authentication with Supabase

import { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useAuth } from '../../../context/AuthContext';
import './SignInModal.scss';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  const { signIn } = useAuth(); // Keeps the hook active so other files don't break
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 🚀 HARDCODED BYPASS: Automatically trigger a successful sign-in locally
      await signIn(email); 
      
      setLoading(false);
      handleClose(); // Instantly close the modal and log the user into the tracker!
    } catch (err) {
      setLoading(false);
      setError('Sandbox bypass login failed');
    }
  };

  const handleClose = () => {
    setEmail('');
    setError(null);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign In (Sandbox Mode)">
      <div className="sign-in-modal">
        <form onSubmit={handleSubmit} className="sign-in-modal__form">
          <p className="sign-in-modal__description" style={{ color: '#3b82f6', fontWeight: 'bold' }}>
            🛠️ Sandbox Bypass Active: Enter any email to access the app instantly.
          </p>

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="demo@example.com"
            disabled={loading}
            error={error || undefined}
            autoFocus
          />

          {error && <p className="sign-in-modal__error">{error}</p>}

          <div className="sign-in-modal__actions">
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !email.trim()}
            >
              {loading ? 'Logging in...' : 'Instant Developer Login 🚀'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};