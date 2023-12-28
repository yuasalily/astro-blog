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
	checkGame,
	isPizzaTurn,
	popCount,
} from "@components/othello/utils";

const ScoreBoard = () => {
	const pizzaIcon = <PizzaIcon fontSize="text-base" />;
	const hamburgerIcon = <HamburgerIcon fontSize="text-base" />;

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

	const pizzaScore = calculateScore(numPizza, pizzaRevenue, pizzaAsset);
	const hamburgerScore = calculateScore(
		numHamburger,
		hamburgerRevenue,
		hamburgerAsset,
	);

	const finished = checkGame(pizzaBoard, hamburgerBoard);
	let playerInformation = null;
	if (finished) {
		alert("ゲームが終了しました。");
		if (pizzaScore === hamburgerScore) {
			playerInformation = "引き分けです";
		} else if (pizzaScore > hamburgerScore) {
			playerInformation = <>{pizzaIcon}の勝ちです</>;
		} else {
			playerInformation = <>{hamburgerIcon}の勝ちです</>;
		}
	} else {
		playerInformation = (
			<>次のプレイヤー:{pizzaIsNext ? pizzaIcon : hamburgerIcon}</>
		);
	}

	return (
		<>
			<GameInformation
				pizzaIcon={pizzaIcon}
				hamburgerIcon={hamburgerIcon}
				pizzaScore={pizzaScore}
				hamburgerScore={hamburgerScore}
				pizzaIsNext={pizzaIsNext}
				playerInformation={playerInformation}
			/>

			<ScoreInformation
				icon={pizzaIcon}
				numStore={numPizza}
				revenue={pizzaRevenue}
				asset={pizzaAsset}
			/>

			<ScoreInformation
				icon={hamburgerIcon}
				numStore={numHamburger}
				revenue={hamburgerRevenue}
				asset={hamburgerAsset}
			/>
		</>
	);
};

export default ScoreBoard;
