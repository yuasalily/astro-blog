import Square from "@components/othello/Square";
import {
	useHamburgerBoard,
	usePizzaBoard,
	useTurn,
} from "@components/othello/context/BoardContext";
import {
	checkGame,
	getSquareIndexBit,
	isPizzaTurn,
	makeLegalBoard,
} from "@components/othello/utils";

const GameBoard = () => {
	const pizzaBoard = usePizzaBoard();
	const hamburgerBoard = useHamburgerBoard();
	const turn = useTurn();

	const finish = checkGame(pizzaBoard, hamburgerBoard);
	console.log("finish:", finish);
	const renderSquare = () => {
		const squares = [];
		const legalBoard = isPizzaTurn(turn)
			? makeLegalBoard(pizzaBoard, hamburgerBoard)
			: makeLegalBoard(hamburgerBoard, pizzaBoard);
		for (let squareIndex = 0n; squareIndex < 64n; squareIndex++) {
			const squareIndexBit = getSquareIndexBit(squareIndex);
			const isPizza = (pizzaBoard & squareIndexBit) !== 0n;
			const isHamburger = (hamburgerBoard & squareIndexBit) !== 0n;
			const isLegal = (legalBoard & squareIndexBit) !== 0n;

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
