import NothingFooter from './NothingFooter';

const footersMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  '/': NothingFooter,
  '/_error': NothingFooter,
  '/login': NothingFooter,
  '/register': NothingFooter,
  '/chat': NothingFooter,
  '/demo': NothingFooter,
};

// Función para determinar qué footer usar en función de la ruta
const getFooter = (pathname: string): React.FC<{ children: JSX.Element }> => {
  if (pathname.startsWith('/chat/')) {
    return NothingFooter;
  }
  return footersMap[pathname] || NothingFooter;
};

export default getFooter;
