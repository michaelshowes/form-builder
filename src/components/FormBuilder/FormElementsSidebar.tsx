import { FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';

export default function FormElementsSidebar() {
  return (
    <div>
      {' '}
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
}
