import { useDesigner } from '@/context/DesignerContext';
import { FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';
import FormElementsSidebar from './FormElementsSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';

export default function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside
      className={
        'bg-background border-muted flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 p-4'
      }
    >
      {!selectedElement ? <FormElementsSidebar /> : <PropertiesFormSidebar />}
    </aside>
  );
}
