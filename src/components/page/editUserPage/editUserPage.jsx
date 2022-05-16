import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../api'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import PropTypes from 'prop-types'

const EditUserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [qualities, setQualities] = useState([])
  const [professions, setProfession] = useState([])
  const [data, setData] = useState({
    email: '',
    profession: '',
    sex: 'male',
    qualities: [],
    name: ''
  })

  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }))
  }

  // const handleOneUser = () => {
  //   history.push('/users')
  // }

  useEffect(() => {
    api.users.getById(userId).then(({ profession, qualities, ...data }) => {
      return setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id
      }))
    })
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfession(professionsList)
    })
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        const obj = { _id: prof.value, name: prof.label }
        return obj
      }
    }
  }

  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  console.log('tut data', data)

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { profession, qualities } = data
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`))
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              value={data.name}
              name="name"
              onChange={handleChange}
            />
            <TextField
              label="Электронная почта"
              value={data.email}
              name="email"
              onChange={handleChange}
            />
            <SelectField
              label="Выберите свою профессию"
              value={data.profession}
              name="profession"
              onChange={handleChange}
              defaultOption="Выберите..."
              options={professions}
            />
            <RadioField
              name="sex"
              onChange={handleChange}
              value={data.sex}
              options={[
                { name: 'Male', value: 'male' },
                { name: 'Female', value: 'female' },
                { name: 'Other', value: 'other' }
              ]}
              label="Выберите ваш пол"
            />
            <MultiSelectField
              onChange={handleChange}
              options={qualities}
              name="qualities"
              label={'Выберите ваши качества'}
              defaultValue={data.qualities}
            />
            <button type="submit" className="btn btn-primary w-100 mx-auto" >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

EditUserPage.propTypes = {
  id: PropTypes.string
}

export default EditUserPage
