import {
	useHamburgerBoard,
	useHamburgerBoardDispatch,
	usePizzaBoard,
	usePizzaBoardDispatch,
	useTurn,
	useTurnDispatch,
} from "@components/othello/context/BoardContext";
import {
	getSquareIndexBit,
	isPizzaTurn,
	makeReversedBoard,
} from "@components/othello/utils";

import { HamburgerIcon, LegalIcon, PizzaIcon } from "@components/othello/Icons";

const Square = ({
	isPizza,
	isHamburger,
	isLegal,
	squareIndex,
}: {
	isPizza: boolean;
	isHamburger: boolean;
	isLegal: boolean;
	squareIndex: bigint;
}) => {
	const pizzaBoard = usePizzaBoard();
	const hamburgerBoard = useHamburgerBoard();
	const turn = useTurn();
	const pizzaBoardDispatch = usePizzaBoardDispatch();
	const hamburgerBoardDispatch = useHamburgerBoardDispatch();
	const turnDispatch = useTurnDispatch();
	const squareIndexBit = getSquareIndexBit(squareIndex);

	const handleClick = () => {
		const reversedBoard = isPizzaTurn(turn)
			? makeReversedBoard(pizzaBoard, hamburgerBoard, squareIndexBit)
			: makeReversedBoard(hamburgerBoard, pizzaBoard, squareIndexBit);
		pizzaBoardDispatch({
			type: "update",
			payload: isPizzaTurn(turn)
				? reversedBoard | squareIndexBit
				: reversedBoard,
		});
		hamburgerBoardDispatch({
			type: "update",
			payload: isPizzaTurn(turn)
				? reversedBoard
				: reversedBoard | squareIndexBit,
		});
		turnDispatch("next");
	};
	let icon = null;
	if (isPizza) {
		icon = <PizzaIcon fontSize={"text-xl"} />;
	}
	if (isHamburger) {
		icon = <HamburgerIcon fontSize={"text-xl"} />;
	}
	if (isLegal) {
		icon = <LegalIcon fontSize={"text-xl"} />;
	}
	return (
		<div
			className="aspect-square border-2 border-indigo-600 flex items-center justify-center"
			onClick={isLegal ? handleClick : () => {}}
			onKeyDown={isLegal ? handleClick : () => {}}
		>
			{icon}
		</div>
	);
};

export default Square;
