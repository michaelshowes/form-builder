import { GetFormStats } from '@/actions/form';
import CreateFormBtn from '@/components/CreateFormBtn';
import FormCards, { FormCardSkeleton } from '@/components/FormCard/FormCards';
import StatCard from '@/components/Stats/StatCard';
import Stats from '@/components/Stats/Stats';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';

export type Stat = {
  title: string;
  icon: React.ReactNode;
  helperText: string;
  value: string;
  className: string;
};

export default async function Dashboard() {
  const stats: Awaited<ReturnType<typeof GetFormStats>> = await GetFormStats();

  const statList = [
    {
      title: 'Total Visits',
      icon: <LuView className={'text-blue-600'} />,
      helperText: 'All time form visits',
      value: stats?.visits.toLocaleString() || '',
      className: 'shadow-md shadow-blue-600'
    },
    {
      title: 'Total Submissions',
      icon: <FaWpforms className={'text-yellow-600'} />,
      helperText: 'All time form submissions',
      value: stats?.submissions.toLocaleString() || '',
      className: 'shadow-md shadow-yellow-600'
    },
    {
      title: 'Submission Rate',
      icon: <HiCursorClick className={'text-green-600'} />,
      helperText: 'Visits that result in a form submission',
      value: `${stats?.submissionRate.toLocaleString()}%` || '',
      className: 'shadow-md shadow-green-600'
    },
    {
      title: 'Bounce Rate',
      icon: <TbArrowBounce className={'text-red-600'} />,
      helperText: 'Visits that leave without submitting a form',
      value: `${stats?.bounceRate.toLocaleString()}%` || '',
      className: 'shadow-md shadow-red-600'
    }
  ];

  return (
    <div className={'container pt-4'}>
      <Suspense fallback={<StatCard loading />}>
        <div
          className={
            'grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4'
          }
        >
          <Stats data={statList} />
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
