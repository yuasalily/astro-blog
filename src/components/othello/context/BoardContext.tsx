import { createContext, useContext, useReducer, type ReactNode } from "react";

const initialPizzaBoard =
	0b00000000_00000000_00000000_00001000_00010000_00000000_00000000_00000000n;
const initialHamburgerBoard =
	0b00000000_00000000_00000000_00010000_00001000_00000000_00000000_00000000n;

const PizzaBoardContext = createContext<bigint>(initialPizzaBoard);
const PizzaBoardDispatchContext = createContext(() => {});

const HamburgerBoardContext = createContext(initialHamburgerBoard);
const HamburgerBoardDispatchContext = createContext(() => {});

const TurnContext = createContext(0n);
const TurnDispatchContext = createContext(() => {});

const BoardProvider = ({ children }: { children: ReactNode }) => {
	const [pizzaBoard, pizzaBoardDispatch] = useReducer((prev, action) => {
		return initialPizzaBoard;
	}, initialPizzaBoard);
	const [hamburgerBoard, hamburgerBoardDispatch] = useReducer(
		(prev, action) => {
			return initialHamburgerBoard;
		},
		initialHamburgerBoard,
	);
	const [turn, turnDispatch] = useReducer((prev, action) => {
		switch (action) {
			case "initialize":
				return 0;
			case "next":
				return prev + 1;
			default:
				throw new Error("invalid turn action");
		}
	}, 0n);
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

export {
	BoardProvider,
	useHamburgerBoard,
	useHamburgerBoardDispatch,
	usePizzaBoard,
	usePizzaBoardDispatch,
};
