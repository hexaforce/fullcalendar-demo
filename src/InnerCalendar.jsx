import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { connect } from 'react-redux'
import FullCalendarAction from './actions'

InnerCalendar.propTypes = {
  events: PropTypes.array,
  calendar: PropTypes.object,
  viewType: PropTypes.string,
  listMode: PropTypes.bool,
  selectStart: PropTypes.object,
  selectEnd: PropTypes.object,
  setCalendar: PropTypes.func.isRequired,
}

export function InnerCalendar({
  //
  calendar,
  setCalendar,
  viewType,
  listMode,
  selectStart,
}) {
  const [value, setValue] = useState(new Date())
  const onChange = (value, event) => {
    calendar.gotoDate(value)
    setValue(value)
  }

  useEffect(() => {
    setValue(selectStart)
    calendar.updateSize()
  }, [selectStart])

  
  return (
    <>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
        <button
          type='button'
          onClick={() => {
            if (listMode) {
              if (viewType === 'listWeek') calendar.changeView('timeGridWeek')
              if (viewType === 'listDay') calendar.changeView('timeGridDay')
            } else {
              if (viewType === 'timeGridWeek') calendar.changeView('listWeek')
              if (viewType === 'timeGridDay') calendar.changeView('listDay')
            }
            setCalendar(calendar)
          }}
          aria-pressed='false'
          className={`fc-${viewType}-button fc-button fc-button-primary`}
        >
          {listMode ? 'タイムグリッド表示' : 'リスト表示'}
        </button>
      </div>

      {viewType !== 'timeGridWeek' && (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
          <Calendar //
            value={value}
            onChange={onChange}
            // selectRange={viewType === 'listWeek'}
          />
        </div>
      )}
    </>
  )
}

function mapStateToProps({ FullCalendarReducer }) {
  const { calendar, viewType, listMode,showDate, selectStart, selectEnd } = FullCalendarReducer
  return { calendar, viewType, listMode,showDate, selectStart, selectEnd }
}

const ConnectedInnerCalendar = connect(mapStateToProps, FullCalendarAction)(InnerCalendar)

export default ConnectedInnerCalendar
