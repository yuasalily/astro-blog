import { getSettings, getSquareState } from "@components/othello/GameSettings";
import Square from "@components/othello/Square";
import { LegalSquare } from "@components/othello/utils";
import React, { useEffect, useState } from "react";

const GameBoard: React.FC = () => {
	const [loaded, setLoaded] = useState(false);
	const settings = getSettings();
	const SquareState = getSquareState();
	const [gameBoard, setGameBoard] = useState<number[]>(
		Array(settings.height * settings.width).fill(SquareState.Empty),
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (loaded) {
			return;
		}
		const _gameBoard: number[] = Array(settings.height * settings.width).fill(
			SquareState.Empty,
		);
		_gameBoard[27] = SquareState.Hamburger;
		_gameBoard[28] = SquareState.Pizza;
		_gameBoard[35] = SquareState.Pizza;
		_gameBoard[36] = SquareState.Hamburger;

		setGameBoard(_gameBoard);

		setLoaded(true);

		const legalSquare = new LegalSquare(8);
		console.log(legalSquare.getLegalSquare(5231));
	}, [loaded]);

	return (
		<div className="grid grid-cols-8 w-96 bg-green-200 border-4 border-indigo-600">
			{gameBoard.map((state, i) => (
				<Square
					key={`square${i}`}
					squareState={state}
					setSquare={() => {
						setGameBoard((prev) => {
							const newGameBoard = [...prev];
							newGameBoard[i] = SquareState.Pizza;
							return newGameBoard;
						});
					}}
				/>
			))}
		</div>
	);
};

export default GameBoard;
