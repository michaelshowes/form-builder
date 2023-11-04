import { UserButton } from '@clerk/nextjs';
import ThemeSwitcher from '../ThemeSwitcher';
import Logo from '../Logo';

export default function Navbar() {
  return (
    <nav
      className={
        'border-border flex h-[60px] items-center justify-between border-b px-4 py-2'
      }
    >
      <Logo />
      <div className={'flex items-center gap-4'}>
        <ThemeSwitcher />
        <UserButton afterSignOutUrl={'/'} />
      </div>
    </nav>
  );
}
