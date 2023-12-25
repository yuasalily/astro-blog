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

export { makeLegalBoard };
