import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDesigner } from '@/context/DesignerContext';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormElements } from './FormElements';

export default function PreviewDialogBtn() {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className={'gap-2'}
        >
          <Eye size={16} />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent
        className={
          'flex h-screen max-h-screen w-screen min-w-full flex-grow flex-col gap-0 p-0'
        }
      >
        <div className={'border-b px-4 py-2'}>
          <p className={'text-muted-foreground text-lg font-bold'}>
            Form Preview
          </p>
          <p className={'text-muted-foreground text-sm'}>
            This is what your form will look like to your users
          </p>
        </div>
        <div
          className={
            'bg-accent flex flex-grow flex-col items-center justify-center overflow-y-auto bg-[url(/paper.svg)] p-4 dark:bg-[url(/paper-dark.svg)]'
          }
        >
          <div
            className={
              'bg-background flex h-full w-full max-w-[620px] flex-grow flex-col  gap-4 overflow-y-auto rounded-3xl p-8'
            }
          >
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;

              return (
                <FormComponent
                  key={element.id}
                  elementInstance={element}
                />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
