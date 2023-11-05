import { CgSpinner } from 'react-icons/cg';

export default function Loading() {
  return (
    <div className={'flex h-full w-full items-center justify-center'}>
      <CgSpinner
        className={'animate-spin'}
        size={64}
      />
    </div>
  );
}
