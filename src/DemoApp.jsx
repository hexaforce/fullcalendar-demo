import { connect } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendarAction from './redux/actions'
import PropTypes from 'prop-types'
import jaLocale from '@fullcalendar/core/locales/ja'
import listPlugin from '@fullcalendar/list'
import { useEffect, useRef } from 'react'
import { recombination } from './InnerCalendarSupport'
import InnerCalendar from './InnerCalendar'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const reportNetworkError = () => {
  alert('This action could not be completed')
}

DemoApp.propTypes = {
  events: PropTypes.array,
  calendar: PropTypes.object,
  viewType: PropTypes.string,
  selectStart: PropTypes.object,
  selectEnd: PropTypes.object,

  setCalendar: PropTypes.func.isRequired,
  changeSelectDate: PropTypes.func.isRequired,

  requestEvents: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
}

export function DemoApp({
  //
  events,
  calendar,
  viewType,
  selectStart,
  selectEnd,

  setCalendar,
  changeSelectDate,

  // requestEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}) {
  const select = (selectInfo) => {
    changeSelectDate(selectInfo)
    // const { calendar } = selectInfo.view
    // setCalendar(calendar)
  }

  const eventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove() // will render immediately. will call eventRemove
    }
  }

  const datesSet = (rangeInfo) => {
    // console.log(rangeInfo)
    // requestEvents(rangeInfo.startStr, rangeInfo.endStr).catch(reportNetworkError)
  }

  const eventAdd = (addInfo) => {
    createEvent(addInfo.event.toPlainObject()).catch(() => {
      reportNetworkError()
      addInfo.revert()
    })
  }

  const eventChange = (changeInfo) => {
    updateEvent(changeInfo.event.toPlainObject()).catch(() => {
      reportNetworkError()
      changeInfo.revert()
    })
  }

  const eventRemove = (removeInfo) => {
    deleteEvent(removeInfo.event.id).catch(() => {
      reportNetworkError()
      removeInfo.revert()
    })
  }

  const FullCalendarRef = useRef(null)
  useEffect(() => {
    setCalendar(FullCalendarRef.current.calendar)
  }, [FullCalendarRef, setCalendar])

  useEffect(() => {
    if (selectStart) {
      calendar.gotoDate(selectStart)
      if (viewType === 'dayGridYear' || viewType === 'dayGridMonth') {
        if (selectEnd) {
          calendar.select(selectStart, selectEnd)
        } else {
          calendar.select(selectStart)
        }
      }
    }
    recombination(
      viewType,
      <Provider store={store}>
        <InnerCalendar />
      </Provider>,
    )
  }, [viewType])

  return (
    <FullCalendar
      ref={FullCalendarRef}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      locales={[jaLocale]}
      locale='ja'
      customButtons={{
        dayGridYear: {
          text: '年',
          click: () => {
            calendar.changeView('dayGridYear')
            setCalendar(calendar)
          },
        },
        dayGridMonth: {
          text: '月',
          click: () => {
            calendar.changeView('dayGridMonth')
            setCalendar(calendar)
          },
        },
        today: {
          text: '今日',
          click: () => {
            calendar.today()
            setCalendar(calendar)
          },
        },
        addEvent: {
          text: 'イベントを追加',
          click: (e) => {
            console.log(e)
          },
        },
        prev: {
          text: '<',
          click: () => {
            calendar.prev()
            setCalendar(calendar)
          },
        },
        next: {
          text: '>',
          click: () => {
            calendar.next()
            setCalendar(calendar)
          },
        },
        timeGridWeek: {
          text: '週',
          click: () => {
            calendar.changeView('timeGridWeek')
            setCalendar(calendar)
          },
        },
        timeGridDay: {
          text: '日',
          click: () => {
            calendar.changeView('timeGridDay')
            setCalendar(calendar)
          },
        },
      }}
      headerToolbar={{
        left: 'dayGridYear,dayGridMonth today',
        center: 'title',
        right: 'addEvent prev,next timeGridWeek timeGridDay',
      }}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      events={events}
      eventContent={(eventInfo) => (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </>
      )} // custom render function
      datesSet={datesSet}
      select={select}
      eventClick={eventClick}
      eventAdd={eventAdd}
      eventChange={eventChange} // called for drag-n-drop/resize
      eventRemove={eventRemove}
    />
  )
}

function mapStateToProps({ FullCalendarReducer }) {
  const { calendar, events, viewType, selectStart, selectEnd } = FullCalendarReducer
  return { calendar, events, viewType, selectStart, selectEnd }
}

const ConnectedDemoApp = connect(mapStateToProps, FullCalendarAction)(DemoApp)

export default ConnectedDemoApp
