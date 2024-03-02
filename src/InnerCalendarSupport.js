import PropTypes from 'prop-types'

creatInnerRoot.propTypes = {
  currentView: PropTypes.string,
  calendar: PropTypes.node.isRequired,
}

export function creatInnerRoot(currentView) {
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

  let innerRoot = $('div.innerRoot')
  if (innerRoot) {
    $('div.innerRoot').parentNode.removeChild($('div.innerRoot'))
  }
  innerRoot = document.createElement('div')
  innerRoot.classList.add('innerRoot')

  if (parent && brother) {
    currentView === 'timeGridWeek' ? parent.insertBefore(innerRoot, parent.firstChild) : parent.appendChild(innerRoot)
    if (currentView === 'timeGridWeek') {
      parent.style.display = null
      brother.style.flex = null
      innerRoot.style.flex = null
    } else {
      parent.style.display = 'flex'
      brother.style.flex = '1 1 0%'
      innerRoot.style.flex = '0 1 0%'
    }
  }
  return { innerRoot }
}
