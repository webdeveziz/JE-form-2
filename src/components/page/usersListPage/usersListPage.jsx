import React, { useState, useEffect } from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import PropTypes from 'prop-types'
import GroupList from '../../common/groupList'
import api from '../../../api'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import _ from 'lodash'

const usersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [search, setSearch] = useState('')

  const pageSize = 8

  // old App.js start
  const [users, setUsers] = useState()
  useEffect(async () => {
    const response = await api.users.fetchAll()
    setUsers(response)
  }, [])

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    const arrayOfUsers = users.filter((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark
        return user
      }
      return user
    })

    setUsers(arrayOfUsers)
  }
  // old App.js end

  useEffect(async () => {
    const response = await api.professions.fetchAll()
    setProfessions(response)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    setSearch('')
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  // Sort
  const handleSort = (item) => {
    setSortBy(item)
  }

  // search
  const handleChangeSearch = ({ target }) => {
    setSearch(target.value)
    setSelectedProf()
  }

  if (users) {
    let filteredUsers = ''
    if (search) {
      filteredUsers = users.filter(
        (user) => user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    } else {
      if (selectedProf) {
        filteredUsers = users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      } else {
        filteredUsers = users
      }
    }

    const count = filteredUsers.length
    const sorteredUsers = _.orderBy(
      filteredUsers,
      [sortBy.path],
      [sortBy.order]
    )
    const cropUser = paginate(sorteredUsers, currentPage, pageSize)

    return (
      <>
        <div className="d-flex mt-2">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onSelectItem={handleProfessionSelect}
              />
              <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                Сброс
              </button>
            </div>
          )}
          <div className="d-flex flex-column">
            <SearchStatus length={count} />
            <div>
              <input
                placeholder="Поиск... "
                type="text"
                value={search}
                className="w-100 mx-auto"
                onChange={handleChangeSearch}
              />
            </div>
            {count > 0 && (
              <UsersTable
                users={cropUser}
                onToggleBookMark={handleToggleBookMark}
                onDelete={handleDelete}
                selectedSort={sortBy}
                onSort={handleSort}
              />
            )}
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
  return <h2>Загружаем...</h2>
}

usersListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object)
}

export default usersListPage
