import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, ...rest }) => {
  const bookMarks = (textClass = '') => (
    <i className={'bi bi-flag' + textClass}></i>
  )

  return (
    <>
      <button onClick={() => rest.onToggleBookMark(rest.id)}>
        {status ? bookMarks('-fill') : bookMarks()}
      </button>
    </>
  )
}

BookMark.propTypes = {
  status: PropTypes.bool
}

export default BookMark
