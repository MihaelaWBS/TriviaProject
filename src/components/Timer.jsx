import React from "react";
import { useState, useRef, useEffect } from "react";

export default function Timer({ onTimeChange }) {
	const [time, setTime] = useState(120);
	const [running, setRunning] = useState(true);

	const timer = useRef();

	useEffect(() => {
		if (running) {
			timer.current = setInterval(() => {
				setTime((prevTime) => {
					const newTime = prevTime - 1;
					onTimeChange(newTime);
					return newTime;
				});
			}, 1000);
		}
		return () => clearInterval(timer.current);
	}, [running, onTimeChange]);

	if (time === 0) {
		alert("Your time is over!!!");
		location.reload();
	}

	return (
		<div className="stopwatch">
			<p className="timer">{format(time)}</p>
		</div>
	);
}

const format = (time) => {
	let hours = Math.floor((time / 60 / 60) % 24);
	let minutes = Math.floor((time / 60) % 60);
	let seconds = Math.floor(time % 60);

	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds;
};
