import { useEffect } from 'react';


import { SubmitHandler } from 'react-hook-form';
// Above is SubmitHandler for typing form submission 

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Above are ui components from shadcn 


import { CreateCategorySchema } from '@/app/admin/categories/create-category.schema';

// Above we import the type for our category schema.


export const CategoryForm = ({
  form,
  onSubmit,
  defaultValues,
}: {
  form: any;
  onSubmit: SubmitHandler<CreateCategorySchema>;
  defaultValues: CreateCategorySchema | null;

  // Above are props and their types for this component.
}) => {
  const isSubmitting = form.formState.isSubmitting;

  // Above gets the state of the form 

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({ name: '', image: undefined });
    }
  }, [defaultValues, form]);


  // Above useEffect checks if we are editing a form.
  // If default value changes we reset the form to have those default values.
  // dependecies for this effect are defaultValues and form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder='Name' {...field} />
              </FormControl>
              <FormDescription>Category Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  {...form.register('image')}
                  onChange={event => {
                    field.onChange(event.target.files?.[0]);
                  }}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>Category Image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type='submit' variant='outline'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

// Above we build a form component, with shadcn library, that accepts three props ( form , defaultValues and an onSubmit function)
// we spread our form object within our shadcn component
// we handle onsubmit within our regular html form semantic element
// with uploaded files we must explicitly register the field and manually handle file input to extract the first file and pass it to React Hook Form's state
// inputs for strings and files are handeled different in react hook form 
// ex. the name and image field above 