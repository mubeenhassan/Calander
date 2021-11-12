import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'
import events from '../events'
import list from '../images/list.png'
import cal from '../images/calendar.png'
import { CSVLink } from 'react-csv';

export default class Calander extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      calenderList: true,
      calendarEvents: events,
      allTypes: [],
      showTypes: [],
    }
  }
  componentDidMount() {
    let allType = []
    this.getUniqueListByTypes(events).map((item) => {
      allType.push(item.type)
    })
    this.setState({
      allTypes: [...allType],
      showTypes: [...allType],
    })
  }

  getUniqueListByTypes = (list) => {
    const arrayUniqueByType = [
      ...new Map(list.map((item) => [item['type'], item])).values(),
    ]
    return arrayUniqueByType
  }

  handleType = (type) => {
    let values = this.state.showTypes
    let updatedEvents = []
    if (this.state.showTypes.includes(type)) {
      values.splice(values.indexOf(type), 1)
    } else {
      values.push(type)
    }
    events.map((e) => {
      if (values.includes(e.type)) {
        updatedEvents.push(e)
      }
    })
    this.setState({
      showTypes: values,
      calendarEvents: updatedEvents,
    })
  }

  generateDate = (date) => {
    var date = new Date(date)
    var dd = String(date.getDate()).padStart(2, '0')
    var mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = date.getFullYear()
    return dd + '-' + mm + '-' + yyyy
  }

  render() {
    const headers = [
      { label: "Title", key: "title" },
      { label: "Start Date", key: "start" },
      { label: "End date", key: "end" },
      { label: "Event Type", key: "type" },
    ];
    const data = this.state.calendarEvents;

    const csvReport = {
      data: data,
      headers: headers,
      filename: 'Events.csv'
    };

    return (
      <div className='app-container'>
        <div className='toggleButton'>
          <button onClick={this.toggleList}>
            <img src={this.state.calenderList ? list : cal} />
          </button>
        </div>
        <div className='calender-container'>
          <div className='left-pane'>
            <h3>Filter by event type</h3>
            <div className='event-container'>
              {this.state.allTypes.map((type, i) => (
                <div className='event-checkbox' key={i}>
                  <label className='checkbox'>
                    <input
                      className='checkbox-input'
                      type='checkbox'
                      onChange={() => {
                        this.handleType(type)
                      }}
                      checked={
                        this.state.showTypes.includes(type) ? true : false
                      }
                    />
                    <label className='event-name'>Event type {type}</label>
                    <span className='checkbox-checkmark-box'>
                      <span className='checkbox-checkmark'></span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <h3>Filter by event type</h3>
            <div className='download'>
              <CSVLink {...csvReport}>Download as CVS</CSVLink>
              <p>Download as ics</p>
            </div>
          </div>
          {this.state.calenderList ? (
            <FullCalendar

              headerToolbar={{
                start: 'prev,next today',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView='dayGridMonth'
              weekends={true}
              events={this.state.calendarEvents}
            />
          ) : (
            <div className='list-container'>
              <h2>Event List</h2>
              <div className='list-heading'>
                <p>Event Name</p>
                <p>Event date</p>
                <p>End Date</p>
                <p>Event Type</p>
              </div>
              {this.state.calendarEvents.map((list, i) => (
                <div className='list-item' key={i}>
                  <p>{list.title}</p>
                  <p>{this.generateDate(list.start)}</p>
                  <p>{list.end}</p>
                  <p>{list.type}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  toggleList = () => {
    this.setState({
      calenderList: !this.state.calenderList,
    })
  }

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.gotoDate('2000-01-01')
  }
}
