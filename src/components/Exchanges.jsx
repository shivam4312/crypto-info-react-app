import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index.js";
import Loading from "./Loading.jsx";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page,setPage] =useState(1);
    const pageChange = (page) => {
      setPage(page);
      setLoading(true);
    };

    const btns = new Array(5).fill(1);

  useEffect(() => {
    const fetechExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?&page=${page}`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetechExchanges();
  }, [page]);

if(error) return <ErrorComponent message={"Error while fetching exchanges"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangesCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflow={"auto"} p={8} justifyContent={"center"}>
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

const ExchangesCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      p={"8"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
      bgColor={"whiteAlpha.200"}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchanges"}
      ></Image>
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>

);

export default Exchanges;
