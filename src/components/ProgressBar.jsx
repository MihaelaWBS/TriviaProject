import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ current, total }) => {
	const progress = (current / total) * 100;

	return (
		<div className="progress-container glassmorphic">
			<div className="progress-bar" style={{ width: `${progress}%` }}></div>
		</div>
	);
};

export default ProgressBar;
