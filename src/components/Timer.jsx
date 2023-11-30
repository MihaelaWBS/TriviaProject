import React from "react";
import { useState, useRef, useEffect } from "react";

export default function Timer() {
	const [time, setTime] = useState(60);
	const [running, setRunning] = useState(true);

	const timer = useRef();

	useEffect(() => {
		if (running) {
			timer.current = setInterval(() => {
				setTime((pre) => pre - 1);
			}, 1000);
		}
		return () => clearInterval(timer.current);
	}, [running]);

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

/*
const start = () => {
    setRunning(true)
} */
