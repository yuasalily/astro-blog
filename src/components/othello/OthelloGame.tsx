import EventBoard from "@components/othello/EventBoard";
import GameBoard from "@components/othello/GameBoard";
import GameController from "@components/othello/GameController";
import HowToPlayBoard from "@components/othello/HowToPlayBoard";
import ScoreBoard from "@components/othello/ScoreBoard";
import { BoardProvider } from "@components/othello/context/BoardContext";

const OthelloGame = () => {
	return (
		<>
			<BoardProvider>
				<div className="flex justify-center w-3/4">
					<div>
						<div className="p-2">
							<GameBoard />
						</div>
						<div className="p-2">
							<EventBoard />
						</div>
					</div>
					<div>
						<ScoreBoard />
						<GameController />
					</div>
					<div>
						<HowToPlayBoard />
					</div>
				</div>
			</BoardProvider>
		</>
	);
};

export default OthelloGame;