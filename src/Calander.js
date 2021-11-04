import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import events from "./events"
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    
  }
  state = {
    calenderList: true,
    calendarEvents: [
      { title: "Event Now", start: new Date() }
    ]
  };

  render() {
    return (
      <div className="app-container">
        <div className="toggleButton">
          <button onClick={this.toggleList}>toggle weekends</button>
        </div>
        <div className="calender-container">
          <div className="left-pane">
            <h3>Filter by event type</h3>
            <div className="event-container">
              <div className="event-checkbox">
                <input type="checkbox" />
                <label>Event Type A</label>
              </div>
              <div className="event-checkbox">
                <input type="checkbox" />
                <label>Event Type B</label>
              </div>
              <div className="event-checkbox">
                <input type="checkbox" />
                <label>Event Type C</label>
              </div>
            </div>
            <h3>Filter by event type</h3>
            <div className="download">
              <p>Download as CSV</p>
              <p>Download as ical</p>
              <p>Download as ics</p>
            </div>
          </div>
        {this.state.calenderList ? (<FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />):
            (<div className="list-container">
               <h2>Event List</h2>
               <div className="list-heading">
                  <p>Event Name</p>
                  <p>Event Start date</p>
                  </div>
                {events.map((list)=>(
                  <div className="list-item">
                  <p>{list.title}</p>
                  <p>{list.start}</p>
                  </div>
                )
                )}
              </div>
            )
          }
        </div>
      </div>
    );
  }

  toggleList = () => {
    this.setState({
      calenderList: !this.state.calenderList
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); 
  };
}
