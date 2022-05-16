import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component
      if (typeof component === 'function') {
        return component(item)
      }
      return columns[column].component
    }
    return _.get(item, columns[column].path)
  }

  const createColumn = (item, column) => {
    return <td key={column}>{renderContent(item, column)}</td>
  }

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => createColumn(item, column))}
        </tr>
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.object
}

export default TableBody
