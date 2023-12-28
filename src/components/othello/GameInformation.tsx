// 次のプレイヤーと総資産を表示
import { type ReactNode } from "react";
const GameInformation = ({
	pizzaIcon,
	hamburgerIcon,
	pizzaScore,
	hamburgerScore,
	pizzaIsNext,
	playerInformation,
}: {
	pizzaIcon: ReactNode;
	hamburgerIcon: ReactNode;
	pizzaScore: number;
	hamburgerScore: number;
	pizzaIsNext: boolean;
	playerInformation: ReactNode;
}) => {
	return (
		<>
			<p className="text-xl">{playerInformation}</p>
			<p className="text-lg">
				{pizzaIcon}:{pizzaScore} vs {hamburgerIcon}:{hamburgerScore}
			</p>
		</>
	);
};

export default GameInformation;
