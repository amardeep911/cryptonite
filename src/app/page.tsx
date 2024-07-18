import CoinLIst from "@/components/CoinLIst/CoinLIst";
import GlobalCoinChart from "@/components/globalCoinChart/globalCoinChart";

export default function Home() {
  return (
    <div>
      <div className="m-10">
        <GlobalCoinChart />
      </div>
      <div className="m-10  ">
        <CoinLIst />
      </div>
    </div>
  );
}
