interface Props {
  children: JSX.Element;
}

const NothingLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex items-center justify-center w-screen">
      {children}
    </div>
  );
};

export default NothingLayout;
