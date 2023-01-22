//currently not used
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import EventCard from "./EventCard";
import EventAmenities from "./EventAmenities";
import Attendance from "./Attendance";
import Media from "./common/media";
import logo from "../pictures/csup.png";
import logo2 from "../pictures/colorado-mines.svg";
import logo3 from "../pictures/adam.png";
import { connect } from "react-redux";
import SampleNextArrow from "./SampleNextArrow";

import PropTypes from "prop-types";

class SimpleSlider extends Component {
  state = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    dots: true,
    adaptiveHeight: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SampleNextArrow />,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
    getAllOrganizations: PropTypes.func.isRequired,
    setCurrentOrganization: PropTypes.func.isRequired,
    setCurrentTeam: PropTypes.func.isRequired,
  };

  /*sampleNextArrow = (props) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{
          ...style,
          colorAdjust: "black",
          color: "transparent",
          right: "-50px",
          width: "26px",
          height: "26px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20%",
          background: "grey",
        }}
        onClick={onClick}
      />
    );
  };

  samplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          left: "-50px",
          width: "26px",
          height: "26px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20%",
          background: "grey",
        }}
        onClick={onClick}
      />
    );
  };*/

  render() {
    return (
      <React.Fragment>
        <Slider {...this.state}>
          {this.props.team.selected_team.events.map((event) => (
            <div className="event-card-layout">
              <div className="attend-area">
                <button className="attend-button">going</button>
                <button className="unattend-button">not going</button>
              </div>
              <div className="event-card-date">
                <span>{event.date_time}</span>
                <span>/</span>
                <span>{event.date_time}</span>
              </div>
              <div className="event-card-sport">
                <strong>{this.props.team.selected_team.sport}</strong>
              </div>
              <div className="event-card-opponent">
                <div className="mb"></div>
                <div>
                  <p>{event.opponent}</p>
                </div>
                <img src="" alt="logo" />
              </div>
            </div>
          ))}
        </Slider>
        <Attendance />
        <EventAmenities />
        <div className="mt-5"></div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
  team: state.team,
});

export default connect(mapStateToProps, {})(SimpleSlider);
