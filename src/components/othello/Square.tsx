import {
	useHamburgerBoard,
	useHamburgerBoardDispatch,
	usePizzaBoard,
	usePizzaBoardDispatch,
} from "@components/othello/context/BoardContext";
import {
	getSquareIndexBit,
	makeReversedBoard,
} from "@components/othello/utils";

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
	const pizzaBoardDispatch = usePizzaBoardDispatch();
	const hamburgerBoardDispatch = useHamburgerBoardDispatch();
	const squareIndexBit = getSquareIndexBit(squareIndex);
	const handleClick = () => {
		const reversedBoard = makeReversedBoard(
			pizzaBoard,
			hamburgerBoard,
			squareIndexBit,
		);
		pizzaBoardDispatch({
			type: "update",
			payload: reversedBoard | squareIndexBit,
		});
		hamburgerBoardDispatch({ type: "update", payload: reversedBoard });
	};
	let icon = null;
	if (isPizza) {
		icon = <i className="fa-solid fa-pizza-slice text-xl text-yellow-900" />;
	}
	if (isHamburger) {
		icon = <i className="fa-solid fa-burger text-xl text-red-900" />;
	}
	if (isLegal) {
		icon = <i className="fa-solid fa-person-digging text-xl text-gray-500" />;
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
