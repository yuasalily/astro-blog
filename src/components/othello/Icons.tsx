const PizzaIcon = ({ fontSize }: { fontSize: string }) => {
	const className = `fa-solid fa-pizza-slice text-yellow-900 ${fontSize}`;
	return <i className={className} />;
};

const HamburgerIcon = ({ fontSize }: { fontSize: string }) => {
	const className = `fa-solid fa-burger text-green-900 ${fontSize}`;
	return <i className={className} />;
};

const LegalIcon = ({ fontSize }: { fontSize: string }) => {
	const className = `fa-solid fa-person-digging text-gray-500 ${fontSize}`;
	return <i className={className} />;
};

const ManagerIcon = ({ fontSize }: { fontSize: string }) => {
	const className = `fa-solid fa-user-tie ${fontSize}`;
	return <i className={className} />;
};

export { HamburgerIcon, LegalIcon, ManagerIcon, PizzaIcon };
