import { useState } from "react";
const Example = () => {
	const [count, setCount] = useState(0);
	const a = 1;

	return (
		<>
			<h1 className="text-red-700">Counter App</h1>
			<h2 className="text-blue-700">{count}</h2>
			<button type="button" onClick={() => setCount(count + 1)}>
				+ number1
			</button>
		</>
	);
};

export default Example;
