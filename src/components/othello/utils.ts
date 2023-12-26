// 一度に返せる石は6つ。自分の石から最大7マス目が空きマスならおける。
const makeLegalLineLeft = (
	watch: bigint,
	playerBoard: bigint,
	blankBoard: bigint,
	direction: bigint,
): bigint => {
	let tmp = watch & (playerBoard << direction);
	for (let i = 0; i < 5; i++) {
		tmp |= watch & (tmp << direction);
	}
	return blankBoard & (tmp << direction);
};

const makeLegalLineRight = (
	watch: bigint,
	playerBoard: bigint,
	blankBoard: bigint,
	direction: bigint,
): bigint => {
	let tmp = watch & (playerBoard >> direction);
	for (let i = 0; i < 5; i++) {
		tmp |= watch & (tmp >> direction);
	}
	return blankBoard & (tmp >> direction);
};

const makeLegalBoard = (playerBoard: bigint, opponentBoard: bigint): bigint => {
	// 横方向の番人
	const horizontalWatch = opponentBoard & 0x7e7e7e7e7e7e7e7en;
	// 縦方向の番人
	const verticalWatch = opponentBoard & 0x00ffffffffffff00n;
	// 全辺の番人
	const allSideWatch = opponentBoard & 0x007e7e7e7e7e7e00n;

	// 空きマス
	const blankBoard = ~(playerBoard | opponentBoard);

	// の順
	let legalBoard = makeLegalLineLeft(
		horizontalWatch,
		playerBoard,
		blankBoard,
		1n,
	);
	// 右
	legalBoard |= makeLegalLineRight(
		horizontalWatch,
		playerBoard,
		blankBoard,
		1n,
	);
	// 上
	legalBoard |= makeLegalLineLeft(verticalWatch, playerBoard, blankBoard, 8n);
	// 下
	legalBoard |= makeLegalLineRight(verticalWatch, playerBoard, blankBoard, 8n);
	// 右斜め上
	legalBoard |= makeLegalLineLeft(allSideWatch, playerBoard, blankBoard, 7n);
	// 左斜め上
	legalBoard |= makeLegalLineLeft(allSideWatch, playerBoard, blankBoard, 9n);
	// 右斜め下
	legalBoard |= makeLegalLineRight(allSideWatch, playerBoard, blankBoard, 9n);
	// 左斜め下
	legalBoard |= makeLegalLineRight(allSideWatch, playerBoard, blankBoard, 7n);

	return legalBoard;
};

const makeReversedBoard = (
	playerBoard: bigint,
	opponentBoard: bigint,
	put: bigint,
) => {
	let reversedBoard = 0n;
	// 8方向計算
	for (let k = 0; k < 8; k++) {
		let reversedLine = 0n;
		let mask = shiftSquare(put, k);
		while (mask !== 0n && (mask & opponentBoard) !== 0n) {
			reversedLine |= mask;
			mask = shiftSquare(mask, k);
		}
		if ((mask & playerBoard) !== 0n) {
			reversedBoard |= reversedLine;
		}
	}
	return reversedBoard;
};

const shiftSquare = (put: bigint, k: number): bigint => {
	switch (k) {
		case 0: //上
			return (put << 8n) & 0xffffffffffffff00n;
		case 1: //右上
			return (put << 7n) & 0x7f7f7f7f7f7f7f00n;
		case 2: //右
			return (put >> 1n) & 0x7f7f7f7f7f7f7f7fn;
		case 3: //右下
			return (put >> 9n) & 0x007f7f7f7f7f7f7fn;
		case 4: //下
			return (put >> 8n) & 0x00ffffffffffffffn;
		case 5: //左下
			return (put >> 7n) & 0x00fefefefefefefen;
		case 6: //左
			return (put << 1n) & 0xfefefefefefefefen;
		case 7: //左上
			return (put << 9n) & 0xfefefefefefefe00n;
		default:
			throw new Error("invalid k");
	}
};

const getSquareIndexBit = (squareIndex: bigint): bigint => 1n << squareIndex;

const checkGame = (bitBoard1: bigint, bitBoard2: bigint): boolean => {
	const legalBoard1 = makeLegalBoard(bitBoard1, bitBoard2);
	const legalBoard2 = makeLegalBoard(bitBoard2, bitBoard1);
	if (legalBoard1 === 0n && legalBoard2 === 0n) return true;
	return false;
};

const popCount = (bitBoard: bigint): bigint => {
	let count = 0n;
	for (let i = 0n; i < 64n; i++) {
		count += (bitBoard >> i) & 1n;
	}
	return count;
};

const isPizzaTurn = (turn: number): boolean => {
	return turn % 2 === 0;
};

export {
	getSquareIndexBit,
	makeLegalBoard,
	makeReversedBoard,
	checkGame,
	isPizzaTurn,
};
