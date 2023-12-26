import GameInformation from "@components/othello/GameInformation";
import { HamburgerIcon, PizzaIcon } from "@components/othello/Icons";
import ScoreInformation from "@components/othello/ScoreInformation";
import {
	useHamburgerAsset,
	useHamburgerBoard,
	useHamburgerRevenue,
	usePizzaAsset,
	usePizzaBoard,
	usePizzaRevenue,
	useTurn,
} from "@components/othello/context/BoardContext";
import {
	calculateScore,
	isPizzaTurn,
	popCount,
} from "@components/othello/utils";

const ScoreBoard = () => {
	const pizzaBoard = usePizzaBoard();
	const hamburgerBoard = useHamburgerBoard();
	const turn = useTurn();
	const pizzaIsNext = isPizzaTurn(turn);

	const numPizza = popCount(pizzaBoard);
	const pizzaRevenue = usePizzaRevenue();
	const pizzaAsset = usePizzaAsset();

	const numHamburger = popCount(hamburgerBoard);
	const hamburgerRevenue = useHamburgerRevenue();
	const hamburgerAsset = useHamburgerAsset();

	return (
		<>
			<GameInformation
				pizzaIcon={<PizzaIcon fontSize="text-base" />}
				hamburgerIcon={<HamburgerIcon fontSize="text-base" />}
				pizzaScore={calculateScore(numPizza, pizzaRevenue, pizzaAsset)}
				hamburgerScore={calculateScore(
					numHamburger,
					hamburgerRevenue,
					hamburgerAsset,
				)}
				pizzaIsNext={pizzaIsNext}
			/>

			<ScoreInformation
				icon={<PizzaIcon fontSize="text-base" />}
				numStore={numPizza}
				revenue={pizzaRevenue}
				asset={pizzaAsset}
			/>

			<ScoreInformation
				icon={<HamburgerIcon fontSize="text-base" />}
				numStore={numHamburger}
				revenue={hamburgerRevenue}
				asset={hamburgerAsset}
			/>
		</>
	);
};

export default ScoreBoard;
