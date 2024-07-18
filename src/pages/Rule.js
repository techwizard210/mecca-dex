import React from "react";

import { shortenAddress } from "../utils/DataProvider";

function Rule() {
  return (
    <div className="flex justify-center text-white/50 mt-5">
      <div className="w-[800px] border border-[#242424] py-[40px] px-[40px] flex flex-col gap-3 tracking-wide">
        <div className="p-2">
          <h3 className="text-[20px]">1. Initial Collateral</h3> - Each trader
          is provided with $1,000,000 in collateral to begin trading.
        </div>
        <div className="p-2">
          <h3 className="text-[20px]">2. Trading Pairs</h3> - Traders can engage
          in long or short positions on ETH, utilizing real market prices for
          reference.
        </div>
        <div className="p-2">
          <h3 className="text-[20px]">3. Leverage</h3> - Traders can borrow from
          the pool with zero interest, leveraging up to 5x their initial
          collateral.
        </div>
        <div className="p-2">
          <h3 className="text-[20px]">4. Position Management</h3>
          <h4>
            - Manual Closure: Traders can close their positions manually at any
            time.
          </h4>
          <h4>
            - Automatic Closure: Positions will automatically close after 7
            trading days.
          </h4>
          <h4>
            - Margin Closure: Positions will close if they hit the margin limit.
          </h4>
        </div>
        <div className="p-2">
          <h3 className="text-[20px]">5. Profit and Loss</h3>- Paper Loss: Any
          losses incurred will be considered as paper losses. - Paper Profit:
          Any profits gained will be considered as paper profits.
        </div>
        <div className="p-2">
          <h3 className="text-[20px]">6. Prizes and Rewards</h3> - Top traders
          will be awarded access to the Mainnet and additional prizes based on
          their performance.
        </div>
        <div className="p-2">
          <h3 className="text-[20px]">7. Compliance and Ethics</h3> - All
          trading activities comply with Halal principles and ethical trading
          standards.
        </div>
      </div>
    </div>
  );
}

export default Rule;
