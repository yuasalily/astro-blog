import {
	useHamburgerAssetDispatch,
	useHamburgerBoardDispatch,
	useHamburgerRevenueDispatch,
	useMatchSetting,
	usePizzaAssetDispatch,
	usePizzaBoardDispatch,
	usePizzaRevenueDispatch,
	useSetEventText,
	useSetExpectedEventText,
	useSetMatchSetting,
	useTurnDispatch,
} from "@components/othello/context/BoardContext";
import React from "react";

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

	const matchSetting = useMatchSetting();
	const setMatchSetting = useSetMatchSetting();

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

	const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleResetClick();
		setMatchSetting(Number(e.target.value));
	};
	return (
		<div className="flex flex-col">
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
				type="button"
				onClick={handleResetClick}
			>
				リセットする
			</button>
			<div>
				<label>
					<input
						type="radio"
						value="0"
						checked={matchSetting === 0}
						onChange={handleOptionChange}
					/>
					二人用
				</label>

				<label>
					<input
						type="radio"
						value="1"
						checked={matchSetting === 1}
						onChange={handleOptionChange}
					/>
					CPUレベル1
				</label>
				<div>CPU対戦の場合プレイヤーは先手しか選べません。</div>
			</div>
		</div>
	);
};
export default GameController;
