'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList>
        <TabsTrigger
          value={'light'}
          onClick={() => setTheme('light')}
        >
          <>
            <Sun className='h-[1.2rem] w-[1.2rem] transition-all' />
            <span className='sr-only'>Set Light Theme</span>
          </>
        </TabsTrigger>

        <TabsTrigger
          value={'dark'}
          onClick={() => setTheme('dark')}
        >
          <>
            <Moon className='h-[1.2rem] w-[1.2rem] transition-all' />
            <span className='sr-only'>Set Dark Theme</span>
          </>
        </TabsTrigger>

        <TabsTrigger
          value={'system'}
          onClick={() => setTheme('system')}
        >
          <>
            <Monitor className='h-[1.2rem] w-[1.2rem] transition-all' />
            <span className='sr-only'>Set System Theme</span>
          </>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
