import { useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';

import { FormElementInstance, FormElements } from './FormElements';
import { Button } from '@/components/ui/button';
import { useDesigner } from '@/context/DesignerContext';
import { cn } from '@/lib/utils';

export default function DesignerElementWrapper({
  element
}: {
  element: FormElementInstance;
}) {
  const DesignerElement = FormElements[element.type].designerComponent;

  const { removeElement, selectedElement, setSelectedElement } = useDesigner();

  const [mouseIsOver, setMouseIsOver] = useState(false);

  const topHalf = useDroppable({
    id: `${element.id}-top`,
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalf: true
    }
  });

  const bottomHalf = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalf: true
    }
  });

  const draggable = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true
    }
  });

  if (draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      className={
        'text-foreground ring-accent relative flex h-[120px] flex-col rounded-md ring-1 ring-inset hover:cursor-pointer'
      }
    >
      <div
        ref={topHalf.setNodeRef}
        className={'absolute h-1/2 w-full rounded-t-md'}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className={'absolute bottom-0 h-1/2 w-full rounded-b-md'}
      ></div>
      {mouseIsOver && (
        <>
          <div className={'absolute right-0 h-full'}>
            <Button
              variant={'outline'}
              className={
                'flex h-full justify-center rounded-md rounded-l-none border bg-red-500'
              }
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Trash2 />
            </Button>
          </div>
          <div
            className={
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'
            }
          >
            <p className={'text-muted-foreground text-sm'}>
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div
          className={
            'bg-primary absolute top-0 h-[7px] w-full rounded-md rounded-b-none'
          }
        />
      )}
      {bottomHalf.isOver && (
        <div
          className={
            'bg-primary absolute bottom-0 h-[7px] w-full rounded-md rounded-t-none'
          }
        />
      )}
      <div
        className={cn(
          'bg-accent/40 pointer-events-none flex h-[120px] w-full items-center rounded-md px-4 py-2 opacity-100',
          mouseIsOver && 'opacity-30'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}
