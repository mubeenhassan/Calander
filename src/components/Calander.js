import React, {useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'
import events from '../events'
import list from '../images/list.png'
import cal from '../images/calendar.png'
import tippy from 'tippy.js'
import { CSVLink } from 'react-csv';


export default function Calander() {
  const [calenderList, setCalenderList] = useState(true)
  const [calendarEvents, setCalendarEvents] = useState(events);
  const [allTypes, setAllTypes] = useState([])
  const [showTypes, setShowTypes] = useState([])
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     calenderList: true,
  //     calendarEvents: events,
  //     allTypes: [],
  //     showTypes: [],
  //   }
  // }
 
  const handleMouseEnter = (arg) => {
    tippy(arg.el, {
      content: arg.event.title,
      arrow:true
    });
  }

  const eventClick = (event) => {
    if (event.event.url) {
      event.jsEvent.preventDefault();
      window.open(event.event.url, "_blank");
    }
  }
useEffect(() => {  
  let allType = []
  getUniqueListByTypes(events).map((item) => {
    allType.push(item.type)
  })
     setAllTypes([...allType])
     setShowTypes([...allType])
}, [])

  const getUniqueListByTypes = (list) => {
    const arrayUniqueByType = [
      ...new Map(list.map((item) => [item['type'], item])).values(),
    ]
    return arrayUniqueByType
  }

  const handleType = (type) => {
    let values = showTypes
    let updatedEvents = []
    if (showTypes.includes(type)) {
      values.splice(values.indexOf(type), 1)
    } else {
      values.push(type)
    }
    events.map((e) => {
      if (values.includes(e.type)) {
        updatedEvents.push(e)
      }
    })
    setShowTypes(values);
    setCalendarEvents(updatedEvents)
  }

  const generateDate = (date) => {
    var date = new Date(date)
    var dd = String(date.getDate()).padStart(2, '0')
    var mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = date.getFullYear()
    return dd + '-' + mm + '-' + yyyy
  }

    const headers = [
      { label: "Title", key: "title" },
      { label: "Start Date", key: "start" },
      { label: "End date", key: "end" },
      { label: "Event Type", key: "type" },
    ];
    const data = calendarEvents;

    const csvReport = {
      data: data,
      headers: headers,
      filename: 'Events.csv'
    };

    return (
      <div className='app-container'>
        <div className='toggleButton'>
          <button onClick={()=>setCalenderList(!calenderList)}>
            <img src={calenderList ? list : cal} />
          </button>
        </div>
        <div className='calender-container'>
          <div className='left-pane'>
            <h3>Filter by event type</h3>
            <div className='event-container'>
              {allTypes.map((type, i) => (
                <div className='event-checkbox' key={i}>
                  <label className='checkbox'>
                    <input
                      className='checkbox-input'
                      type='checkbox'
                      onChange={() => {
                        handleType(type)
                      }}
                      checked={
                        showTypes.includes(type) ? true : false
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
              <a>Download as ics</a>
            </div>
          </div>
          {calenderList ? (
            <FullCalendar
              eventClick={eventClick}
              eventMouseEnter={handleMouseEnter}
              headerToolbar={{
                start: 'prev,next today',
                center: 'title',
                end: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView='dayGridMonth'
              weekends={true}
              events={calendarEvents}
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
              {calendarEvents.map((list, i) => (
                <div className='list-item' key={i}>
                  <p>{list.title}</p>
                  <p>{generateDate(list.start)}</p>
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
