import React, { useEffect, useRef, useState } from 'react';
import PopupModal from '@/components/PopupModal'
import InputCT from '@/components/InputCT'
import ButtonCT from '@/components/ButtonCT'
import RelationshipSelect from '@/components/RelationshipSelect'
import { Toaster } from 'react-hot-toast';
import Home from '../Home/Home';

const Begin = () => {
	const [last3phone, setLast3phone] = useState('')
  const [last3phoneError, setLast3phoneError] = useState('')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [email, setEmail] = useState('')
  const [relationship, setRelationship] = useState('')

  const [oldData, setOldData] = useState(false)
  const [path, setPath] = useState('/')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenReset, setIsOpenReset] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const copos = [1,2,3,4]

  const postData = async (body) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_END_POINT}/graduation/wishers/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        alert('Có lỗi xảy ra, liên hệ Khương nha');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      alert('Có lỗi xảy ra, liên hệ Khương nha');
    }
  };

  const handleSubmit = async () => {
    if (name.length === 0) {
      setNameError('Vui lòng nhập tên của bạn')
    } else {
      setNameError('')
    }

    if (last3phone.length === 0) {
      setLast3phoneError('Vui lòng nhập 3 số cuối điện thoại hoặc nick-name của bạn')
    } else {
      setLast3phoneError('')
    }

    if (!name || !last3phone) return

    if (window.location.pathname === '/' && localStorage.getItem('key')) {
      window.location.href = localStorage.getItem('key')
    } else {
      const body = {
        name: name,
        last3phone: last3phone,
        relationship: relationship,
      };

      setIsLoading(true)
      const response = await postData(body);
      setIsLoading(false)
      if (response) {
        console.log('Response received:', response);
        window.location.href = `/${response.data.key}`
      }
    }
  }

  const handleReset = () => {
    localStorage.clear()
    setIsOpenReset(false)
    setLast3phone('')
    setName('')
    setRelationship('')
  }

  const fetchData = async (path) => {
    console.log("path ", path);
    if (path === '/') return;

    try {
      const response = await fetch(`${import.meta.env.VITE_END_POINT}/graduation/wishers${path}`);
      if (!response.ok) {
        return
      }
      const data = await response.json();
      setName(data.data.name)
      setLast3phone(data.data.last3phone)
      setRelationship(data.data.relationship)
      setOldData(true)
    } catch (error) {
      console.error('Error fetching data:', error);
      return
    }
  };

  useEffect(() => {
    fetchData(path);
  }, [path])

  useEffect(() => {
    console.log(window.location.pathname);

    // Send
    if (window.location.pathname !== '/') {
      setPath(window.location.pathname)
      localStorage.setItem('key', window.location.pathname)
    }
    // Standard
    else if (localStorage.getItem('key')) {
      setPath(localStorage.getItem('key'))
      setIsOpenModal(true)
      setIsOpenReset(true)
    }
    else {
      setPath(window.location.pathname)
      setIsOpenModal(true)
    }
  }, [])


  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const enableAudio = () => {
      audio.muted = false;
      audioRef.current.volume = "0.4"
      audio.play().catch((error) => console.log("Auto play error:", error));


      document.removeEventListener("scroll", enableAudio);
    };

    // Lắng nghe sự kiện click hoặc scroll
    document.addEventListener("click", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, []);

	return (
		<div className='min-h-[100vh] relative'>
      <Toaster />

      <ul id='nevar'>
        {copos.map(() => (
          <>
            <li className='copos c1' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❄</li>
            <li className='copos c2' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❉</li>
            <li className='copos c3' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❋</li>
            <li className='copos c4' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❅</li>
            <li className='copos c5' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❋</li>
            <li className='copos c6' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❅</li>
            <li className='copos c7' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❉</li>
            <li className='copos c8' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❄</li>
            <li className='copos c9' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❄</li>
            <li className='copos c10' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❉</li>
            <li className='copos c11' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❋</li>
            <li className='copos c12' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❅</li>
            <li className='copos c13' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❋</li>
            <li className='copos c14' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❅</li>
            <li className='copos c15' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❉</li>
            <li className='copos c16' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❄</li>
          </>
        ))}
      </ul>

      {isOpenModal ? (
        <div>
          <PopupModal
            title="Xin chào"
          >
            <p className='text-base pt-8 pb-8 text-[#27c595e0]'>Chào bạn, mình là <strong>Trợ lý Ekila</strong>. {oldData ? <span className='text-[#f98344e0]'>Dưới đây là thông tin của bạn đúng không, nếu không hãy Nhấn vào nút Tạo mới nhé!</span> : "Trước khi xem trang đỉnh nóc, kịch trần thì cho mình xin xíu thông tin nha!"}</p>

            <div className='absolute top-1 right-2 md:-right-5 md:-top-20'>
              <img className='h-[90px] md:h-40' src='https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fbot.png?alt=media' />
            </div>

            <div className='px-5 max-w-[400px] m-auto'>
              <InputCT
                title="Cho mình xin tên nè"
                placeholder="Duy Khương"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                errorMsg={nameError}
              />
              <br />
              <InputCT
                title="Xin luôn 3 số cuối điện thoại hoặc nick-name nha"
                placeholder="789"
                type="text"
                value={last3phone}
                onChange={(e) => setLast3phone(e.target.value)}
                errorMsg={last3phoneError}
              />
              <br />
              <RelationshipSelect
                selectedRelationship={relationship}
                setSelectedRelationship={setRelationship}
              />
              {/* <br />
              <InputCT
                title="Email nữa nha (mình sẽ nhắc bạn qua email khi gần đến ngày lễ nè)"
                placeholder="youremail@gmail.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> */}
              <br />
              <ButtonCT
                content="Bắt đầu thôi"
                className="mb-2"
                onClick={handleSubmit}
                isLoading={isLoading}
              />
              {isOpenReset && <ButtonCT
                content="Tạo mới"
                className="!bg-gradient-to-r from-purple-400 to-pink-400"
                onClick={handleReset}
              />}
            </div>
          </PopupModal>
        </div>
      ) : (
        <Home />
      )}

      <audio ref={audioRef} muted loop>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fnhac.mp3?alt=media"
          type="audio/mpeg"
        />
      </audio>
    </div>
	);
}

export default Begin;

