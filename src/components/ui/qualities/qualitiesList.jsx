import React from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qual) => (
        <Quality key={qual._id} {...qual} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default QualitiesList
