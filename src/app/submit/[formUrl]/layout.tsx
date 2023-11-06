import Logo from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        'flex h-screen max-h-screen min-h-screen min-w-full flex-col bg-background'
      }
    >
      <nav
        className={
          'flex h-[60px] items-center justify-between border-b border-border px-4 py-2'
        }
      >
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className={'flex w-full flex-grow'}>{children}</main>
    </div>
  );
}
