import PropTypes from 'prop-types'
import { createRoot } from 'react-dom/client'

recombination.propTypes = {
  currentView: PropTypes.string,
  calendar: PropTypes.node.isRequired,
}

export function recombination(currentView, calendar) {
  const $ = (query) => document.querySelector(query)

  let parent
  let brother

  if (currentView === 'timeGridDay' || currentView === 'timeGridWeek') {
    parent = $(`div.fc-${currentView}-view.fc-view.fc-timegrid`)
    brother = $('table.fc-scrollgrid.fc-scrollgrid-liquid')
  }

  if (currentView === 'listWeek' || currentView === 'listDay') {
    parent = $(`div.fc-${currentView}-view.fc-view.fc-list.fc-list-sticky`)
    brother = $('div.fc-scroller.fc-scroller-liquid')
  }

  const attachCalendar = () => {
    const innerCalendar = document.createElement('div')
    innerCalendar.classList.add('innerCalendar')
    createRoot(innerCalendar).render(calendar)
    currentView === 'timeGridWeek' ? parent.insertBefore(innerCalendar, parent.firstChild) : parent.appendChild(innerCalendar)
  }

  if (parent && brother) {
    if (!$('div.innerCalendar')) {
      attachCalendar()
    } else {
      var index = Array.prototype.indexOf.call(parent.children, $('div.innerCalendar'))
      if (currentView === 'timeGridWeek' && index === 1) {
        $('div.innerCalendar').parentNode.removeChild($('div.innerCalendar'))
        attachCalendar()
      } else if (currentView === 'timeGridDay' && index === 0) {
        $('div.innerCalendar').parentNode.removeChild($('div.innerCalendar'))
        attachCalendar()
      }
    }

    if (currentView === 'timeGridWeek') {
      parent.style.display = null
      brother.style.flex = null
      $('div.innerCalendar').style.flex = null
    } else {
      parent.style.display = 'flex'
      brother.style.flex = '1 1 0%'
      $('div.innerCalendar').style.flex = '0 1 0%'
    }
    return
  }
}
