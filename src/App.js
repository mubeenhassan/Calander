import React from 'react'
import Calander from './components/Calander'

const events =[
    {
      "cohorts": [],
      "dateLabel": "this is the date label",
      "disciplines": [],
      "heading": "Exam dates test",
      "id": 484,
      "link": {
        "cohorts": [],
        "disciplines": [],
        "tags": [],
        "url": "/connect-in-canvas",
        "target": "_self",
        "text": "this is link text"
      },
      "tags": [],
      "startDate": "2021-11-01",
      "endDate": "2021-11-05",
      "type": 'A',
    },
    {
      "cohorts": [],
      "dateLabel": "Week 1",
      "disciplines": [],
      "heading": "Teaching Period 4 starts",
      "id": 483,
      "link": null,
      "tags": [],
      "startDate": "2021-12-01",
      "type": 'B',
    },
    {
      "cohorts": [],
      "dateLabel": "Week 1",
      "disciplines": [],
      "heading": "Teaching Period 5 starts",
      "id": 483,
      "link": null,
      "tags": [],
      "startDate": "2021-10-1",
      "type": 'C',
    },
    {
      "cohorts": [],
      "dateLabel": "Week 1",
      "disciplines": [],
      "heading": "Teaching Period 4 starts",
      "id": 483,
      "link": null,
      "tags": [],
      "startDate": "2021-12-02",
      "type": 'B',
    },
    {
      "cohorts": [],
      "dateLabel": "Week 1",
      "disciplines": [],
      "heading": "Teaching Period 5 starts",
      "id": 483,
      "link": null,
      "tags": [],
      "startDate": "2021-10-03",
      "type": 'C',
    },
    {
      "cohorts": [],
      "dateLabel": "Week 1",
      "disciplines": [],
      "heading": "Teaching Period 4 starts",
      "id": 483,
      "link": null,
      "tags": [],
      "startDate": "2021-12-04",
      "type": 'B',
    },
    {
      "cohorts": [],
      "dateLabel": "Week 1",
      "disciplines": [],
      "heading": "Teaching Period 5 starts",
      "id": 483,
      "link": null,
      "tags": [],
      "startDate": "2021-10-05",
      "type": 'C',
    },
    {
      "cohorts": [],
      "dateLabel": "Week 1",
      "disciplines": [],
      "heading": "Teaching Period 4 starts",
      "id": 483,
      "link": null,
      "tags": [],
      "startDate": "2021-12-07",
      "type": 'B',
    },
    {
      "cohorts": [],
      "dateLabel": "Week 1",
      "disciplines": [],
      "heading": "Teaching Period 5 starts",
      "id": 483,
      "link": null,
      "tags": [],
      "startDate": "2021-11-01",
      "type": 'D',
    },
    {
      "cohorts": [],
      "dateLabel": "Week 1",
      "disciplines": [],
      "heading": "Teaching Period 4 starts",
      "id": 483,
      "link": null,
      "tags": [],
      "startDate": "2021-12-01",
      "type": 'Z',
    }
  ]

function App() {
    return (
      <div className='App'>
        <Calander eventsData={[...events]} />
      </div>
    )
}

export default App
