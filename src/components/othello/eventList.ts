// 発生するイベント一覧。jsonとかにするべきな気もするけど扱いが楽なのでオブジェクトで管理する。
type Event = { text: string; revenueChange: number; assetChange: number };

const EventList: Event[] = [
	{ text: "ライバル店ができました。", revenueChange: -10, assetChange: 0 },
	{ text: "ライバル店がつぶれました。", revenueChange: 10, assetChange: 0 },
];

const getEvent = () => {
	return EventList[Math.floor(Math.random() * EventList.length)];
};

export { getEvent, type Event };
