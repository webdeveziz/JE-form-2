import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../ui/qualities'
import { Link } from 'react-router-dom'

const UserPage = ({ id }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data))
    console.log('userpage 12', user)
  }, [])

  const userInfo = () => {
    if (user) {
      return (
        <div className="m-2">
          <h2>{user.name}</h2>
          <h3>Профессия {user.profession.name}</h3>
          <p>{<Qualities qualities={user.qualities} />}</p>
          <p>CompletedMeetings {user.completedMeetings}</p>
          <h3>Rate {user.rate}</h3>
          {/* <button className="btn-secondary m-2" onClick={handleAllUsers}>
            Изменить
          </button> */}
          <Link to={`/users/${user._id}/edit`} role="button">
            Изменить
          </Link>
        </div>
      )
    }
    return 'Загружаем...'
  }

  return <div>{userInfo()}</div>
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UserPage
