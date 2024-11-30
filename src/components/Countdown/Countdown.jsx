import './Countdown.css';
import React, { useState, useEffect } from 'react';

const AnimatedCard = ({ animation, digit }) => (
	<div className={`flipCard ${animation}`}>
		<span>{digit}</span>
	</div>
);

const StaticCard = ({ position, digit }) => (
	<div className={position}>
		<span>{digit}</span>
	</div>
);

const FlipUnitContainer = ({ digit, shuffle, unit }) => {
	let currentDigit = digit;
	let previousDigit = digit - 1;

	if (unit === 'days') {
		previousDigit = previousDigit === 0 ? 30 : previousDigit;
	} else if (unit !== 'months') {
		previousDigit = previousDigit === -1 ? 59 : previousDigit;
	} else {
		previousDigit = previousDigit === 0 ? 12 : previousDigit;
	}

	currentDigit = Math.abs(currentDigit)
	previousDigit = Math.abs(previousDigit)

	if (currentDigit < 10) {
		currentDigit = `0${currentDigit}`;
	}
	if (previousDigit < 10) {
		previousDigit = `0${previousDigit}`;
	}

	const digit1 = shuffle ? previousDigit : currentDigit;
	const digit2 = !shuffle ? previousDigit : currentDigit;

	const animation1 = shuffle ? 'fold' : 'unfold';
	const animation2 = !shuffle ? 'fold' : 'unfold';

	return (
		<div className="flipUnitContainer">
			<StaticCard position="upperCard" digit={currentDigit} />
			<StaticCard position="lowerCard" digit={previousDigit} />
			<AnimatedCard digit={digit1} animation={animation1} />
			<AnimatedCard digit={digit2} animation={animation2} />
		</div>
	);
};

const FlipClock = () => {
	const [time, setTime] = useState({
		months: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [shuffle, setShuffle] = useState({
		months: true,
		days: true,
		hours: true,
		minutes: true,
		seconds: true,
	});

	useEffect(() => {
		const updateTime = () => {
			const targetDate = new Date(2024, 12, 7, 11, 0, 0); // Target date
			const currentDate = new Date();
			const difference = targetDate - currentDate;

			const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
			const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30) - 1;
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((difference / (1000 * 60)) % 60);
			const seconds = Math.floor((difference / 1000) % 60);

			setShuffle((prevShuffle) => ({
				months: months !== time.months ? !prevShuffle.months : prevShuffle.months,
				days: days !== time.days ? !prevShuffle.days : prevShuffle.days,
				hours: hours !== time.hours ? !prevShuffle.hours : prevShuffle.hours,
				minutes: minutes !== time.minutes ? !prevShuffle.minutes : prevShuffle.minutes,
				seconds: seconds !== time.seconds ? !prevShuffle.seconds : prevShuffle.seconds,
			}));

			setTime({ months, days, hours, minutes, seconds });
		};

		const timerID = setInterval(updateTime, 1000);
		return () => clearInterval(timerID);
	}, [time]);

	const { months, days, hours, minutes, seconds } = time;
	const { months: monthsShuffle, days: daysShuffle, hours: hoursShuffle, minutes: minutesShuffle, seconds: secondsShuffle } = shuffle;

	return (
		<>
			<div className="flipClock">
				{/* <FlipUnitContainer unit="months" digit={months} shuffle={monthsShuffle} /> */}
				<FlipUnitContainer unit="days" digit={days} shuffle={daysShuffle} />
				<FlipUnitContainer unit="hours" digit={hours} shuffle={hoursShuffle} />
				<FlipUnitContainer unit="minutes" digit={minutes} shuffle={minutesShuffle} />
				<FlipUnitContainer unit="seconds" digit={seconds} shuffle={secondsShuffle} />
			</div>
			<div className="grid grid-rows-1 grid-cols-4 gap-1 text-xs w-full mt-3 text-center lg:text-base text-gray-300">
				{/* <div>Tháng</div> */}
				<div>Ngày</div>
				<div>Giờ</div>
				<div>Phút</div>
				<div>Giây</div>
			</div>
		</>
	);
};

export default FlipClock;
