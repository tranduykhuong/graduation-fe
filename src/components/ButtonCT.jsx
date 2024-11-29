import ReactLoading from 'react-loading';

const ButtonCT = ({ content, onClick, isLoading, isDisabled = false, className }) => {
  const handleOnClick = () => {
    if (isLoading || isDisabled) {
      return;
    }
    onClick();
  };
  return (
    <div
      className={
        isDisabled
        ? `w-full p-[10px] bg-[#d6fff3] text-[#8ad3bd] rounded-[14px] hover:scale-[1.01] cursor-default pointer-events-none`
        : `w-full p-[10px] bg-primary-linear-dark hover:bg-primary-linear rounded-[14px] cursor-pointer ${className}`
      }
      onClick={handleOnClick}
    >
      {isLoading ? (
        <div className="w-full flex justify-center">
          <ReactLoading type="spin" color="#fff" height={18} width={18} />
        </div>
      ) : (
        <p className="text-sm font-semibold text-white text-center">
          {content}
        </p>
      )}
    </div>
  );
};

export default ButtonCT;
