import React, { useEffect, useState } from 'react';
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
      console.log('Fetched data:', data);
      setName(data.data.name)
      setLast3phone(data.data.last3phone)
      setRelationship(data.data.relationship)
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

	return (
		<>
      {isOpenModal ? (
        <div>
          <PopupModal
            title="Xin chào"
          >
            <p className='text-base pt-8 pb-8 text-[#27c595e0]'>Chào bạn, mình là <strong>Trợ lý Ekila</strong>. Trước khi xem trang đỉnh nóc, kịch trần thì cho mình xin xíu thông tin nha!</p>

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
    </>
	);
}

export default Begin;

