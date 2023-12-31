import {
	createContext,
	useContext,
	useReducer,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react";

import { type Event } from "@components/othello/eventList";

type BoardDispatchType = Dispatch<{ type: string; payload: bigint }>;
type TurnDispatchType = Dispatch<string>;
type RevenueDispatchType = Dispatch<{ type: string; payload: number }>;
type AssetDispatchType = Dispatch<{ type: string; payload: number }>;
type SetEventTextType = Dispatch<SetStateAction<Event>>;
type SetMatchSettingType = Dispatch<SetStateAction<number>>;

const initialPizzaBoard =
	0b00000000_00000000_00000000_00001000_00010000_00000000_00000000_00000000n;
const initialHamburgerBoard =
	0b00000000_00000000_00000000_00010000_00001000_00000000_00000000_00000000n;

const initialRevenue = 1000;
const initialAsset = 10000;

const PizzaBoardContext = createContext(initialPizzaBoard);
const PizzaBoardDispatchContext = createContext<BoardDispatchType>(() => {});

const HamburgerBoardContext = createContext(initialHamburgerBoard);
const HamburgerBoardDispatchContext = createContext<BoardDispatchType>(
	() => {},
);

const TurnContext = createContext(0);
const TurnDispatchContext = createContext<TurnDispatchType>(() => {});

const PizzaRevenueContext = createContext(initialRevenue);
const PizzaRevenueDispatchContext = createContext<RevenueDispatchType>(
	() => {},
);

const HamburgerRevenueContext = createContext(initialRevenue);
const HamburgerRevenueDispatchContext = createContext<RevenueDispatchType>(
	() => {},
);

const PizzaAssetContext = createContext(initialAsset);
const PizzaAssetDispatchContext = createContext<AssetDispatchType>(() => {});

const HamburgerAssetContext = createContext(initialAsset);
const HamburgerAssetDispatchContext = createContext<AssetDispatchType>(
	() => {},
);

const EventTextContext = createContext({
	text: "",
	revenueChange: 0,
	assetChange: 0,
});
const SetEventTextContext = createContext<SetEventTextType>(() => {});

const ExpectedEventTextContext = createContext({
	text: "",
	revenueChange: 0,
	assetChange: 0,
});
const SetExpectedEventTextContext = createContext<SetEventTextType>(() => {});

const MatchSetting = createContext(0);
const SetMatchSetting = createContext<SetMatchSettingType>(() => {});

const BoardProvider = ({ children }: { children: ReactNode }) => {
	const [pizzaBoard, pizzaBoardDispatch] = useReducer(
		(prev: bigint, { type, payload }: { type: string; payload: bigint }) => {
			switch (type) {
				case "initialize":
					return initialPizzaBoard;
				case "update":
					return prev ^ payload;
				default:
					throw new Error("invalid type");
			}
		},
		initialPizzaBoard,
	);
	const [hamburgerBoard, hamburgerBoardDispatch] = useReducer(
		(prev: bigint, { type, payload }: { type: string; payload: bigint }) => {
			switch (type) {
				case "initialize":
					return initialHamburgerBoard;
				case "update":
					return prev ^ payload;
				default:
					throw new Error("invalid type");
			}
		},
		initialHamburgerBoard,
	);
	const [turn, turnDispatch] = useReducer((prev: number, action: string) => {
		switch (action) {
			case "initialize":
				return 0;
			case "next":
				return prev + 1;
			default:
				throw new Error("invalid turn action");
		}
	}, 0);
	const [pizzaRevenue, pizzaRevenueDispatch] = useReducer(
		(prev: number, { type, payload }: { type: string; payload: number }) => {
			switch (type) {
				case "initialize":
					return initialRevenue;
				case "update":
					return prev + payload;
				default:
					throw new Error("invalid revenue action");
			}
		},
		initialRevenue,
	);
	const [hamburgerRevenue, hamburgerRevenueDispatch] = useReducer(
		(prev: number, { type, payload }: { type: string; payload: number }) => {
			switch (type) {
				case "initialize":
					return initialRevenue;
				case "update":
					return prev + payload;
				default:
					throw new Error("invalid revenue action");
			}
		},
		initialRevenue,
	);
	const [pizzaAsset, pizzaAssetDispatch] = useReducer(
		(prev: number, { type, payload }: { type: string; payload: number }) => {
			switch (type) {
				case "initialize":
					return initialAsset;
				case "update":
					return prev + payload;
				default:
					throw new Error("invalid asset action");
			}
		},
		initialAsset,
	);
	const [hamburgerAsset, hamburgerAssetDispatch] = useReducer(
		(prev: number, { type, payload }: { type: string; payload: number }) => {
			switch (type) {
				case "initialize":
					return initialAsset;
				case "update":
					return prev + payload;
				default:
					throw new Error("invalid asset action");
			}
		},
		initialAsset,
	);

	const [eventText, setEventText] = useState({
		text: "",
		revenueChange: 0,
		assetChange: 0,
	});
	const [expectedEventText, setExpectedEventText] = useState({
		text: "",
		revenueChange: 0,
		assetChange: 0,
	});

	const [matchSetting, setMatchSetting] = useState(0);
	return (
		<PizzaBoardContext.Provider value={pizzaBoard}>
			<PizzaBoardDispatchContext.Provider value={pizzaBoardDispatch}>
				<HamburgerBoardContext.Provider value={hamburgerBoard}>
					<HamburgerBoardDispatchContext.Provider
						value={hamburgerBoardDispatch}
					>
						<TurnContext.Provider value={turn}>
							<TurnDispatchContext.Provider value={turnDispatch}>
								<PizzaRevenueContext.Provider value={pizzaRevenue}>
									<PizzaRevenueDispatchContext.Provider
										value={pizzaRevenueDispatch}
									>
										<HamburgerRevenueContext.Provider value={hamburgerRevenue}>
											<HamburgerRevenueDispatchContext.Provider
												value={hamburgerRevenueDispatch}
											>
												<PizzaAssetContext.Provider value={pizzaAsset}>
													<PizzaAssetDispatchContext.Provider
														value={pizzaAssetDispatch}
													>
														<HamburgerAssetContext.Provider
															value={hamburgerAsset}
														>
															<HamburgerAssetDispatchContext.Provider
																value={hamburgerAssetDispatch}
															>
																<EventTextContext.Provider value={eventText}>
																	<SetEventTextContext.Provider
																		value={setEventText}
																	>
																		<ExpectedEventTextContext.Provider
																			value={expectedEventText}
																		>
																			<SetExpectedEventTextContext.Provider
																				value={setExpectedEventText}
																			>
																				<MatchSetting.Provider
																					value={matchSetting}
																				>
																					<SetMatchSetting.Provider
																						value={setMatchSetting}
																					>
																						{children}
																					</SetMatchSetting.Provider>
																				</MatchSetting.Provider>
																			</SetExpectedEventTextContext.Provider>
																		</ExpectedEventTextContext.Provider>
																	</SetEventTextContext.Provider>
																</EventTextContext.Provider>
															</HamburgerAssetDispatchContext.Provider>
														</HamburgerAssetContext.Provider>
													</PizzaAssetDispatchContext.Provider>
												</PizzaAssetContext.Provider>
											</HamburgerRevenueDispatchContext.Provider>
										</HamburgerRevenueContext.Provider>
									</PizzaRevenueDispatchContext.Provider>
								</PizzaRevenueContext.Provider>
							</TurnDispatchContext.Provider>
						</TurnContext.Provider>
					</HamburgerBoardDispatchContext.Provider>
				</HamburgerBoardContext.Provider>
			</PizzaBoardDispatchContext.Provider>
		</PizzaBoardContext.Provider>
	);
};

const usePizzaBoard = () => useContext(PizzaBoardContext);
const usePizzaBoardDispatch = () => useContext(PizzaBoardDispatchContext);

const useHamburgerBoard = () => useContext(HamburgerBoardContext);
const useHamburgerBoardDispatch = () =>
	useContext(HamburgerBoardDispatchContext);

const useTurn = () => useContext(TurnContext);
const useTurnDispatch = () => useContext(TurnDispatchContext);

const usePizzaRevenue = () => useContext(PizzaRevenueContext);
const usePizzaRevenueDispatch = () => useContext(PizzaRevenueDispatchContext);

const useHamburgerRevenue = () => useContext(HamburgerRevenueContext);
const useHamburgerRevenueDispatch = () =>
	useContext(HamburgerRevenueDispatchContext);

const usePizzaAsset = () => useContext(PizzaAssetContext);
const usePizzaAssetDispatch = () => useContext(PizzaAssetDispatchContext);

const useHamburgerAsset = () => useContext(HamburgerAssetContext);
const useHamburgerAssetDispatch = () =>
	useContext(HamburgerAssetDispatchContext);

const useEventText = () => useContext(EventTextContext);
const useSetEventText = () => useContext(SetEventTextContext);

const useExpectedEventText = () => useContext(ExpectedEventTextContext);
const useSetExpectedEventText = () => useContext(SetExpectedEventTextContext);

const useMatchSetting = () => useContext(MatchSetting);
const useSetMatchSetting = () => useContext(SetMatchSetting);

export {
	BoardProvider,
	useEventText,
	useExpectedEventText,
	useHamburgerAsset,
	useHamburgerAssetDispatch,
	useHamburgerBoard,
	useHamburgerBoardDispatch,
	useHamburgerRevenue,
	useHamburgerRevenueDispatch,
	useMatchSetting,
	usePizzaAsset,
	usePizzaAssetDispatch,
	usePizzaBoard,
	usePizzaBoardDispatch,
	usePizzaRevenue,
	usePizzaRevenueDispatch,
	useSetEventText,
	useSetExpectedEventText,
	useSetMatchSetting,
	useTurn,
	useTurnDispatch,
};
