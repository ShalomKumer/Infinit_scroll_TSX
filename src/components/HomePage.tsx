import { useState, useEffect, useRef } from "react";
import type { Card } from "./CardType";
import CreatCard from "./CreatCard";

const LIMIT = 7;
const THRESHOLD = 250; // כמה פיקסלים לפני התחתית להתחיל טעינה

const HomePage: React.FC = () => {
  const [imgList, setImgList] = useState<Card[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // דגל פנימי למניעת מירוצים (קריאות כפולות במקביל)
  const inFlightRef = useRef(false);

  async function fetchPage(pageNum: number) {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=${LIMIT}`);
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();

      const batch: Card[] = data.map((card: any) => ({
        id: String(card.id) + "-" + pageNum,
        alt: card.author,
        src: card.download_url,
      }));

      setImgList(prev => [...prev, ...batch]);
      setHasMore(batch.length === LIMIT);
    } 
    catch (e) {
      setError("אירעה שגיאה בטעינת נתונים");
    } 
    finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  }
  useEffect(() => {
    fetchPage(page);
  }, [])

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrolled = window.innerHeight + window.scrollY;
        const full = document.documentElement.scrollHeight;

        const atBottom = scrolled >= full - THRESHOLD;
        if (atBottom && !loading && hasMore) {
          const next = page + 1;
          setPage(next);
          fetchPage(next);
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, hasMore]);

  return (
    <>
      {imgList.map(card => (
        <CreatCard key={card.id} img={card} />
      ))}

      {loading && <p style={{ textAlign: "center", margin: 12 }}>טוען עוד…</p>}

      {error && (
        <div style={{ textAlign: "center", margin: 12 }}>
          <p>{error}</p>
          <button onClick={() => fetchPage(page)}>נסה שוב</button>
        </div>
      )}

      {!hasMore && !loading && (
        <p style={{ textAlign: "center", margin: 12, color: "#6b7280" }}>
          הגעת לסוף.
        </p>
      )}
    </>
  );
};

export default HomePage;
