import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from "react-icons/fa";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const CoinPage = () => {
  const [coin, setCoin] = useState({});
  const params = useParams();
  const url =
    `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  useEffect(() => {
    Axios.get(url).then((response) => {
      setCoin(response.data);
      console.log(response.data);
    });
  }, [url]);

  return (
    <div className="rounded-div my-12 py-8">
      {/* Heading */}
      <div className="flex py-8">
        <img className="w-20 mr-8" src={coin.image?.large} alt="" />
        <div>
          <p className="text-3xl font-bold">{coin.name} price</p>
          <p>({coin.symbol?.toUpperCase()} / USD)</p>
        </div>
      </div>
      {/* Details */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between">
            {coin.market_data?.current_price ? (
              <p className="text-3xl font-bold">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
            ) : null}
            <p>7 Day</p>
          </div>
          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <p className="text-gray-500 text-sm">Market Cap</p>
            {coin.market_data?.market_cap ? (
              <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
            ) : null}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Volume (24h)</p>
            {coin.market_data?.market_cap ? (
              <p>${coin.market_data.total_volume.usd.toLocaleString()}</p>
            ) : null}
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">24h High</p>
              {coin.market_data?.high_24h ? (
                <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">24h Low</p>
              {coin.market_data?.low_24h ? (
                <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
        </div>
        {/* Marget Stats */}
        <div>
          <p className="text-xl font-bold">Market Stats</p>
          <div className="flex justify-between py-4">
            <div>
              <p>Market Rank</p>
              {coin.market_cap_rank}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hashing Algorithm</p>
              {coin.hashing_algorithm ? <p>{coin.hashing_algorithm}</p> : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Trust Score</p>
              {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (24h)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (7 Days)</p>
              {coin.market_data ? (
                <p>{coin.market_data.price_change_percentage_7d.toFixed(2)}%</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (14 Days)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_14d.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (30 Days)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (60 Days)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_60d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (1 Year)</p>
              {coin.market_data ? (
                <p>{coin.market_data.price_change_percentage_1y.toFixed(2)}%</p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-around p-10 text-accent">
            <FaFacebook />
            <FaReddit />
            <FaTwitter />
            <FaGithub />
          </div>
        </div>
      </div>

      {/* discription */}
      <div className="py-4">
        <p className="text-xl font-bold mb-4">About {coin.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin.description ? coin.description.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
  );
};

export default CoinPage;
