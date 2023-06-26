const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white relative">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default Spinner;
