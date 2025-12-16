import { useOutletContext } from 'react-router';
import { useForm } from 'react-hook-form';
import { Button } from '@/modules/shared/ui/button';
import { Input } from '@/modules/shared/ui/input';
import { Label } from '@/modules/shared/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/modules/shared/ui/card';
import { Link as LinkIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useToast } from '@/modules/shared/hooks/use-toast';
import type { AppContext } from '@/modules/shared/types';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const { socialLinks } = useOutletContext<AppContext>();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data);
    toast({
      title: "Message sent!",
      description: "Thank you for your message! I will get back to you soon.",
    });
    reset();
  };

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Send a Message</CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill out the form and I'll get back to you as soon as possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name
              </Label>
              <Input
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="bg-background text-foreground border-border"
              />
              {errors.name && (
                <p className="text-sm text-warning">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="bg-background text-foreground border-border"
              />
              {errors.email && (
                <p className="text-sm text-warning">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">
                Message
              </Label>
              <textarea
                id="message"
                rows={5}
                {...register('message', { required: 'Message is required' })}
                className="w-full px-3 py-2 bg-background text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.message && (
                <p className="text-sm text-warning">{errors.message.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <div>
          <h3 className="font-headline text-2xl font-bold mb-6 text-foreground">
            Connect With Me
          </h3>
          <div className="space-y-4">
            {socialLinks.filter(link => link.is_active).map((link) => {
              // @ts-ignore
              const Icon = LucideIcons[link.icon] || LinkIcon;
              return (
                <a
                  key={link.ID}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card rounded-lg hover:bg-muted transition-colors text-foreground"
                >
                  <Icon className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{link.platform}</p>
                    <p className="text-muted-foreground truncate max-w-[200px]">{link.url}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
