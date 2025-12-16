import { useState } from 'react';
import { useNavigate } from 'react-router';
import { setupSystem } from '@/modules/shared/api/system';
import { Button } from '@/modules/shared/ui/button';
import { Input } from '@/modules/shared/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/modules/shared/ui/card';
import { Label } from '@/modules/shared/ui/label';

export default function InitPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    site_name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await setupSystem(formData);
      // Force reload or redirect to login
      window.location.href = '/auth/login'; 
    } catch (err: any) {
      setError(err.response?.data?.error || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Your Portfolio</CardTitle>
          <CardDescription>Let's get your site set up. Create your admin account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">Site Name</Label>
              <Input
                id="site_name"
                value={formData.site_name}
                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                placeholder="My Awesome Portfolio"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Admin Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
