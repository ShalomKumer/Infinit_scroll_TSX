import type { Card } from "./CardType";
import { FcLike } from "react-icons/fc";
import { CiShare2 } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import GenProfile from "./GenPropile";
import "./CardStyles.css";
type prop = {
  img: Card;
};
const CreatCard: React.FC<prop> = ({ img }) => {
  const { id, alt, src } = img;

  return (
    <>
      <div className="post">
        <GenProfile />
        <div className="post-card">
          <div className="pick">
            <img src={src} alt={alt} />
          </div>
          <div className="bottom">
            <div className="icons">
              <FcLike />
              <CiShare2 />
              <HiOutlineDotsVertical />
            </div>
            <div className="alt">
              <p>{alt}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatCard;
