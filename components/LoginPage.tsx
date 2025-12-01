import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../utils/supabase/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        // Show error if wrong credentials
        toast.error('Login Failed', {
          description: error.message || 'Invalid email or password'
        });
        return;
      }

      // Success! Get user's role and navigate
      toast.success('Login Successful', {
        description: 'Redirecting to your dashboard...'
      });

      // Navigation will be handled by AuthContext automatically
    } catch (err: any) {
      toast.error('Error', {
        description: err.message || 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-[#d4af37] hover:bg-transparent"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Access your private account</p>
        </div>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Login</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-[#2a2a2a] text-white placeholder:text-gray-600"
                  required
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-gray-400 hover:text-[#d4af37] hover:bg-transparent"
                onClick={() => toast.info('Password Reset', { description: 'Contact support for password reset' })}
              >
                Forgot Password?
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#2a2a2a] text-center">
              <p className="text-gray-400 mb-3">Don't have an account?</p>
              <Button
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                onClick={() => navigate('/apply')}
              >
                Request Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}