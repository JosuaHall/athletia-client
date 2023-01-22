import React from "react";
import pic from "../pictures/example.png";
import pic2 from "../pictures/athletia_logo.png";
import { Link } from "react-router-dom";

export default function InformationPage() {
  return (
    <div className="information-page-layout">
      <div className="information-page-left">
        <div>
          <h2 className="mb-3">
            <img className="athletia-logo" src={pic2} width="100px" />
          </h2>
          <h4 className="mb-3">
            See who's going to sports<br></br>events on campus!
          </h4>
        </div>
        <div>
          <p className="mb-3">
            Find out which friends are attending the<br></br>
            upcoming basketball game and let others know<br></br>
            which games you're going to
          </p>
          <ul>
            <li>
              <Link to="/register" className="">
                Sign up
              </Link>
            </li>
            <li>Follow your favorite teams</li>
            <li>See who's going to which events</li>
          </ul>
        </div>
      </div>
      <div className="information-page-layout-right">
        <h3>
          "Sam, Alex and Emma are all going to see Thursday's volleyball game on
          campus"
        </h3>
        <img src={pic} className="example-pic" alt="" />
      </div>
    </div>
  );
}
