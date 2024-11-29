import React, { useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';

const InputCT = ({ title, placeholder, type, onChange, onBlur, error = false, invalidity = false, value, errorMsg = "" }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocus] = useState(false);
  const [pwChangeType, setPwChangeType] = useState(type);

  const handleChangeType = () => {
    setIsPasswordVisible((prevState) => !prevState);

    if (pwChangeType === 'password') {
      setPwChangeType('text');
    } else {
      setPwChangeType('password');
    }
  };

  return (
    <div>
      <h4 className="text-base text-black font-medium font-stylescript">{title}</h4>

      <div className="w-full text-5 flex items-start self-stretch pt-[0.1875rem] pb-[0.1875rem] px-0 search-2 font-['Inter'] text-sm font-medium leading-[150%] relative">
        <input
          className={`text-sm text-black font-normal py-1 px-2 border-b text-center ${isPasswordFocused ? (invalidity || error ? 'border-[#FF4C4C]' : 'border-[#11D097]') : 'border-[#F6F6F6]'} text-dark outline-none w-full placeholder-color-gray bg-transparent`}
          type={pwChangeType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur ? () => {
            onBlur();
            setIsPasswordFocus(false);
          } : () => setIsPasswordFocus(false)}
          onFocus={() => setIsPasswordFocus(true)}
        />

        {type === 'password' && (
          <div className="absolute -right-3 -top-1 cursor-pointer">
            {isPasswordVisible ? (
              <GoEyeClosed
                onClick={handleChangeType}
                style={{
                  right: '15px',
                  top: '22px',
                  position: 'absolute',
                }}
              />
            ) : (
              <GoEye
                onClick={handleChangeType}
                style={{
                  right: '15px',
                  top: '22px',
                  position: 'absolute',
                }}
              />
            )}
          </div>
        )}
      </div>
      <p className='text-[#FF4C4C] text-xs'>{errorMsg}</p>
    </div>
  );
};

export default InputCT;
