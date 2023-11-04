import Navbar from '@/components/global/Navbar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        'bg-background flex max-h-screen min-h-screen min-w-full flex-col'
      }
    >
      <Navbar />
      <main className={'flex w-full flex-grow'}>{children}</main>
    </div>
  );
}
