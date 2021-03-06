import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import { validator } from '../../../utils/validator'
import api from '../../../api'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'

const EditUserPage = () => {
  const [data, setData] = useState({
    email: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false,
    name: ''
  })
  const [qualities, setQualities] = useState([])
  const [professions, setProfession] = useState([])
  const [errors, setErrors] = useState({})

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
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

  useEffect(() => {
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

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: '?????????????????????? ?????????? ?????????????????????? ?????? ??????????????????????!' },
      isEmail: { message: '???????????????????????? email!' }
    },
    password: {
      isRequired: { message: '???????????? ?????????????????????? ?????? ??????????????????????!' },
      isCapitalSymbol: {
        message: '???????????? ???????????? ?????????????????? ???????? ???? ???????? ?????????????????? ??????????!'
      },
      isContainDigit: {
        message: '???????????? ???????????? ?????????????????? ???????? ???? ???????? ??????????!'
      },
      min: {
        message: '???????????? ???????????? ???????????????? ?????????????? ???? 8 ????????????????!',
        value: 8
      }
    },
    profession: {
      isRequired: { message: '?????????????????????? ???????????????? ???????? ??????????????????!' }
    },
    licence: {
      isRequired: {
        message:
          '???? ???? ???????????? ???????????????????????? ?????? ???????????? ?????? ?????????????????????????? ?????????????????????????? ????????????????????'
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const { profession, qualities } = data
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    })
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="??????"
              value={data.name}
              name="name"
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="?????????????????????? ??????????"
              value={data.email}
              name="email"
              onChange={handleChange}
              error={errors.email}
            />
            <SelectField
              label="???????????????? ???????? ??????????????????"
              value={data.profession}
              name="profession"
              onChange={handleChange}
              error={errors.profession}
              defaultOption="????????????????..."
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
              label="???????????????? ?????? ??????"
            />
            <MultiSelectField
              onChange={handleChange}
              options={qualities}
              name="qualities"
              label={'???????????????? ???????? ????????????????'}
              defaultValue={data.qualities}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              ??????????????????
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
