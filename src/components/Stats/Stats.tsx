import { GetFormStats } from '@/actions/form';
import { FileText, MousePointerClick, Split, View } from 'lucide-react';
import StatCard from './StatCard';

export default async function Stats() {
  const stats: Awaited<ReturnType<typeof GetFormStats>> = await GetFormStats();
  const loading: boolean = false;

  const statList = [
    {
      title: 'Total Visits',
      icon: (
        <View
          className={'text-blue-600'}
          size={16}
        />
      ),
      helperText: 'All time form visits',
      value: stats?.visits.toLocaleString() || '',
      className: 'shadow-md shadow-blue-600'
    },
    {
      title: 'Total Submissions',
      icon: (
        <FileText
          className={'text-yellow-600'}
          size={16}
        />
      ),
      helperText: 'All time form submissions',
      value: stats?.submissions.toLocaleString() || '',
      className: 'shadow-md shadow-yellow-600'
    },
    {
      title: 'Submission Rate',
      icon: (
        <MousePointerClick
          className={'text-green-600'}
          size={16}
        />
      ),
      helperText: 'Visits that result in a form submission',
      value: `${stats?.submissionRate.toLocaleString()}%` || '',
      className: 'shadow-md shadow-green-600'
    },
    {
      title: 'Bounce Rate',
      icon: (
        <Split
          className={'text-red-600'}
          size={16}
        />
      ),
      helperText: 'Visits that leave without submitting a form',
      value: `${stats?.bounceRate.toLocaleString()}%` || '',
      className: 'shadow-md shadow-red-600'
    }
  ];

  return (
    <>
      {statList.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          icon={stat.icon}
          helperText={stat.helperText}
          value={stat.value}
          loading={loading}
          className={stat.className}
        />
      ))}
    </>
  );
}
