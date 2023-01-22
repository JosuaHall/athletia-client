//not used
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialIcons = () => {
  return (
    <div className="socialmedia">
      <h3>Social</h3>
      <p>97% of users attach socials!</p>
      <div className="social-icons">
        <div className="social-area">
          <a target="_blank" href="http://instagram.com">
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              size="3x"
              color="rgb(195, 42, 163)"
              className="social"
            />
          </a>
          <input className="input" type="text" />
        </div>
        <div className="social-area">
          <a target="_blank" href="http://facebook.com">
            <FontAwesomeIcon
              icon={["fab", "facebook"]}
              size="3x"
              color="rgb(24, 119, 242)"
              className="social"
            />
          </a>
          <input className="input" type="text" />
        </div>
        <div className="social-area">
          <a target="_blank" href="http://snapchat.com">
            <FontAwesomeIcon
              icon={["fab", "snapchat"]}
              size="3x"
              color="rgb(255,240,0)"
              className="social"
            />
          </a>
          <input className="input" type="text" />
        </div>
        <div className="social-area">
          <a target="_blank" href="http://gmail.google.com">
            <FontAwesomeIcon
              icon={["fab", "google"]}
              size="3x"
              color="rgb(219, 68, 55)"
              className="social"
            />
          </a>
          <input className="input" type="text" />
        </div>
      </div>
    </div>
  );
};

export default SocialIcons;
