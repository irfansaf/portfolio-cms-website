import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router';
import { register as registerUser } from '@/modules/auth/api';
import type { RegisterRequest } from '@/modules/shared/types/auth'; // Ensure this matches types/auth.ts
import { Button } from '@/modules/shared/ui/button';
import { Input } from '@/modules/shared/ui/input';
import { Label } from '@/modules/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/modules/shared/ui/card';

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await registerUser(data);
      navigate('/login'); // Redirect to login after registration
    } catch (err: any) {
       // safer error accessing
      const msg = err.message || 'Registration failed';
      setError(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>CMS Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register('username', { required: true })} />
              {errors.username && <span className="text-red-500 text-sm">Username is required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email', { required: true })} />
              {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password', { required: true })} />
              {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">Already have an account? Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
