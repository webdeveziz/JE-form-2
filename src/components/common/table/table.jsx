import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({ selectedSort, onSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ selectedSort, onSort, columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  )
}

Table.propTypes = {
  selectedSort: PropTypes.object,
  onSort: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array
}

export default Table
