import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ options, value, name, onChange, label }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div>
        {options.map((opt) => {
          return (
            <div
              key={opt.name + '_' + opt.value}
              className="form-check form-check-inline"
            >
              <input
                className="form-check-input"
                type="radio"
                name={name}
                id={opt.name + '_' + opt.value}
                value={opt.value}
                onChange={handleChange}
                checked={opt.value === value}
              />
              <label
                className="form-check-label"
                htmlFor={opt.name + '_' + opt.value}
              >
                {opt.name}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

RadioField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
}

export default RadioField
