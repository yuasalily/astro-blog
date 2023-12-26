import { createContext, useContext, useReducer, type ReactNode } from "react";

const initialPizzaBoard =
	0b00000000_00000000_00000000_00001000_00010000_00000000_00000000_00000000n;
const initialHamburgerBoard =
	0b00000000_00000000_00000000_00010000_00001000_00000000_00000000_00000000n;

const PizzaBoardContext = createContext<bigint>(initialPizzaBoard);
const PizzaBoardDispatchContext = createContext(() => {});

const HamburgerBoardContext = createContext(initialHamburgerBoard);
const HamburgerBoardDispatchContext = createContext(() => {});

const TurnContext = createContext(0);
const TurnDispatchContext = createContext(() => {});

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
	return (
		<PizzaBoardContext.Provider value={pizzaBoard}>
			<PizzaBoardDispatchContext.Provider value={pizzaBoardDispatch}>
				<HamburgerBoardContext.Provider value={hamburgerBoard}>
					<HamburgerBoardDispatchContext.Provider
						value={hamburgerBoardDispatch}
					>
						<TurnContext.Provider value={turn}>
							<TurnDispatchContext.Provider value={turnDispatch}>
								{children}
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

export {
	BoardProvider,
	useHamburgerBoard,
	useHamburgerBoardDispatch,
	usePizzaBoard,
	usePizzaBoardDispatch,
	useTurn,
	useTurnDispatch,
};
