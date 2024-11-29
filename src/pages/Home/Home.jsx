import React, { useEffect, useState } from "react";
import { IoMdArrowDown } from "react-icons/io";
import FlipClock from "@/components/CountDown/CountDown";
import { BiSolidSchool } from "react-icons/bi";
import { MdCalendarMonth, MdPhoneInTalk, MdEmail } from "react-icons/md";
import ButtonCT from '@/components/ButtonCT';
import { IoLocationSharp, IoEarth } from "react-icons/io5";
import WishesSlider from "@/components/WishersSlider/WishersSlider";
import Carousel from "@/components/Carousel/Carousel";
import toast from 'react-hot-toast';

import qr_code from "@/assets/qr_fanpage_linkedin.png"

const Home = () => {
	const [bannerPos, setBannerPos] = useState(0)
	const [wisher, setWisher] = useState('')
	const [wisherError, setWisherError] = useState('')
	const [confirm, setConfirm] = useState("");
	const [selectedImage, setSelectedImage] = useState({
		url: null,
		base64: null,
	});
	const [reviews, setReviews] = useState([{
		"name": "Duy Khuong",
		"img_url": null,
		"wisher": ""
	}]);
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingPut, setIsLoadingPut] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	const [name, setName] = useState('')
  const [relationship, setRelationship] = useState('bạn')
  const [mappedRelationship, setMappedRelationship] = useState('mình')

	const endPoint = import.meta.env.VITE_FE_END_POINT


	const fetchData = async () => {
    const path = window.location.pathname || localStorage.getItem('key')

		if (path === '/') return

    try {
      const response = await fetch(`${import.meta.env.VITE_END_POINT}/graduation/wishers${path}`);
      if (!response.ok) {
        window.location.href = '/'
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setName(data.data.name)
      setRelationship(data.data.relationship)
			setMappedRelationship(data.data.mapped_relationship)
			setSelectedImage({
				url: data.data.img_url,
				base64: null
			})
			setConfirm(data.data.confirm)
			setWisher(data.data.wisher)

			if (data.data.wisher) {
				setSubmitted(true)
			}
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

	const fetchListData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_END_POINT}/graduation/wishers/`);
      if (!response.ok) {
        return
      }
      const data = await response.json();
      console.log('Fetched List data:', data);
			setReviews(data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
      return
    }
  };

  const handleChange = (event) => {
    setConfirm(event.target.value);
  };

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				const base64String = reader.result.split(',')[1];
				setSelectedImage({
					url: URL.createObjectURL(file),
					base64: base64String,
				});
			};

			reader.onerror = (error) => {
				console.error('Error converting image to Base64:', error);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleScroll = (event) => {
    event.preventDefault();
    const targetElement = document.getElementById("next");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

	const putData = async (path, body) => {
		if (path[path.length - 1] !== '/') {
			path += '/'
		}

    try {
      const response = await fetch(`${import.meta.env.VITE_END_POINT}/graduation/wishers${path}`, {
        method: 'PUT',
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
		if (!wisher.length) {
			setWisherError('Vui lòng nhập lời chúc đến Khương trước khi gửi nhé')
			return
		}

		const path = window.location.pathname || localStorage.getItem('key')

		const body = {
			wisher: wisher,
			confirm: confirm,
		};

		if (selectedImage.base64) {
			body['img_base64'] = selectedImage.base64
		}

		setIsLoadingPut(true)
		const response = await putData(path, body);
		setIsLoadingPut(false)

		if (response.code === 200) {
			setSubmitted(true)
			toast.success("Đã gửi thành công. Cảm ơn bạn nhé!")
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchData()
		fetchListData()

		setTimeout(() => setIsLoading(false), 2000)

    const handleScroll = () => {
      setBannerPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

	return (
		<div>
			{isLoading && <div className="fixed z-[1000] top-0 left-0 w-[100vw] h-[100vh] bg-white flex items-center justify-center">
				<div className="loader"></div>
			</div>}

			<div className="relative w-full min-h-[100vh] z-0 flex items-center justify-center pb-32">
				<div>
					<div className="max-w-[90vw] m-auto font-stylescript text-white">
						<img className="m-auto w-[170px] lg:w-[200px]" src="https://cdn3.iconfinder.com/data/icons/education-47/128/1-27-512.png" loading="lazy"  />
						<h1 className="text-5xl lg:text-8xl">Graduation Invitation</h1>
						<br/>
						<br/>
						<p className="text-2xl lg:text-4xl">Ngày hôm nay là kết quả của tất cả những cố gắng, nhưng tương lai sẽ là sự khởi đầu của những ước mơ.</p>
						<br />
						<br />
						<p className="text-2xl lg:text-4xl">Cảm ơn những khó khăn đã giúp tôi trưởng thành và những người luôn đồng hành cùng tôi.</p>
					</div>

					<div className="absolute left-0 top-0 w-full h-full -z-50 overflow-hidden pointer-events-none">
						<div
							style={{transform: `translate3d(0, -${bannerPos/3}px, 0)`}}
							className={`fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-no-repeat bg-[30%] bg-cover bg-[url('https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fbg.png?alt=media')] transform translate-x-0 mt-0 visible`}
						></div>
					</div>

					<div className="animate-bounce absolute bottom-[45px] left-[calc(50%-30px)] w-[60px] h-[60px] cursor-pointer bg-[rgba(80,80,80,0.5)] rounded-full transform">
						<a href="#next" onClick={handleScroll}>
							<IoMdArrowDown className="text-3xl text-white absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
						</a>
					</div>
				</div>
			</div>

			<div className="z-0 relative bg-white" id="next">
				<div className="max-w-[90vw] m-auto font-stylescript text-black pb-20">
					<h2 className="text-5xl lg:text-7xl pt-16">Lễ Tốt Nghiệp</h2>

					<p className="text-xl lg:text-2xl pt-8 text-gray-500 font-worksans">Trường Đại học Khoa học Tự nhiên - ĐHQGHCM</p>

					<span className="h-1 bg-black w-80 block m-auto mt-14"></span>
					<p className="text-4xl lg:text-5xl p-8">Trần Duy Khương</p>
					<span className="h-1 bg-black w-80 block m-auto"></span>
					<p className="text-xl lg:text-2xl pt-8 text-gray-500 font-worksans">Cử nhân Công nghệ Thông tin</p>
				</div>
			</div>

			<div className="relative z-0 flex items-center justify-center bg-transparent">
				<div>
					<div className="max-w-[90vw] m-auto text-white py-10">
						<h1 className="text-2xl lg:text-3xl text-gray-300">Sẽ được diễn ra sau</h1>
						<br/>
						<br/>
						<FlipClock />
					</div>
				</div>
			</div>

			<div className="z-0 relative bg-white">
				<div className="max-w-[1300px] m-auto font-stylescript text-black lg:pt-20 lg:px-12 lg:flex gap-16">
					<div className="flex-2 p-5 pb-10">
						<img className="w-full lg:w-auto max-w-[450px] m-auto rounded-tr-[100px] rounded-bl-[100px] rounded-tl-[10px] rounded-br-[10px]" src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fhoboi.jpg?alt=media" loading="lazy" />
					</div>
					<div className="relative flex-2 p-5 text-xl font-stylescript text-left">
						<h2 className="text-5xl lg:text-7xl pb-10 text-center">Lời Ngỏ</h2>
						<p className="text-[#3c3c3c]">Chào {relationship} <strong className="text-2xl">{name}</strong> thân mến,</p>
						<br />
						<p className="text-[#3c3c3c]">Ngày tốt nghiệp không chỉ đánh dấu một chặng đường đã qua, mà còn mở ra một khởi đầu mới, nơi {mappedRelationship} tiếp tục bước đi với hành trang là những bài học quý giá, những kỷ niệm đẹp đẽ và tình yêu thương của những người luôn ở bên cạnh.</p>
						<br />
						<p className="text-[#3c3c3c]">Để ngày đặc biệt này trở nên ý nghĩa hơn, {mappedRelationship} rất mong được đón {relationship} đến tham dự buổi lễ tốt nghiệp của {mappedRelationship}. Sự hiện diện của {relationship} sẽ là nguồn động viên tinh thần lớn lao, giúp {mappedRelationship} cảm nhận trọn vẹn niềm vui và hạnh phúc trong khoảnh khắc đáng nhớ này.</p>
						<br />
						<p className="text-[#3c3c3c]">Hy vọng {relationship} có thể sắp xếp thời gian đến để cùng {mappedRelationship} lưu lại những khoảnh khắc ý nghĩa, cùng chia sẻ niềm vui và thành tựu sau một hành trình đầy nỗ lực của {mappedRelationship}!</p>
						<br />
						<p className="font-stylescript">Duy Khương</p>

						<img src="https://bastun.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvector__3.5c43c277.png&w=1920&q=75" alt="" width="200" className="movingImage" loading="lazy"  />
					</div>
				</div>
			</div>

			<div className="z-0 relative bg-[#fdf0e3] pb-28" style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fservice__bg__5.png?alt=media')" }}>
				<div className="max-w-[90vw] m-auto font-stylescript text-black">
					<h2 className="text-4xl lg:text-6xl pt-16 lg:pt-24">Lễ Tốt Nghiệp sẽ diễn ra tại</h2>

					<div className="lg:flex gap-10 mt-8 lg:mt-16">
						<div className="flex-1 text-left">
							<div className="flex gap-5 items-center font-stylescript text-2xl lg:text-3xl text-[#232323] mb-2">
								<BiSolidSchool className="text-4xl lg:text-3xl" />
								<p>Giảng đường 1 - Trường Đại học Khoa học Tự nhiên (Cơ sở 1)</p>
							</div>
							<div className="flex gap-4 items-center font-worksans text-xl text-[#232323]">
								<p className="pl-[50px] text-base lg:text-xl text-[#767676]">227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh, Việt Nam</p>
							</div>
							<br />
							<br />
							<div className="flex gap-5 items-center font-stylescript text-2xl lg:text-3xl text-[#232323] mb-2">
								<MdCalendarMonth />
								<p>Thứ 7 ngày 07/12/2024 (Lễ của Trường)</p>
							</div>
							<div className="lg:flex gap-3 lg:gap-4 items-center font-worksans text-base lg:text-xl text-[#232323]">
								<p className="pl-[50px] text-[#767676]">06:30 - 07:30 AM</p>
								<p className="pl-[50px] text-[#767676]">10:30 - 12:00 AM</p>
							</div>
							<div className="flex gap-5 items-center font-stylescript text-xl lg:text-2xl text-[#232323] mt-6">
								<p className="pl-[50px] text-[#acacac]">Thứ 4 ngày 11/12/2024 (Lễ của Khoa - Dự kiến)</p>
							</div>
							<div className="lg:flex gap-3 lg:gap-4 items-center font-worksans text-base lg:text-lg">
								<p className="pl-[50px] text-[#acacac]">16:00 - 17:00 PM</p>
								<p className="pl-[50px] text-[#acacac]">19:00 - 20:00 PM</p>
							</div>
							<br />
							<br />
							<div className="flex gap-5 items-center font-stylescript text-2xl lg:text-3xl text-[#232323] mb-2">
								<MdPhoneInTalk />
								<p>0824 704 789</p>
							</div>
							<div className="flex gap-4 items-center font-worksans text-xl text-[#342a2a]">
								<p className="pl-[50px] text-base lg:text-xl text-[#767676]">Khi đến vui lòng liên lệ SĐT trên để biết vị trí nha ạ</p>
							</div>
							<br />
							<br />
							<div className="flex gap-4 items-center text-xl text-[#232323] mb-8 lg:mb-0">
								<p className="lg:pl-[50px] text-2xl lg:text-3xl text-[#32aa54]">Sự có mặt của {relationship} là niềm vui lớn nhất đối với {mappedRelationship}. Vui lòng đừng mua Hoa, Quà... nhé!</p>
							</div>
						</div>
						<div className="flex-1">
						<div className="w-full h-[450px]">
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6358630476784!2d106.67975127528696!3d10.762521589385429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1bfc262bf1%3A0x4e843897f2900135!2zMjI3IMSQLiBOZ3V54buFbiBWxINuIEPhu6ssIFBoxrDhu51uZyA0LCBRdeG6rW4gNSwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1732548447130!5m2!1svi!2s" className="w-full" height="450" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
							<a href="https://maps.app.goo.gl/gm2SZf43g4QiiNLQ9" target="_blank" className="font-worksans mt-4 block">
								<ButtonCT content="Bản đồ chỉ đường" />
							</a>
						</div>
						</div>
					</div>
				</div>
			</div>


			<div className="z-0 relative">
				<div className="max-w-[90vw] m-auto font-stylescript text-black pb-12 lg:pb-24">
					<h2 className="text-4xl lg:text-6xl pt-12 lg:pt-24">Hướng dẫn Gửi xe</h2>

					<div className="lg:flex gap-16 mt-10 lg:mt-16">
						<div className="flex-1 text-left">
							<img className="rounded-2xl" src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2FKHTN-Parking.jpg?alt=media" loading="lazy"  />
						</div>
						<div className="flex-1 text-left relative">
							<p className="text-base lg:text-2xl text-[#32aa54] font-worksans mt-10 lg:mt-0">Để tránh quá tải, mọi người có thể gửi xe tại các bãi xe xung quanh, chỉ cách vài bước đi bộ thôi ạ</p>
							<br />
							<br className="lg:block hidden" />
							<div className="flex gap-5 items-center font-stylescript text-xl text-[#232323] mb-2">
								<IoLocationSharp />
								<p>Bãi xe Trường Đại học Khoa học Tự nhiên (trong khuôn viên Trường)</p>
							</div>
							<br />
							<div className="flex gap-5 items-center font-stylescript text-xl text-[#232323] mb-2">
								<IoLocationSharp />
								<p>Bãi xe Trường THPT Chuyên Lê Hồng Phong (cách 50m)</p>
							</div>
							<br />
							<div className="flex gap-5 items-center font-stylescript text-xl text-[#232323] mb-2">
								<IoLocationSharp />
								<p>Bãi xe NowZone (cách 100m)</p>
							</div>
							<br />
							<div className="flex gap-5 items-center font-stylescript text-xl text-[#232323] mb-2">
								<IoLocationSharp />
								<p>Bãi xe Ôtô đối diện Trường</p>
							</div>

							<div className="absolute bottom-0 right-0 -z-10">
								<img className="h-16 md:h-26 lg:h-36" src="https://img.clipart-library.com/2/clip-car-gif/clip-car-gif-16.gif" />
							</div>
						</div>
					</div>
				</div>
			</div>


			<div className="z-0 relative" style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fservice__bg__5.png?alt=media')" }}>
				<div className="max-w-[90vw] m-auto text-black pb-20">
					<h2 className="text-5xl lg:text-6xl pt-16 font-stylescript">Lưu niệm</h2>

					<div className="lg:flex gap-20 mt-12">
						<div className="flex-1 text-left border rounded-2xl p-8 bg-white shadow-lg">
							<p className="pb-2 text-base">Lời chúc dành cho Khương</p>
							<textarea
    						className="bg-white outline-transparent w-full p-2 rounded border border-gray-300 min-h-28"
    						value={wisher}
    						onChange={(e) => setWisher(e.target.value)}
  						/>
							<p className='text-[#FF4C4C] text-xs'>{wisherError}</p>
							<br />
							<br />
							<p className="pb-2 text-base">Có thể upload một bức ảnh đẹp nhất để cùng tỏa sáng nha</p>
							<div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md">
								<label
									htmlFor="upload"
									className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
								>
									Chọn ảnh
								</label>
								<input
									id="upload"
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="hidden"
								/>

								{selectedImage && selectedImage.url && (
									<div className="mt-4">
										<img
											src={selectedImage.url}
											alt="Preview"
											className="mt-2 h-64 object-cover rounded-md"
										/>
									</div>
								)}
							</div>
							<br />
							<br />
							<p className="pb-4 text-base">Bạn có thể sắp xếp để đến cùng Khương vào ngày 07/12/2024 không</p>
							<div className="mb-2">
								<label className="flex items-center space-x-2">
									<input
										type="radio"
										name="attendance"
										value="yes"
										checked={confirm === "yes"}
										onChange={handleChange}
										className="text-blue-600 focus:ring focus:ring-green-300"
									/>
									<span className="text-gray-700">Có thể đến</span>
								</label>
							</div>
							<div className="mb-2">
								<label className="flex items-center space-x-2">
									<input
										type="radio"
										name="attendance"
										value="no"
										checked={confirm === "no"}
										onChange={handleChange}
										className="text-red-600 focus:ring focus:ring-red-300"
									/>
									<span className="text-gray-700">Không thể đến</span>
								</label>
							</div>
							<div className="mb-4">
								<label className="flex items-center space-x-2">
									<input
										type="radio"
										name="attendance"
										value="unknown"
										checked={confirm === "unknown"}
										onChange={handleChange}
										className="text-red-600 focus:ring focus:ring-blue-300"
									/>
									<span className="text-gray-700">Sẽ sắp xếp để đến</span>
								</label>
							</div>
							<ButtonCT content={submitted ? "Cập nhật lời chúc" : "Gừi lời chúc ngay"} isLoading={isLoadingPut} onClick={handleSubmit} />
						</div>

						<div className="flex-1 text-left relative font-stylescript mt-10 lg:mt-0">
							<p className="text-2xl text-[#32aa54]">Vào ngày này, {mappedRelationship} cũng có món quà nho nhỏ gửi tặng đến mọi người thay lời cảm ơn ạ!</p>
							<br />
							<br />
							<div className="">
								<img src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Ftui-giay.png?alt=media" loading="lazy" className="max-h-[400px] m-auto"  />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="z-0 relative bg-slate-100">
				<div className="max-w-[90vw] m-auto text-black pb-20">
					<h2 className="text-4xl lg:text-6xl pt-16 font-stylescript">Cảm ơn những lời chúc từ</h2>
					<WishesSlider reviews={reviews} />
				</div>
			</div>

			<div className="z-0 relative bg-slate-100">
				<div className="max-w-[90vw] m-auto text-black overflow-hidden">
					<Carousel />
				</div>
			</div>

			{!endPoint.includes('joseph') && (
				<div className="z-0 pb-20 relative bg-slate-100" style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fservice__bg__5.png?alt=media')" }}>
					<div className="max-w-[90vw] m-auto text-black pt-24">
							<div className="w-[330px] m-auto pr-4 mb-10">
								<div className="p-6 bg-purple-500 border-dashed border-2 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-[30px] rounded-br-[1px]">
									<p className="font-stylescript text-2xl text-white">Xin chào, lại là mình đây! ahihi. Mình xin phép dành ít phút quảng cáo về Ekila Solutions nha.</p>
								</div>
							</div>

							<div className="m-auto relative inline-block">
								<img className="h-[120px] md:h-[152px] m-auto" src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/logo-no-bg.png?alt=media" />

								{/* Bot */}
								<div className='absolute -right-6 -top-20 md:-right-[136px] md:-top-20'>
									<img className='h-[90px] md:h-40' src='https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/lingobot%2Fbot.png?alt=media' />
								</div>
							</div>

							<div className="m-auto relative inline">
								<img className="h-80 m-auto" src="https://firebasestorage.googleapis.com/v0/b/gokag-19eac.appspot.com/o/services.png?alt=media" />
							</div>

							<div className="gap-5 inline-flex m-auto mt-5">
								<img className="h-28" src={qr_code} />
							</div>

							<div>
								<div className="flex-col gap-2 inline-flex md:flex-row md:gap-10 m-auto">
									<div className="flex gap-2 items-center">
										<div className="rounded-full bg-black w-8 h-8 flex items-center justify-center">
											<IoEarth className="text-white w-6 h-6" />
										</div>
										<a className="text-lg text-black" href="http://www.ekila.vn" target="_blank">www.ekila.vn</a>
									</div>
									<div className="flex gap-2 items-center">
										<div className="rounded-full bg-black w-8 h-8 flex items-center justify-center">
											<MdEmail className="text-white w-5 h-5" />
										</div>
										<a className="text-lg text-black" href="mailto:info@ekila.vn">info@ekila.vn</a>
									</div>
									<div className="flex gap-2 items-center">
										<div className="rounded-full bg-black w-8 h-8 flex items-center justify-center">
											<MdPhoneInTalk className="text-white w-5 h-5" />
										</div>
										<a className="text-lg text-black" href="tel:0824704789">0824 704 789</a>
									</div>
								</div>
							</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
