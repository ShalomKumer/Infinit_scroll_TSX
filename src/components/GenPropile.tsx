import { useEffect, useState } from "react";
import type { profile } from "./Profile";
import { BsThreeDots } from "react-icons/bs";
import './headerStyles.css'

const GenProfile: React.FC = () => {
  const [prof, setProf] = useState<profile | null>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch("https://randomuser.me/api/?results=1");
        const data = await res.json();
        const user = data.results[0];

        const myProfile: profile = {
          title: user.name.title,
          first: user.name.first,
          last: user.name.last,
          img: user.picture.large,
          username: user.login.username,
        };

        setProf(myProfile);
      } catch (err) {
        console.log("ERROR:", err);
      }
    }
    getProfile();
  }, []);

return (
  <div className="post-header">
    <div className="profile-wrap">
      <div className="avatar-ring">
        <img className="avatar" src={prof?.img} alt={prof?.username} />
      </div>
      <div className="name-block">
        <div className="full-name">
          {prof?.first} {prof?.last}
        </div>
        <div className="username">@{prof?.username}</div>
      </div>
    </div>

    <button className="more-btn" aria-label="עוד אפשרויות">
      <BsThreeDots />
    </button>
  </div>
);

};

export default GenProfile;
