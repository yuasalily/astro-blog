const Square = ({
	isPizza,
	isHamburger,
	isLegal,
	squareIndex,
}: {
	isPizza: boolean;
	isHamburger: boolean;
	isLegal: boolean;
	squareIndex: bigint;
}) => {
	let icon = null;
	if (isPizza) {
		icon = <i className="fa-solid fa-pizza-slice text-xl text-yellow-900" />;
	}
	if (isHamburger) {
		icon = <i className="fa-solid fa-burger text-xl text-red-900" />;
	}
	if (isLegal) {
		icon = <i className="fa-solid fa-person-digging text-xl text-gray-500" />;
	}
	return (
		<div className="aspect-square border-2 border-indigo-600 flex items-center justify-center">
			{icon}
		</div>
	);
};

export default Square;
