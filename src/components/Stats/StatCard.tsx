import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type StatCardProps = {
  title?: string;
  icon?: React.ReactNode;
  helperText?: string;
  value?: string;
  loading: boolean;
  className?: string;
};

export default function StatCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className
}: StatCardProps) {
  return (
    <Card className={className}>
      <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
        <CardTitle className={'text-muted-foreground text-sm font-medium'}>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={'text-2xl font-bold'}>
          {loading ? (
            <Skeleton>
              <span className={'opacity-0'}>0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
        <p className={'text-muted-foregroun pt-1 text-xs'}>{helperText}</p>
      </CardContent>
    </Card>
  );
}
