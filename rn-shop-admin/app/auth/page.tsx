'use client';

import { authenticate } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';



const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

// Above is our zod object to help set our types and resolvers for email and password.



export default function Auth() {


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // Above we use our loginSchema type and resolvers in useForm to help set the funtionality and default values of our form.

  

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const router = useRouter();

  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    setIsAuthenticating(true);

    try {
      await authenticate(email, password);
      router.push('/admin');
    } catch (error) {
    } finally {
      setIsAuthenticating(false);
    }
  };
  

  // Above helps authenticate and push us to the next page whihc is /admin.
  // authenticate comes from actions directory.

  return (
    <div className='flex h-svh items-center justify-center'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input
                      id='email'
                      type='email'
                      placeholder='m@example.com'
                      {...field}
                      disabled={isAuthenticating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <div className='flex items-center'>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      disabled={isAuthenticating}
                      id='password'
                      type='password'
                      {...field}
                    />
                  </FormControl>{' '}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isAuthenticating}
              type='submit'
              className='w-full bg-blue-950 text-white'
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}


// Above we import different components and tools to build our form 
// shadcn/ui for  pre-built UI components ( form , button and input )
// react hook form handles form state management and validation.
// zod TypeScript-first schema declaration and validation
// zod resolver for integrating zod validation into react-hook-form.
// userouter for client-side navigation between pages