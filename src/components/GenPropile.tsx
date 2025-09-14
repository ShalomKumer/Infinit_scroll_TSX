import { useEffect, useState } from "react";
import type { profile } from "./Profile";
import { BsThreeDots } from "react-icons/bs";
import './headerStyles.css'

const GenProfile: React.FC = () => {
  const [prof, setProf] = useState<profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

return (
  <>
    <div className="post-header">
      <div className="profile-wrap">
        <div className="avatar-ring">
          <img 
            className="avatar" 
            src={prof?.img} 
            alt={prof?.username}
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
          />
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

    {isModalOpen && (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content">
          <button className="modal-close" onClick={handleCloseModal}>×</button>
          <div className="modal-profile">
            <img 
              className="modal-avatar" 
              src={prof?.img} 
              alt={prof?.username}
            />
            <div className="modal-name">
              {prof?.title} {prof?.first} {prof?.last}
            </div>
            <div className="modal-username">@{prof?.username}</div>
          </div>
        </div>
      </div>
    )}
  </>
);

};

export default GenProfile;
//אני רוצה שתעשה שהתמונת פרופיל תהיה כפתור שברגע שלוחצים עליו נפתח דיאלוג שרואים את תמונת פרופיל בגדול + שם +ושם ושם משפחה 