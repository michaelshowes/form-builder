import { GetFormById } from '@/actions/form';
import FormLinkShare from '@/components/FormLinkShare';
import Stats from '@/components/Stats/Stats';
import SubmissionsTable from '@/components/SubmissionsTable';
import VisitBtn from '@/components/VisitBtn';

export default async function FormDetailPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error('form not found');
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className='border-b border-muted py-10'>
        <div className='container flex justify-between'>
          <h1 className='truncate text-4xl font-bold'>{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className='border-b border-muted py-4'>
        <div className='container flex items-center justify-between gap-2'>
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div
        className={
          'container grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4'
        }
      >
        <Stats />
      </div>
      <div className={'container pt-10'}>
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}
