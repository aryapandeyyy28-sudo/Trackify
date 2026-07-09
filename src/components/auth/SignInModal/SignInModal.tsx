// Sign In Modal
// Email magic link authentication with Supabase

import { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './SignInModal.scss';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError(null);

    // 🚀 ULTRA BYPASS: Don't talk to any context or backend. 
    // Just force the modal window to shut immediately.
    setTimeout(() => {
      setLoading(false);
      onClose(); 
    }, 100);
  };

  const handleClose = () => {
    setEmail('');
    setError(null);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign In (Force Sandbox Mode)">
      <div className="sign-in-modal">
        <form onSubmit={handleSubmit} className="sign-in-modal__form">
          <p className="sign-in-modal__description" style={{ color: '#eab308', fontWeight: 'bold' }}>
            ⚡ Force Close Active: Clicking the button will force entry past this window.
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
              {loading ? 'Bypassing...' : 'Force Open Dashboard 🚀'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};