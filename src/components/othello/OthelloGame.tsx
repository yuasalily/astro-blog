import EventBoard from "@components/othello/EventBoard";
import GameBoard from "@components/othello/GameBoard";
import ScoreBoard from "@components/othello/ScoreBoard";
import { BoardProvider } from "@components/othello/context/BoardContext";

const OthelloGame = () => {
	return (
		<>
			<BoardProvider>
				<GameBoard />
				<ScoreBoard />
				<EventBoard />
			</BoardProvider>
		</>
	);
};

export default OthelloGame;
