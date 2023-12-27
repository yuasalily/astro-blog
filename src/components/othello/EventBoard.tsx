import {
	useEventText,
	useExpectedEventText,
} from "@components/othello/context/BoardContext";

const EventBoard = () => {
	const eventText = useEventText();
	const expectedEventText = useExpectedEventText();
	return (
		<div>
			<p>{expectedEventText}</p>
			<p>{eventText}</p>
		</div>
	);
};

export default EventBoard;
