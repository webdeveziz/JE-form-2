import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, type, value, name, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = () => {
    return 'form-control ' + (error ? 'is-invalid' : '')
  }

  const getShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const readPassword = () => {
    if (showPassword) {
      return <i className="bi bi-eye" />
    }
    return <i className="bi bi-eye-slash" />
  }

  return (
    <div className="mb-4">
      <label htmlFor={name}> {label} </label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {type === 'password' && value.length > 0 && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={getShowPassword}
          >
            {readPassword()}
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextField
