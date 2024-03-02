import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { connect } from 'react-redux'
import FullCalendarAction from './redux/actions'

// const dayOfWee = (datetime) => {
//   datetime.setHours(0, 0, 0, 0)
//   const firstDayOfWeek = new Date(datetime.setDate(datetime.getDate() - datetime.getDay()))
//   const lastDayOfWeek = new Date(firstDayOfWeek)
//   lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)
//   return [firstDayOfWeek, lastDayOfWeek]
// }

InnerCalendar.propTypes = {
  calendar: PropTypes.object,
  viewType: PropTypes.string,
  showDate: PropTypes.object,
  selectStart: PropTypes.object,
}

export function InnerCalendar({
  //
  calendar,
  viewType,
  showDate,
  selectStart,
}) {
  const [value, setValue] = useState(new Date())
  const onChange = (value) => {
    // console.log('onChange')
    calendar.gotoDate(value)
    setValue(value)
  }

  useEffect(() => {
    // console.log('change viewType')
    if (viewType === 'listWeek') {
      if (selectStart) {
        setValue(selectStart)
      } else {
        setValue(showDate)
      }
    } else {
      if (selectStart) {
        setValue(selectStart)
      } else {
        setValue(showDate)
      }
    }
    calendar.updateSize()
  }, [viewType])

  useEffect(() => {
    // console.log('change showDate')
    if (viewType === 'listWeek') {
      setValue(showDate)
    } else {
      setValue(showDate)
    }
    calendar.updateSize()
  }, [showDate])

  if (viewType === 'timeGridWeek') return <></>

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
      <Calendar //
        value={value}
        onChange={onChange}
        calendarType='gregory'
      />
    </div>
  )
}

function mapStateToProps({ FullCalendarReducer }) {
  const { calendar, viewType, showDate, selectStart } = FullCalendarReducer
  return { calendar, viewType, showDate, selectStart }
}

const ConnectedInnerCalendar = connect(mapStateToProps, FullCalendarAction)(InnerCalendar)

export default ConnectedInnerCalendar
