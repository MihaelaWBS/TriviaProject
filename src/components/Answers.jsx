import React, { useState } from "react";

const Answers = ({ answer, isSelected, onSelect }) => {
	const buttonStyle = isSelected ? { backgroundColor: "#FEBE10" } : {};

	return (
		<button className="button-container" onClick={onSelect} style={buttonStyle}>
			{answer}
		</button>
	);
};

export default Answers;
