import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoChevronBackCircleOutline } from 'react-icons/io5';

const PopupModal = ({ title, icon, onClose, onBack, errorStyle, children }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/40 z-[1000] flex items-center">
      <div className="w-[90%] relative bg-white m-auto rounded-[30px] p-6 max-w-[600px] overflow-y-auto max-h-[90vh] md:overflow-visible">
        {onBack && (
          <div
            className="flex gap-3 items-center mb-7 cursor-pointer hover:opacity-80"
            onClick={onBack}
          >
            <IoChevronBackCircleOutline className="w-5 h-5 text-primary" />
            <p className="text-dark text-sm font-medium">Back</p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="w-[36px] h-[36px] p-2 rounded-[8px]  flex items-center justify-center"></div>
          {icon ? (
            <div className={`w-[36px] h-[36px] p-2 rounded-[8px] flex items-center justify-center ${errorStyle ? 'bg-[#FF4C4C]' : 'bg-primary-linear-dark'}`}>
              {icon}
            </div>
            ) : (
              <h3 className="flex justify-center text-2xl font-[700] text-center text-[#11D097]">
                {title}
              </h3>
            )
          }
          {onClose ? (
            <IoIosCloseCircleOutline
              className="w-5 h-5 cursor-pointer"
              onClick={onClose}
            />
          ) : (
            <div className='w-9'></div>
          )}
        </div>
        {icon && (
          <h2 className="flex justify-center text-2xl font-bold text-center py-7 text-dark">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
};

export default PopupModal;
