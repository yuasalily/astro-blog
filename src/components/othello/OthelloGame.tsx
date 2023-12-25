import GameBoard from "@components/othello/GameBoard";
import { BoardProvider } from "@components/othello/context/BoardContext";

const OthelloGame = () => {
	return (
		<>
			<BoardProvider>
				<GameBoard />
			</BoardProvider>
		</>
	);
};

export default OthelloGame;
