const Loader = ({ color }) => {
  const classes = 'h-2.5 w-2.5 bg-current rounded-full';

  return (
    <div className="flex  justify-center items-center">
      <div className={`${classes}  mt-0 mb-auto mr-1 animate-bounce ${color ? color : ''}`}></div>
      <div
        className={`${classes}  mt-0 mb-auto mr-1 animate-bounce200 ${color ? color : ''}`}></div>
      <div className={`${classes}   mt-0 mb-auto animate-bounce400 ${color ? color : ''}`}></div>
    </div>
  );
};

export default Loader;
