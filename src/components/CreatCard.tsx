import type { Card } from "./CardType";
import { FcLike } from "react-icons/fc";
import { CiShare2 } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import GenProfile from "./GenPropile";
type prop = {
  img: Card;
};
const CreatCard: React.FC<prop> = ({ img }) => {
  const { id, alt, src } = img;

  return (
    <>
      <div className="container">
        <GenProfile /> 
        <div className="pick">
          <img src={src} alt={alt} />
        </div>
        <div className="buttom">
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
    </>
  );
};

export default CreatCard;
