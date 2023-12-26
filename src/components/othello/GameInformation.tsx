// 次のプレイヤーと総資産を表示
import { type ReactNode } from "react";
const GameInformation = ({
	pizzaIcon,
	hamburgerIcon,
	pizzaScore,
	hamburgerScore,
	pizzaIsNext,
}: {
	pizzaIcon: ReactNode;
	hamburgerIcon: ReactNode;
	pizzaScore: number;
	hamburgerScore: number;
	pizzaIsNext: boolean;
}) => {
	return (
		<>
			<p>
				次のプレイヤー:
				{pizzaIsNext ? pizzaIcon : hamburgerIcon}
			</p>
			<p>
				{pizzaIcon}:{pizzaScore} vs {hamburgerIcon}:{hamburgerScore}
			</p>
		</>
	);
};

export default GameInformation;
