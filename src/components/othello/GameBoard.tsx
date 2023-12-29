import Square from "@components/othello/Square";
import {
	useHamburgerBoard,
	useMatchSetting,
	usePizzaBoard,
	useTurn,
	useTurnDispatch,
} from "@components/othello/context/BoardContext";
import { getEvent } from "@components/othello/eventList";
import {
	checkGame,
	getCpuPut,
	getSquareIndexBit,
	isPizzaTurn,
	makeLegalBoard,
	popCount,
} from "@components/othello/utils";

const GameBoard = () => {
	const pizzaBoard = usePizzaBoard();
	const hamburgerBoard = useHamburgerBoard();
	const turn = useTurn();
	const turnDispatch = useTurnDispatch();
	const matchSetting = useMatchSetting();

	const legalBoard = isPizzaTurn(turn)
		? makeLegalBoard(pizzaBoard, hamburgerBoard)
		: makeLegalBoard(hamburgerBoard, pizzaBoard);

	if (popCount(legalBoard) === 0 && !checkGame(pizzaBoard, hamburgerBoard)) {
		alert("置ける場所がないためパスします");
		turnDispatch("next");
	}

	const renderSquare = () => {
		const squares = [];
		const legalBoard = isPizzaTurn(turn)
			? makeLegalBoard(pizzaBoard, hamburgerBoard)
			: makeLegalBoard(hamburgerBoard, pizzaBoard);
		const cpuPut = matchSetting > 0 ? getCpuPut(legalBoard) : null;

		for (let squareIndex = 0n; squareIndex < 64n; squareIndex++) {
			const squareIndexBit = getSquareIndexBit(squareIndex);
			const isPizza = (pizzaBoard & squareIndexBit) !== 0n;
			const isHamburger = (hamburgerBoard & squareIndexBit) !== 0n;
			const isLegal = (legalBoard & squareIndexBit) !== 0n;
			const event = isLegal ? getEvent() : null;
			const isCpuPut = cpuPut === squareIndex;

			squares.push(
				<Square
					isPizza={isPizza}
					isHamburger={isHamburger}
					isLegal={isLegal}
					squareIndex={squareIndex}
					key={squareIndex}
					event={event}
					isCpuPut={isCpuPut}
				/>,
			);
		}

		return squares;
	};
	return (
		<div className="grid grid-cols-8 w-96 bg-green-100 border-4 border-amber-950">
			{renderSquare()}
		</div>
	);
};

export default GameBoard;
