import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from '../../utils/supabase/client';
import { Alert, AlertDescription } from './ui/alert';

interface LoginPageProps {
  onLogin: (role: 'client' | 'broker' | 'admin') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'broker' | 'admin'>('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError('Login failed. Please try again.');
        setLoading(false);
        return;
      }

      // Step 2: Check if user exists in users table and verify role
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, role, status')
        .eq('id', authData.user.id)
        .single();

      if (userError || !userData) {
        setError('User account not found. Please contact support.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // Step 3: Verify user status is active
      if (userData.status !== 'active') {
        setError('Your account is not active. Please contact support.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // Step 4: Verify role matches
      if (userData.role !== role) {
        setError(`This account is registered as a ${userData.role}. Please select the correct role.`);
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // Success! Call parent login handler
      onLogin(role);
      
      // Navigate based on role
      if (role === 'client') {
        navigate('/client/dashboard');
      } else if (role === 'broker') {
        navigate('/broker/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
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
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">Login As</Label>
                <Select value={role} onValueChange={(value: 'client' | 'broker' | 'admin') => setRole(value)}>
                  <SelectTrigger className="bg-black/50 border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="client" className="text-white focus:bg-[#2a2a2a] focus:text-white">Client</SelectItem>
                    <SelectItem value="broker" className="text-white focus:bg-[#2a2a2a] focus:text-white">Broker</SelectItem>
                    <SelectItem value="admin" className="text-white focus:bg-[#2a2a2a] focus:text-white">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#d4af37] hover:bg-[#c19b2b] text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Login'}
              </Button>

              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-gray-400 hover:text-[#d4af37] hover:bg-transparent"
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