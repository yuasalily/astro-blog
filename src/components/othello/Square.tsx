import { getSquareState } from "@components/othello/GameSettings";
import React, { type ReactNode } from "react";

const convertState = (squareState: number): ReactNode | null => {
	const SquareState = getSquareState();
	switch (squareState) {
		case SquareState.Empty:
			return null;
		case SquareState.Pizza:
			return <i className="fa-solid fa-pizza-slice text-xl" />;
		case SquareState.Hamburger:
			return <i className="fa-solid fa-burger text-xl" />;
		default:
			throw new Error("invalid square state");
	}
};

const Square: React.FC<{
	squareState: number;
	setSquare: () => void;
}> = ({ squareState, setSquare }) => {
	const SquareState = getSquareState();
	const convertedState = convertState(squareState);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className="aspect-square border-2 border-indigo-600 flex items-center justify-center"
			onClick={setSquare}
		>
			{convertedState}
		</div>
	);
};

export default Square;
