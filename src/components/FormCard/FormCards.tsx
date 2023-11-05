import Link from 'next/link';
import { Form } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { ArrowRight, FileEdit, FileText, View } from 'lucide-react';

import { GetForms } from '@/actions/form';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';

export default async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
        />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={'flex items-center justify-between gap-2'}>
          <span className={'truncate font-bold'}>{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant={'destructive'}>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription
          className={
            'text-muted-foreground flex items-center justify-between text-sm'
          }
        >
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true
          })}
          {form.published && (
            <span className={'flex items-center gap-2'}>
              <View
                className={'text-muted-foreground'}
                size={16}
              />
              <span>{form.visits.toLocaleString()}</span>
              <FileText
                className={'text-muted-foreground'}
                size={16}
              />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={'text-muted-foreground h-[20px] truncate text-sm'}
      >
        {form.description || 'No description'}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button
            asChild
            variant={'secondary'}
            className={'text-muted-foreground text-md mt-2 w-full gap-2'}
          >
            <Link href={`/forms/${form.id}`}>
              View Submissions
              <ArrowRight size={12} />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant={'secondary'}
            className={'text-muted-foreground text-md mt-2 w-full gap-2'}
          >
            <Link href={`/builder/${form.id}`}>
              Edit Form
              <FileEdit size={12} />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function FormCardSkeleton() {
  return <Skeleton className={'border-primary/20 h-[190px] w-full border-2'} />;
}
