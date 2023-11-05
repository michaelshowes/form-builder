'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { FormSchemaType, formSchema } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PulseLoader } from 'react-spinners';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { CreateForm } from '@/actions/form';
import { FilePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateFormBtn() {
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  async function onSubmit(values: FormSchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: 'Success',
        description: 'Form created successfully'
      });
      router.push(`/builder/${formId}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong while creating the form',
        variant: 'destructive'
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className={
            'border-primary/20 hover:border-primary group flex h-[190px] flex-col items-center justify-center gap-4 border border-dashed'
          }
        >
          <FilePlus
            className={'text-muted-foreground group-hover:text-primary h-8'}
          />
          <p
            className={
              'text-muted-foreground group-hover:text-primary text-xl font-bold'
            }
          >
            Create New Form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'space-y-2'}
          >
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'description'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={() => form.handleSubmit(onSubmit)()}
            disabled={form.formState.isSubmitting}
            className={'mt-4 w-full'}
          >
            {!form.formState.isSubmitting ? (
              <span>Save</span>
            ) : (
              <PulseLoader
                color='#344155'
                margin={10}
              />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
