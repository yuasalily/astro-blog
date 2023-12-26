import GameBoard from "@components/othello/GameBoard";
import ScoreBoard from "@components/othello/ScoreBoard";
import { BoardProvider } from "@components/othello/context/BoardContext";

const OthelloGame = () => {
	return (
		<>
			<BoardProvider>
				<GameBoard />
				<ScoreBoard />
			</BoardProvider>
		</>
	);
};

export default OthelloGame;
