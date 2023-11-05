'use client';

import { Form } from '@prisma/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CgSpinner } from 'react-icons/cg';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Confetti from 'react-confetti';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';

import Designer from './Designer';
import SaveFormBtn from './SaveFormBtn';
import PreviewDialogBtn from './PreviewDialogBtn';
import PublishFormBtn from './PublishFormBtn';
import DragOverlayWrapper from './DragOverlayWrapper';
import { useDesigner } from '@/context/DesignerContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function FormBuilder({ form }: { form: Form }) {
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5
    }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10
    }
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);

    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady]);

  if (!isReady) {
    return (
      <div
        className={'flex h-full w-full flex-col items-center justify-center'}
      >
        <CgSpinner className={'h-12 w-12 animate-spin'} />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
        <div
          className={'flex h-full w-full flex-col items-center justify-center'}
        >
          <div className={'max-w-md'}>
            <h1
              className={
                'mb-10 border-b pb-2 text-center text-4xl font-bold text-primary'
              }
            >
              Form Published
            </h1>
            <h2 className={'text-2xl'}>Share this form</h2>
            <p className={'text-md border-b pb-10 text-muted-foreground'}>
              Anyone with the link can view and submit the form
            </p>
            <div
              className={
                'my-4 flex w-full flex-col items-center gap-2 border-b pb-4'
              }
            >
              <Input
                className={'w-full'}
                readOnly
                value={shareUrl}
              />
              <Button
                className={'mt-2 w-full'}
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: 'Copied!',
                    description: 'Form link copied to clipboard'
                  });
                }}
              >
                Copy Link
              </Button>
            </div>
            <div className={'flex justify-between'}>
              <Button
                variant={'link'}
                asChild
              >
                <Link
                  href={'/'}
                  className={'gap-2'}
                >
                  <BsArrowLeft />
                  Go back home
                </Link>
              </Button>

              <Button
                variant={'link'}
                asChild
              >
                <Link
                  href={`/forms/${form.id}`}
                  className={'gap-2'}
                >
                  Form Details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className={'flex w-full flex-col'}>
        <div className={'flex items-center justify-between border-b-2 p-4'}>
          <h2 className={'truncate font-medium'}>
            <span className={'mr-2 text-muted-foreground'}>Form:</span>
            {form.name}
          </h2>
          <nav className={'flex items-center gap-2'}>
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </nav>
        </div>
        <div
          className={
            'relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'
          }
        >
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
