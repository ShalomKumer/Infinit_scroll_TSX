import { useState, useEffect } from "react";
import type { Card } from "./CardType";
import CreatCard from "./CreatCard";

const HomePage: React.FC = () => {
  const [imgList, setImgList] = useState<Card[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=5`
        );
        let data = await res.json();

        const cards: Card[] = data.map((card: any) => ({
          id: card.id,
          alt: card.author,
          src: card.download_url,
        }));

        setImgList(cards);
        console.log("CARDS", cards);
      } catch (err) {
        return <h1>Sorry, can't fetch Data</h1>;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    
  }, []);

  return (
    <>
      {imgList.map((card) => (
        <CreatCard key={card.id} img={card} />
      ))}
    </>
  );
};

export default HomePage;
