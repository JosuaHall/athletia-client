import React, { useState, useEffect } from "react";
import { loadCompetitors } from "../actions/getDataActions";
import { connect } from "react-redux";
import EventList from "./EventList";
import axios from "axios";
import CreateEvent from "./CreateEvent";

const TeamSchedule = () => {
  /*useEffect(() => {
    //setCompetitors(loadCompetitors());
    console.log(axios.get("/api/teams").then((res) => res.data));
  }, {});*/
  return (
    <React.Fragment>
      <div className="schedule-headings">
        <div>
          <h6>Date & Time</h6>
        </div>
        <div>
          <h6>Opponent</h6>
        </div>
        <div>
          <h6>Home/Away</h6>
        </div>
        <div>
          <h6>Special Event Amenities</h6>
        </div>
        <div>
          <h6>Stream</h6>
        </div>
        <div>
          <h6>Delete</h6>
        </div>
      </div>

      <EventList />

      <CreateEvent />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { loadCompetitors })(TeamSchedule);
