import { X } from 'lucide-react';

import { useDesigner } from '@/context/DesignerContext';
import { FormElements } from './FormElements';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

  return (
    <div className={'flex flex-col p-2'}>
      <div className={'flex items-center justify-between'}>
        <p className={'text-foreground/70 text-sm'}>Field Properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            if (selectedElement) setSelectedElement(null);
          }}
        >
          <X size={16} />
        </Button>
      </div>
      <Separator className={'mb-4'} />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}
