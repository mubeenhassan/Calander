import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import list from '../images/list.png'
import cal from '../images/calendar.png'
import tippy from 'tippy.js'
import { CSVLink } from 'react-csv'

export default function Calander({ eventsData, showEventFilter }) {
  const [calenderList, setCalenderList] = useState(true)
  const [calendarEvents, setCalendarEvents] = useState([])
  const [allTypes, setAllTypes] = useState([])
  const [showTypes, setShowTypes] = useState([])

  const handleMouseEnter = (arg) => {
    let tooltip = `Date Label : ${arg.event.extendedProps.dateLabel}  - Event : ${arg.event.title}
    `
    tippy(arg.el, {
      content: tooltip,
      arrow: true,
    })
  }

  const eventClick = (event) => {
    if (event.event.url) {
      event.jsEvent.preventDefault()
      window.open(event.event.url, '_blank')
    }
  }
  useEffect(() => {
    setCalendarEvents(mapNewEventsToOld())
    let allType = []
    getUniqueListByTypes().map((item) => {
      allType.push(item.type)
    })
    setAllTypes([...allType])
    setShowTypes([...allType])
  }, [])

  const mapNewEventsToOld = () => {
    let newEvents = []
    eventsData.map((e) => {
      newEvents.push({
        title: e.heading,
        type: e.type,
        start: e.startDate,
        end: e.endDate ? e.endDate : e.startDate,
        url: e.link === null ? '' : e.link.url,
        dateLabel: e.dateLabel,
      })
    })
    console.log(newEvents.sort((a,b) =>  new Date(b.start) - new Date(a.start)))
    return newEvents
  }

  const getUniqueListByTypes = () => {
    const arrayUniqueByType = [
      ...new Map(
        mapNewEventsToOld().map((item) => [item['type'], item])
      ).values(),
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
    mapNewEventsToOld().map((e) => {
      if (values.includes(e.type)) {
        updatedEvents.push(e)
      }
    })
    setShowTypes(values)
    setCalendarEvents(updatedEvents)
  }
  const handlePrint = () => {
    window.print();
  }

  const generateDate = (date) => {
    var date = new Date(date)
    var dd = String(date.getDate()).padStart(2, '0')
    var mm = String(date.toLocaleString('default', { month: 'short' })) //January is 0!
    var yyyy = date.getFullYear()
    return dd + '-' + mm + '-' + yyyy
  }

  const headers = [
    { label: 'Title', key: 'title' },
    { label: 'Data Label', key: 'dateLabel' },
    { label: 'Start Date', key: 'start' },
    { label: 'End date', key: 'end' },
    { label: 'URL', key: 'url' },
  ]
  const data = calendarEvents

  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Events.csv',
  }

  const renderListOfEvents = () => {
    return (
      <div className='list-container'>
        <h1>List of events</h1>
        <div className='list-heading'>
          <p>Name</p>
          <p>Heading</p>
          <p>Event date</p>
          <p>End Date</p>
          {showEventFilter && <p>Event Type</p>}
        </div>
        {calendarEvents.map((list, i) => (
          <div className='list-item' key={i}>
            <p>{list.title}</p>
            <p>{list.dateLabel}</p>
            <p>{generateDate(list.start)}</p>
            <p>{list.end}</p>
            {showEventFilter && <p>{list.type}</p>}
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className='app-container'>
      <div className='toggleButton'>
        <div class='button-switch'>
          <input
            type='checkbox'
            id='switch-orange'
            class='switch'
            onClick={() => setCalenderList(!calenderList)}
          />
          <label for='switch-orange' class='lbl-off'>
            Month
          </label>
          <label for='switch-orange' class='lbl-on'>
            List
          </label>
        </div>
      </div>
      <div className='calender-container'>
        <div className='left-pane'>
          {showEventFilter && (
            <>
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
                        checked={showTypes.includes(type) ? true : false}
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
            </>
          )}
          <div className='download'>
            <CSVLink {...csvReport}>Download as CVS</CSVLink>
            <button onClick={handlePrint}>Print</button>
          </div>
        </div>
        {calenderList ? (
          <FullCalendar
            eventClick={eventClick}
            eventMouseEnter={handleMouseEnter}
            headerToolbar={{
              start: 'prev,next today',
              center: 'title',
              end: '',
            }}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={calendarEvents}
          />
        ) : (
          renderListOfEvents()
        )}
      </div>
      <div id='list-of-events'>{renderListOfEvents()}</div>
    </div>
  )
}
