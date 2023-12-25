import Square from "@components/othello/Square";
import {
	useHamburgerBoard,
	usePizzaBoard,
} from "@components/othello/context/BoardContext";
import { makeLegalBoard } from "@components/othello/utils";

const GameBoard = () => {
	const renderSquare = () => {
		const squares = [];
		const pizzaBoard = usePizzaBoard();
		const hamburgerBoard = useHamburgerBoard();
		const legalBoard = makeLegalBoard(pizzaBoard, hamburgerBoard);
		for (let squareIndex = 0n; squareIndex < 64n; squareIndex++) {
			const isPizza = (pizzaBoard & (1n << squareIndex)) !== 0n;
			const isHamburger = (hamburgerBoard & (1n << squareIndex)) !== 0n;
			const isLegal = (legalBoard & (1n << squareIndex)) !== 0n;

			squares.push(
				<Square
					isPizza={isPizza}
					isHamburger={isHamburger}
					isLegal={isLegal}
					squareIndex={squareIndex}
					key={squareIndex}
				/>,
			);
		}

		return squares;
	};
	return (
		<div className="grid grid-cols-8 w-96 bg-green-200 border-4 border-indigo-600">
			{renderSquare()}
		</div>
	);
};

export default GameBoard;
