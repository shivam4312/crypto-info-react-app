import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index.js";
import Loading from "./Loading.jsx";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard.jsx";

const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const pageChange = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetechCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetechCoins();
  }, [currency,page]);

  if (error) return <ErrorComponent message={"Error while fetching coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"eur"}>EUR</Radio>
              <Radio value={"usd"}>USD</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflow={"auto"} p={8}>
            {btns.map((item, idx) => (
              <Button
                key={idx}
                bgColor={"black"}
                color={"white"}
                onClick={() => pageChange(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coin;
