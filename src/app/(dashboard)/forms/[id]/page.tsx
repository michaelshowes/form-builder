import { GetFormById } from '@/actions/form';
import FormLinkShare from '@/components/FormLinkShare';
import Stats from '@/components/Stats/Stats';
import SubmissionsTable from '@/components/SubmissionsTable';
import VisitBtn from '@/components/VisitBtn';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';

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

  const statList = [
    {
      title: 'Total Visits',
      icon: <LuView className={'text-blue-600'} />,
      helperText: 'All time form visits',
      value: visits.toLocaleString() || '',
      className: 'shadow-md shadow-blue-600'
    },
    {
      title: 'Total Submissions',
      icon: <FaWpforms className={'text-yellow-600'} />,
      helperText: 'All time form submissions',
      value: submissions.toLocaleString() || '',
      className: 'shadow-md shadow-yellow-600'
    },
    {
      title: 'Submission Rate',
      icon: <HiCursorClick className={'text-green-600'} />,
      helperText: 'Visits that result in a form submission',
      value: `${submissionRate.toLocaleString()}%` || '',
      className: 'shadow-md shadow-green-600'
    },
    {
      title: 'Bounce Rate',
      icon: <TbArrowBounce className={'text-red-600'} />,
      helperText: 'Visits that leave without submitting a form',
      value: `${bounceRate.toLocaleString()}%` || '',
      className: 'shadow-md shadow-red-600'
    }
  ];

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
        <Stats data={statList} />
      </div>
      <div className={'container pt-10'}>
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}
