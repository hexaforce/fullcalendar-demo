import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FullCalendarAction from './redux/actions'
import { useEffect } from 'react'

InnerGridButton.propTypes = {
  calendar: PropTypes.object.isRequired,
  setCalendar: PropTypes.func.isRequired,
  viewType: PropTypes.string,
  listMode: PropTypes.bool,
}

export function InnerGridButton({
  //
  calendar,
  setCalendar,
  viewType,
  listMode,
}) {
  useEffect(() => {
    console.log('change viewType')
  }, [viewType])

  return (
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
  )
}

function mapStateToProps({ FullCalendarReducer }) {
  const { calendar, setCalendar, viewType, listMode } = FullCalendarReducer
  return { calendar, setCalendar, viewType, listMode }
}

const ConnectedInnerGridButton = connect(mapStateToProps, FullCalendarAction)(InnerGridButton)

export default ConnectedInnerGridButton
