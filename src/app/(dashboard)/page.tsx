import CreateFormBtn from '@/components/CreateFormBtn';
import FormCards, { FormCardSkeleton } from '@/components/FormCard/FormCards';
import StatCard from '@/components/Stats/StatCard';
import Stats from '@/components/Stats/Stats';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div className={'container pt-4'}>
      <Suspense fallback={<StatCard loading />}>
        <div
          className={
            'grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4'
          }
        >
          <Stats />
        </div>
      </Suspense>
      <Separator className={'my-6'} />
      <h2 className={'col-span-2 text-4xl font-bold'}>Your Forms</h2>
      <Separator className={'my-6'} />
      <div className={'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'}>
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
