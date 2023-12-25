import { getIndexedLines, getSettings, getSquareState, type SquareStateType } from "@components/othello/GameSettings";
import Square from "@components/othello/Square";
import { getNextPlayer, LegalSquare } from "@components/othello/utils";
import React, { useEffect, useState } from "react";

const getLegal = (gameBoard: SquareStateType[], legalSquare: LegalSquare | undefined, player: SquareStateType) => {
	if (legalSquare === undefined) return;
	const indexedLines = getIndexedLines();
	const SquareState = getSquareState();
	const settings = getSettings()
	const result = Array(settings.height * settings.width).fill(new Array());
	indexedLines.forEach(indexedLine => {
		let lineState = 0
		indexedLine.forEach((squareIndex, i) => {
			let state = 0;
			if (squareIndex === -1) {
				// 盤外の場合は相手の石で埋まっているとしてしまう
				state = 2
			} else {
				if (gameBoard[squareIndex] === player) {
					state = 1;
				} else if (gameBoard[squareIndex] !== SquareState.Empty) {
					state = 2;
				}
			}
			lineState += state * (3 ** i);
		});

		indexedLine.forEach((squareIndex, i) => {
			if (squareIndex !== -1) result[squareIndex].push(legalSquare.getLegalSquare(lineState)[i]);
		});

	})
}

const GameBoard: React.FC = () => {
	const [loaded, setLoaded] = useState(false);
	const [currentTurn, setCurrentTurn] = useState(1);
	const [legalSquare, setLegalSquare] = useState<LegalSquare>();
	const settings = getSettings();
	const SquareState = getSquareState();
	const [gameBoard, setGameBoard] = useState<SquareStateType[]>(
		Array(settings.height * settings.width).fill(SquareState.Empty),
	);

	getLegal(gameBoard, legalSquare, SquareState.Pizza);


	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (loaded) {
			return;
		}
		const _gameBoard: SquareStateType[] = Array(settings.height * settings.width).fill(
			SquareState.Empty,
		);
		_gameBoard[27] = SquareState.Hamburger;
		_gameBoard[28] = SquareState.Pizza;
		_gameBoard[35] = SquareState.Pizza;
		_gameBoard[36] = SquareState.Hamburger;

		setGameBoard(_gameBoard);
		setLegalSquare(new LegalSquare(8));

		setLoaded(true);
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
							newGameBoard[i] = getNextPlayer(currentTurn);
							return newGameBoard;
						});
						setCurrentTurn(prev => prev + 1);
					}}
				/>
			))}
		</div>
	);
};

export default GameBoard;
