import { useState, useEffect } from "react";
import type { Card } from "./CardType";
import CreatCard from "./CreatCard";

const HomePage: React.FC = () => {
  const [imgList, setImgList] = useState<Card[]>([]);
  let page = 1;

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=7`);
      let data = await res.json();

      const cards: Card[] = data.map((card: any) => ({
        id: card.id,
        alt: card.author,
        src: card.download_url, 
      }));

      setImgList(cards);
      console.log("CARDS", cards);
    };
    fetchData();
  }, []);

  return( 
  <>
    {imgList.map((card) => {
        <CreatCard img={card} />
    })}
  </>
  )
};

export default HomePage;
