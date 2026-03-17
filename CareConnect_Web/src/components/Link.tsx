import { useApp } from '../context/AppContext';

interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const Link = ({ to, className, children }: LinkProps) => {
  const { navigate } = useApp();

  return (
    <button
      onClick={() => navigate(to)}
      className={className}
    >
      {children}
    </button>
  );
};
