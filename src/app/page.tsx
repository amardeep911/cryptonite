"use client";
import CoinList from "@/components/CoinLIst/CoinLIst";
import GlobalCoinChart from "@/components/globalCoinChart/globalCoinChart";
import RecentCoinList from "@/components/RecentCoinList/RecentCoinList";
import Watchlist from "@/components/Watchlist/Watchlist";

export default function Home() {
  const handleCoinDrag = (coin: any) => {
    console.log("Dragging coin:", coin);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-[70%,30%] h-[calc(100vh-6rem)] overflow-y-auto overflow-hidden">
      <div className="m-10 space-y-10">
        <GlobalCoinChart />
        <CoinList onCoinDrag={handleCoinDrag} />
      </div>
      <div className="p-5 flex flex-col gap-5 sticky top-0 h-[calc(100vh-6rem)] ">
        <div>
          <Watchlist />
        </div>
        <div>
          <RecentCoinList />
        </div>
      </div>
    </div>
  );
}
