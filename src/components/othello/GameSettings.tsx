import { createContext, useContext } from "react";

const GameSettingsContext = createContext({
	height: 8,
	width: 8,
});

const SquareStateContext = createContext({
	Empty: 0,
	Pizza: 1,
	Hamburger: 2,
	Ligal: 3,
} as const);

export type SquareStateType = 0 | 1 | 2 | 3;

export const getSettings = () => useContext(GameSettingsContext);
export const getSquareState = () => useContext(SquareStateContext);
