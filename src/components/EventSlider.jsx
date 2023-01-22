//currently not in use
<Slider {...settings}>
  <div className="event-card-layout">
    <div className="attend-area">
      <button className="attend-button">going</button>
      <button className="unattend-button">not going</button>
    </div>
    <EventCard />
  </div>
  <div className="event-card-layout">
    <div className="attend-area">
      <button className="attend-button">going</button>
      <button className="unattend-button">not going</button>
    </div>
    <EventCard />
  </div>
  <div className="event-card-layout">
    <div className="attend-area">
      <button className="attend-button">going</button>
      <button className="unattend-button">not going</button>
    </div>
    <EventCard
      date="Friday Sept. 3"
      time="8 P.M"
      sport="Soccer"
      where="&#64;"
      uni="Colorado School of Mines"
      logo={logo}
    />
  </div>
  <div className="event-card-layout">
    <div className="attend-area">
      <button className="attend-button">going</button>
      <button className="unattend-button">not going</button>
    </div>
    <EventCard
      date="Wednesday Sept. 1"
      time="1 P.M"
      sport="Women's Soccer"
      where="vs"
      uni="Adam State College"
      logo={logo3}
    />
  </div>
</Slider>;
