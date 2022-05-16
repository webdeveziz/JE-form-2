import React from 'react'
import PropTypes from 'prop-types'
import { colorsOfList } from '../../utils/utilis'
const GroupList = ({
  items,
  onSelectItem,
  valueProperty,
  contentProperty,
  selectedItem
}) => {
  const createrList = () => {
    if (Object.prototype.toString.call(items) === '[object Object]') {
      return Object.keys(items).map((item, i) => (
        <li
          key={items[item][valueProperty]}
          className={
            'list-group-item ' +
            'list-group-item-' +
            colorsOfList[i] +
            (items[item] === selectedItem ? ' active' : '')
          }
          onClick={() => onSelectItem(items[item])}
          role={'button'}
        >
          {items[item][contentProperty]}
        </li>
      ))
    }
    if (Array.isArray(items)) {
      return items.map((item, i) => (
        <li
          key={item[valueProperty]}
          className={
            'list-group-item ' +
            'list-group-item-' +
            colorsOfList[i] +
            (item === selectedItem ? ' active' : '')
          }
          onClick={() => onSelectItem(item)}
          role={'button'}
        >
          {item[contentProperty]}
        </li>
      ))
    }
  }

  return <ul className="list-group">{createrList()}</ul>
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
}

export default GroupList
