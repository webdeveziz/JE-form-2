import React from 'react'
import { PropTypes } from 'prop-types'

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const counts = [2, 3, 4]
    const lastOne = Number(number.toString().slice(-1))
    const isLastOne = counts.some((elem) => elem === lastOne)
    let tempStr = `${number} человек тусанет с тобой сегодня`

    if (number > 4 && number < 15) {
      tempStr = `${number} человек тусанет с тобой сегодня`
    } else if ((number <= 4 && number > 1) || isLastOne) {
      tempStr = `${number} человека тусанут с тобой сегодня`
    }
    return tempStr
  }

  return (
    <div>
      <h3>
        <span className={'badge ' + (length > 0 ? 'bg-primary' : 'bg-danger')}>
          {length > 0 ? renderPhrase(length) : 'Никто с тобой не тусанет'}
        </span>
      </h3>
    </div>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
}

export default SearchStatus
