import { HamburgerIcon, PizzaIcon } from "@components/othello/Icons";
import {
	useHamburgerBoard,
	usePizzaBoard,
	useTurn,
} from "@components/othello/context/BoardContext";
import { isPizzaTurn, popCount } from "@components/othello/utils";

const ScoreBoard = () => {
	const pizzaBoard = usePizzaBoard();
	const hamburgerBoard = useHamburgerBoard();
	const turn = useTurn();
	const pizzaIsNext = isPizzaTurn(turn);

	const numPizza = popCount(pizzaBoard);
	const numHamburger = popCount(hamburgerBoard);
	return (
		<>
			<p>
				次のプレイヤー:
				{pizzaIsNext ? (
					<PizzaIcon fontSize="text-base" />
				) : (
					<HamburgerIcon fontSize="text-base" />
				)}
			</p>

			<p>
				<PizzaIcon fontSize="text-base" />:{numPizza}
			</p>
			<p>
				<HamburgerIcon fontSize="text-base" />:{numHamburger}
			</p>
		</>
	);
};

export default ScoreBoard;
