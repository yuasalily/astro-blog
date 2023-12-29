import {
	useHamburgerAssetDispatch,
	useHamburgerBoard,
	useHamburgerBoardDispatch,
	useHamburgerRevenueDispatch,
	useMatchSetting,
	usePizzaAssetDispatch,
	usePizzaBoard,
	usePizzaBoardDispatch,
	usePizzaRevenueDispatch,
	useSetEventText,
	useSetExpectedEventText,
	useTurn,
	useTurnDispatch,
} from "@components/othello/context/BoardContext";
import {
	getSquareIndexBit,
	isPizzaTurn,
	makeReversedBoard,
} from "@components/othello/utils";

import { HamburgerIcon, LegalIcon, PizzaIcon } from "@components/othello/Icons";
import { type Event } from "@components/othello/eventList.ts";

const Square = ({
	isPizza,
	isHamburger,
	isLegal,
	squareIndex,
	event,
	isCpuPut,
}: {
	isPizza: boolean;
	isHamburger: boolean;
	isLegal: boolean;
	squareIndex: bigint;
	event: Event | null;
	isCpuPut: boolean;
}) => {
	const pizzaBoard = usePizzaBoard();
	const pizzaBoardDispatch = usePizzaBoardDispatch();
	const pizzaRevenueDispatch = usePizzaRevenueDispatch();
	const pizzaAssetDispatch = usePizzaAssetDispatch();

	const hamburgerBoard = useHamburgerBoard();
	const hamburgerBoardDispatch = useHamburgerBoardDispatch();
	const hamburgerRevenueDispatch = useHamburgerRevenueDispatch();
	const hamburgerAssetDispatch = useHamburgerAssetDispatch();

	const turn = useTurn();
	const turnDispatch = useTurnDispatch();

	const setEventText = useSetEventText();
	const setExpectedEventText = useSetExpectedEventText();

	const matchSetting = useMatchSetting();

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

		if (event === null) throw new Error("legal square has no event");

		setEventText(event);
		if (isPizzaTurn(turn)) {
			pizzaRevenueDispatch({ type: "update", payload: event.revenueChange });
			pizzaAssetDispatch({ type: "update", payload: event.assetChange });
		} else {
			hamburgerRevenueDispatch({
				type: "update",
				payload: event.revenueChange,
			});
			hamburgerAssetDispatch({ type: "update", payload: event.assetChange });
		}

		turnDispatch("next");
	};

	if (matchSetting > 0 && !isPizzaTurn(turn) && isCpuPut) {
		handleClick();
	}

	const handleHover = () => {
		if (event === null) throw new Error("legal square has no event");
		setExpectedEventText(event);
	};

	const handleHoverLeave = () => {
		setExpectedEventText({ text: "", revenueChange: 0, assetChange: 0 });
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
			className="aspect-square border-2 border-indigo-900 flex items-center justify-center"
			onClick={isLegal ? handleClick : () => {}}
			onKeyDown={isLegal ? handleClick : () => {}}
			onMouseOver={isLegal ? handleHover : () => {}}
			onFocus={isLegal ? handleHover : () => {}}
			onMouseOut={isLegal ? handleHoverLeave : () => {}}
			onBlur={isLegal ? handleHoverLeave : () => {}}
		>
			{icon}
		</div>
	);
};

export default Square;
