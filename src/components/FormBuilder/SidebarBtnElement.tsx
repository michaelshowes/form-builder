'use client';

import { useDraggable } from '@dnd-kit/core';

import { Button } from '@/components/ui/button';
import { FormElement } from './FormElements';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function SidebarBtnElement({
  formElement
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true
    }
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Button
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      variant={'outline'}
      className={cn(
        'flex h-[120px] w-[120px] cursor-grab flex-col gap-2',
        draggable.isDragging && 'ring-primary ring-2'
      )}
    >
      <Icon className={'text-primary h-8 w-8 cursor-grab'} />
      <p className={'text-xs'}>{label}</p>
    </Button>
  );
}

export function SidebarBtnElementDragOverlay({
  formElement
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtn: true
    }
  });

  return (
    <Button
      variant={'outline'}
      className={'flex h-[120px] w-[120px] cursor-grab flex-col gap-2'}
    >
      <Icon className={'text-primary h-8 w-8 cursor-grab'} />
      <p className={'text-xs'}>{label}</p>
    </Button>
  );
}
