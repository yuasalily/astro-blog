import { useState } from "react";

const ManageState = () => {
	const [toggle, setToggle] = useState(true);
	const [countA, setCountA] = useState(0);
	const [countB, setCountB] = useState(0);

	const changeToggle = () => {
		setToggle((prev) => !prev);
	};
	return (
		<>
			<p>
				コンポーネントが消滅する可能性がある時、複数のコンポーネントでstateを共有したいとき、propsでstateを渡す。
			</p>
			<button type="button" onClick={changeToggle}>
				toggle
			</button>
			{toggle ? (
				<Counter key={"A"} title={"A"} count={countA} setCount={setCountA} />
			) : (
				<Counter key={"B"} title={"B"} count={countB} setCount={setCountB} />
			)}
		</>
	);
};

const Counter = ({ title, count, setCount }) => {
	return (
		<>
			<p>
				{title}:{count}
			</p>
			<button
				type="button"
				onClick={() => {
					setCount((prev) => prev + 1);
				}}
			>
				+{title}
			</button>
		</>
	);
};

export default ManageState;
