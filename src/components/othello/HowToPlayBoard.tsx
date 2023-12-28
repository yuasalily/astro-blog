import {
	HamburgerIcon,
	LegalIcon,
	ManagerIcon,
	PizzaIcon,
} from "@components/othello/Icons";
const HowToPlayBoard = () => {
	const pizzaIcon = <PizzaIcon fontSize="text-base" />;
	const hamburgerIcon = <HamburgerIcon fontSize="text-base" />;
	const legalIcon = <LegalIcon fontSize="text-base" />;
	const managerIcon = <ManagerIcon fontSize="text-base" />;

	return (
		<div className="pl-2 flex flex-col space-y-2 w-96">
			<div>
				<h3 className="text-4xl">ルール説明</h3>
				<div>一言でいうと運の要素が入ったオセロです。</div>
			</div>
			<div>
				<h4 className="text-2xl">ルール概要</h4>
				<div>
					先手と後手はそれぞれ{pizzaIcon}と{hamburgerIcon}
					を販売する飲食店を経営しています。
					ゲーム終了時に総資産が多かった方の勝ちです。 総資産は
					<div className="font-bold">
						1店舗当たりの店舗の売り上げ×店舗数+現金資産
					</div>
					で計算されます。店舗数はオセロと同じルールで増やすことができます。
					店舗を建築するごとにイベントが発生し、1店舗当たりの店舗の売り上げ及び現金資産が増減します。
				</div>
			</div>
			<div>
				<h4 className="text-2xl">ゲームの要素</h4>
				<div>
					{pizzaIcon}と{hamburgerIcon}:それぞれの店舗
				</div>
				<div>{legalIcon}:次に建築可能な位置</div>
				<div>
					{managerIcon}
					による予想:そこに建築するとどうなりそうか教えてくれます。信じるかはあなた次第です。
				</div>
				<div>
					{managerIcon}による報告:建築したらとどうなったか教えてくれます。
				</div>
			</div>
			<div>
				<h4 className="text-2xl">世界観(ChatGPT作)</h4>
				<div>
					「味の争い」では、2つの飲食店を経営し、総資産でライバルを上回りましょう。評価サイト、食材価格変動、季節イベントなどで競り合い、興行街の食の王者を目指します。
					独自のメニュー開発と戦略で、あなたの店をトップに押し上げましょう！
				</div>
			</div>
		</div>
	);
};

export default HowToPlayBoard;
