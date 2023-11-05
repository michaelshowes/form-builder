import { UpdateFormContent } from '@/actions/form';
import { Button } from '@/components/ui/button';
import { useDesigner } from '@/context/DesignerContext';
import { Save } from 'lucide-react';
import { useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast } from '../ui/use-toast';

export default function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
      toast({
        title: 'Success',
        description: 'Form saved successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Form could not be saved',
        variant: 'destructive'
      });
    }
  };

  return (
    <Button
      variant={'outline'}
      className={'gap-2'}
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <Save size={16} />
      Save
      {loading && <FaSpinner className={'animate-spin'} />}
    </Button>
  );
}
