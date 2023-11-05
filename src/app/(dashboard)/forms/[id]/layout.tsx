export default function BuilderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={'mx-auto flex w-full flex-grow flex-col'}>{children}</div>
  );
}
