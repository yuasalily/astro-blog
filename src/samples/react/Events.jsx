import { useState } from "react";

const Events = () => {
	const [state, setState] = useState("");
	return (
		<>
			<label>入力値のイベント</label>
			<input
				type="text"
				onChange={() => setState("入力値が変更されました")}
				onBlur={() => setState("フォーカスが外れました")}
				onFocus={() => setState("フォーカスされました")}
			/>
			<div
				onMouseEnter={() => setState("カーソルが入りました!(^^)!")}
				onMouseLeave={() => setState("カーソルが出ました( ;∀;)")}
			>
				ホバーしてね
			</div>

			<p>状態:{state}</p>
		</>
	);
};

export default Events;
