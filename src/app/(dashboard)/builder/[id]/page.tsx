import { GetFormById } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder/FormBuilder';

export default async function BuilderPage({
  params
}: {
  params: { id: string };
}) {
  const form = await GetFormById(Number(params.id));
  if (!form) {
    throw new Error('Form not found');
  }

  return <FormBuilder form={form} />;
}
