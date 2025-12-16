import { Outlet, Navigate, useOutletContext } from 'react-router';
import { Toaster } from '@/modules/shared/ui/toaster';
import type { AppContext } from '@/modules/shared/types';

export default function CMSLayout() {
  const context = useOutletContext<AppContext>();
  
  // Protect CMS routes
  if (!context.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Outlet context={context} />
      </div>
      <Toaster />
    </>
  );
}
