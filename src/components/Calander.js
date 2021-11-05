import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import events from '../events'

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

  render() {
    return (
      <div className='app-container'>
        <div className='toggleButton'>
          <button onClick={this.toggleList}>toggle weekends</button>
        </div>
        <div className='calender-container'>
          <div className='left-pane'>
            <h3>Filter by event type</h3>
            <div className='event-container'>
              {this.state.allTypes.map((type, i) => (
                <div className='event-checkbox' key={i}>
                  <input
                    type='checkbox'
                    onChange={() => {
                      this.handleType(type)
                    }}
                    checked={this.state.showTypes.includes(type) ? true : false}
                  />
                  <label>Event Type {type}</label>
                </div>
              ))}
            </div>
            <h3>Filter by event type</h3>
            <div className='download'>
              <p>Download as CSV</p>
              <p>Download as ical</p>
              <p>Download as ics</p>
            </div>
          </div>
          {this.state.calenderList ? (
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView='dayGridMonth'
              weekends={true}
              events={this.state.calendarEvents}
            />
          ) : (
            <div className='list-container'>
              <h2>Event List</h2>
              <div className='list-heading'>
                <p>Event Name</p>
                <p>Event Start date</p>
              </div>
              {events.map((list, i) => (
                <div className='list-item' key={i}>
                  <p>{list.title}</p>
                  <p>{list.start}</p>
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
