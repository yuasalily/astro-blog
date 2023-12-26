import type { ReactNode } from "react";

const ScoreInformation = ({
	icon,
	numStore,
	revenue,
	asset,
}: { icon: ReactNode; numStore: number; revenue: number; asset: number }) => {
	return (
		<div className="border-black border-2">
			<p>{icon}の情報</p>
			<p>店舗数:{numStore}</p>
			<p>1店舗当たりの店舗の売り上げ:{revenue}</p>
			<p>現金資産:{asset}</p>
		</div>
	);
};

export default ScoreInformation;
