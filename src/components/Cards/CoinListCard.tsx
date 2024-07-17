import React from "react";

type Props = {
  coin: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
  };
};

const CoinListCard: React.FC<Props> = ({ coin }) => {
  return <div>asfd</div>;
};

export default CoinListCard;
