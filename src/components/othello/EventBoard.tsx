import {
	useEventText,
	useExpectedEventText,
} from "@components/othello/context/BoardContext";

import { type Event } from "@components/othello/eventList.ts";
import { type ReactNode } from "react";

import { ManagerIcon } from "@components/othello/Icons";

const formatEvent = (event: Event): ReactNode => {
	let revenueText = null;
	if (event.revenueChange > 0) {
		revenueText = (
			<div>
				1店舗当たりの店舗の売り上げが
				<span className="text-blue-800">{event.revenueChange}</span>増えました。
			</div>
		);
	} else if (event.revenueChange < 0) {
		revenueText = (
			<div>
				1店舗当たりの店舗の売り上げが
				<span className="text-red-800">{-event.revenueChange}</span>減りました。
			</div>
		);
	}
	let assetText = null;
	if (event.assetChange > 0) {
		assetText = (
			<div>
				現金資産が
				<span className="text-blue-800">{event.assetChange}</span>増えました。
			</div>
		);
	} else if (event.assetChange < 0) {
		assetText = (
			<div>
				現金資産が
				<span className="text-red-800">{-event.assetChange}</span>減りました。
			</div>
		);
	}
	return (
		<>
			<div className="text-2xl">
				<ManagerIcon fontSize="text-base" />
				による報告
			</div>
			<p>{event.text}</p>
			<p>{revenueText}</p>
			<p>{assetText}</p>
		</>
	);
};

const formatExpectedEvent = (event: Event): ReactNode => {
	const managerText = (
		<div className="text-2xl">
			<ManagerIcon fontSize="text-base" />
			による予想
		</div>
	);
	if (event.text === "") return <>{managerText}</>;
	if (event.revenueChange > 0) {
		return (
			<div>
				{managerText}
				<div>
					<span className="text-blue-800">いいこと</span>が起こる予感がします
				</div>
			</div>
		);
	}
	if (event.revenueChange < 0) {
		return (
			<div>
				{managerText}
				<div>
					<span className="text-red-800">よくないこと</span>が起こる予感がします
				</div>
			</div>
		);
	}
	return (
		<div>
			{managerText}
			<div>何が起こるかわかりません</div>
		</div>
	);
};

const EventBoard = () => {
	const event = useEventText();
	const expectedEvent = useExpectedEventText();
	return (
		<div className="flex flex-col space-y-2">
			<div className="h-16 w-96 border-2 border-gray-800">
				<div className="px-2">{formatExpectedEvent(expectedEvent)}</div>
			</div>
			<div className="h-36 w-96 border-2 border-gray-800">
				<div className="px-2">{formatEvent(event)}</div>
			</div>
		</div>
	);
};

export default EventBoard;
