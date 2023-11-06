import { GetFormStats } from '@/actions/form';
import { FileText, MousePointerClick, Split, View } from 'lucide-react';
import StatCard from './StatCard';
import { Stat } from '@/app/(dashboard)/page';

export default async function Stats({ data }: { data: Stat[] }) {
  const stats: Awaited<ReturnType<typeof GetFormStats>> = await GetFormStats();
  const loading: boolean = false;

  return (
    <>
      {data.map((stat) => (
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
