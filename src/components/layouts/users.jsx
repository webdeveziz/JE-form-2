import React from 'react'
import { useParams } from 'react-router-dom'
import EditUserPage from '../page/editUserPage'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'

const Users = () => {
  const params = useParams()
  const { userId, edit } = params

  const someFunc = () => {
    if (userId) {
      if (edit) {
        return <EditUserPage />
      }
      return <UserPage id={userId} />
    }
    return <UsersListPage />
  }
  return <div>{someFunc()}</div>
}

export default Users
