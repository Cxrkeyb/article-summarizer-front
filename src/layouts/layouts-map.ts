import NothingLayout from './nothing';
import PrincipalLayout from './principal';

const layoutsMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  '/': NothingLayout,
  '/_error': NothingLayout,
  '/login': NothingLayout,
  '/register': NothingLayout,
  '/chat': PrincipalLayout,
  '/chat/:id': PrincipalLayout,
  '/demo': NothingLayout,
};

export default layoutsMap;
