import {
	useHamburgerAssetDispatch,
	useHamburgerBoardDispatch,
	useHamburgerRevenueDispatch,
	usePizzaAssetDispatch,
	usePizzaBoardDispatch,
	usePizzaRevenueDispatch,
	useSetEventText,
	useSetExpectedEventText,
	useTurnDispatch,
} from "@components/othello/context/BoardContext";

const GameController = () => {
	const pizzaBoardDispatch = usePizzaBoardDispatch();
	const pizzaRevenueDispatch = usePizzaRevenueDispatch();
	const pizzaAssetDispatch = usePizzaAssetDispatch();

	const hamburgerBoardDispatch = useHamburgerBoardDispatch();
	const hamburgerRevenueDispatch = useHamburgerRevenueDispatch();
	const hamburgerAssetDispatch = useHamburgerAssetDispatch();

	const turnDispatch = useTurnDispatch();

	const setEventText = useSetEventText();
	const setExpectedEventText = useSetExpectedEventText();

	const handleResetClick = () => {
		pizzaBoardDispatch({ type: "initialize", payload: 0n });
		pizzaRevenueDispatch({ type: "initialize", payload: 0 });
		pizzaAssetDispatch({ type: "initialize", payload: 0 });

		hamburgerBoardDispatch({ type: "initialize", payload: 0n });
		hamburgerRevenueDispatch({ type: "initialize", payload: 0 });
		hamburgerAssetDispatch({ type: "initialize", payload: 0 });

		turnDispatch("initialize");

		setEventText({ text: "", revenueChange: 0, assetChange: 0 });
		setExpectedEventText({ text: "", revenueChange: 0, assetChange: 0 });
	};
	return (
		<button type="button" onClick={handleResetClick}>
			リセットする
		</button>
	);
};
export default GameController;
