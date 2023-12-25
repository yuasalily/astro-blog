import { getSquareState } from '@components/othello/GameSettings';

const State = {
	Available: "0",
	Player: "1",
	Opponent: "2",
};

interface Position {
	left: number;
	right: number;
}

/**
 * それぞれのマスごとにひっくり返すことのできるマスを返す。
 * 一方向しか計算しないのでreverseしたものを渡して双方向文計算する
 * @param line ボードの1行
 */
const changable = (line: string): number[] => {
	const result: number[] = [];
	for (let i = 0; i < line.length; i++) {
		let changableCount = 0;
		if (line[i] === State.Available) {
			for (let j = i + 1; j < line.length; j++) {
				if (line[j] === State.Opponent) {
					continue;
				}
				if (line[j] === State.Player) {
					changableCount = j - i - 1;
					break;
				}
				if (line[j] === State.Available) {
					break;
				}
			}
		}

		result.push(changableCount);
	}

	return result;
};

class LegalSquare {
	/**
	 * 0: 空きマス
	 * 1: 自分のマス
	 * 2: 相手のマス
	 */
	numState = 3;
	legalSquare: Position[][];
	constructor(boardLength: number) {
		this.legalSquare = Array(this.numState ** boardLength).fill(null);
		for (let i = 0; i < this.numState ** boardLength; i++) {
			const line = (
				State.Available.repeat(boardLength) + i.toString(this.numState)
			).slice(-boardLength);
			const reversedLine = line.split("").reverse().join("");
			const changableSquareRight = changable(line);
			const changableSquareLeft = changable(reversedLine).reverse();
			this.legalSquare[i] = changableSquareRight.map((s, i) => ({
				right: s,
				left: changableSquareLeft[i],
			}));
		}
	}

	getLegalSquare(i: number): Position[] {
		return this.legalSquare[i];
	}
}

const getNextPlayer = (turn: number) => {
	const SquareState = getSquareState()
	if (turn % 2 === 0) return SquareState.Hamburger;
	else return SquareState.Pizza;
}

export { LegalSquare, getNextPlayer };
