import _ from 'lodash'

import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import countries from '../../data/countries'


import { UPDATE_INVALID_BILLING_ADDRESS, UPDATE_BILLING_ADDRESS } from '../../redux/constants/checkoutConstants';

import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

export default function BillingAddressFields() {
  
  const checkout = useSelector(state => state.checkout)
  
  const dispatch = useDispatch()

  const shipping_country_code_lock = checkout.order.shipping_country_code_lock
  // const _save_billing_address_to_customer_address_book = checkout.order._save_billing_address_to_customer_address_book

  const [firstName, setFirstName] = useState(checkout.order.billing_address.first_name)
  const [lastName, setLastName] = useState(checkout.order.billing_address.last_name)
  const [line_1, setLine_1] = useState(checkout.order.billing_address.line_1)
  const [city, setCity] = useState(checkout.order.billing_address.city)
  const [countryCode, setCountryCode] = useState(checkout.order.billing_address.country_code)
  const [stateCode, setStateCode] = useState(checkout.order.billing_address.state_code)
  const [zipCode, setZipCode] = useState(checkout.order.billing_address.zip_code)
  const [phone, setPhone] = useState(checkout.order.billing_address.phone)
  const [billing_info, setBilling_info] = useState(checkout.order.billing_address.billing_info)
  const [invalid_billing_address, setInvalidBillingAddress] = useState(checkout.validations.invalid_billing_address)
  const [shipping_country_loc, setShipping_country_loc] = useState(checkout.order.shipping_country_lock)
  const [ship_to_different_address, setShipToDifferentAddress] = useState(checkout.order.ship_to_different_address)
  const [ship_to_different_address_required, setShipToDifferentAddressRequired] = useState(checkout.order.ship_to_different_address_required)
  
  // const [invalid_billing_address, set_invalid_billing_address] = useState(checkout.validations.invalid_billing_address)

  const [countryIndex, setCountryIndex] = useState(null)
  const [hasState, setHasState] = useState(false)
  const [states, setStates] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const index = _.findIndex(countries, { code: countryCode })
    if (index >= 0) {
      setCountryIndex(index) 
      // setHasState(hasStateCheck(index))  
    }
    updateShipToDifferentAddressRequired()
    validate()
  }, [])

  const updateShipToDifferentAddressRequired = () => {
    if (!_.isEmpty(shipping_country_code_lock)) {
      let isRequired = shipping_country_code_lock !== countryCode
      setShipToDifferentAddressRequired(isRequired)
      setShipToDifferentAddress(isRequired)
    }
  }

  const handleInput = (e) => {
    const value = e.target.value
    const field = e.target.name
    
    switch(field) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      case 'line_1':
        setLine_1(value)
        break
      case 'city':
        setCity(value)
        break
      case 'zipCode':
        setZipCode(value)
        break
      case 'stateCode':
        setStateCode(value)
          break
      case 'phone':
        setPhone(value)
        break
      case 'billing_info':
        setBilling_info(value)
        break
    }
    validateField(field, value)     
  }

  const handleBlur = (e, field) => {
    validateField(field, e.target.value)   
    validate()
  }

  const validateField = (field, value) => {
    let fieldValue = ''
    
    fieldValue = value
    
    let errors_tmp = {...errors}
    if (fieldValue === "" || fieldValue === undefined) {
      errors_tmp[field] = "Can't be blank"
      setErrors(errors_tmp)
    }
    else {
      errors_tmp[field] = ""
      setErrors(errors_tmp)
    }
  }

  const errorMessages = (field) => {
    return errors[field] ? errors[field] : ''
  }

  const changeCountry = (e, v, r) => {
    if ( v ) {
      setCountryCode(v.code)
      const index = _.findIndex(countries, { code: v.code })
      if (index >= 0) {
        setCountryIndex(index) 
        // setHasState(hasStateCheck(index))
        setStateCode('')
        // let errors_tmp = {...errors}
        // errors_tmp['stateCode'] = ""
        // setErrors(errors_tmp)
      }
      updateShipToDifferentAddressRequired()
    }
    else {
      validateField('countryCode', '')
    }
    validate()
  
  }

  // const changeState = (e, v, r) => {
  //   if ( v ) setStateCode(v)
  //   validate()
  // }

  const validate = () => {
    if ( firstName && lastName && line_1 && city && zipCode && countryCode && stateCode && phone ) {
      setInvalidBillingAddress(false)
      dispatch({type: UPDATE_INVALID_BILLING_ADDRESS, payload: false})
    }
    else {
      setInvalidBillingAddress(true)
      dispatch({type: UPDATE_INVALID_BILLING_ADDRESS, payload: true})
    }
    let billing_address = {
      first_name: firstName, 
      last_name : lastName,
      line_1: line_1,
      city: city,
      zip_code: zipCode,
      country_code: countryCode,
      state_code: stateCode,
      phone: phone
    }
    // console.log(billing_address, 'billing_validate')
    dispatch({ type: UPDATE_BILLING_ADDRESS, payload: billing_address})
  }

  // const hasStateCheck = (index) => {
  //   const hasStateFlag = !(
  //     _.isEmpty(countries[index]) ||
  //     _.isEmpty(countries[index].states)
  //   )
  //   if (hasStateCheck) setStates(countries[index].states)
  //   else setStates([])
  //   return hasStateFlag
  // }

  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="billing-address-first-name"
          name="firstName"
          label="First Name"
          fullWidth
          variant="standard"
          autoComplete ="givenName"
          value = {firstName}
          onInput = {handleInput}
          onBlur = {(e) => handleBlur(e, 'firstName')}
          error = {errorMessages('firstName') ? true : false}
          helperText={errorMessages('firstName')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="billing-address-last-name"
          name="lastName"
          label="Last name"
          fullWidth
          autoComplete="familyName"
          variant="standard"
          value={lastName}
          onInput = {handleInput}
          onBlur = {(e) => handleBlur(e, 'lastName')}
          error = {errorMessages('lastName') ? true : false}
          helperText={errorMessages('lastName')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="billing-address-line-1"
          name="line_1"
          label="Address"
          fullWidth
          autoComplete="billing-address-line-1"
          variant="standard"
          value={line_1}
          onInput = {handleInput}
          onBlur = {(e) => handleBlur(e, 'line_1')}
          error = {errorMessages('line_1') ? true : false}
          helperText={errorMessages('line_1')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="billing-address-country-city"
          name="city"
          label="City"
          fullWidth
          autoComplete="billing-address-country-city"
          value={city}
          variant="standard"
          onInput = {handleInput}
          onBlur = {(e) => handleBlur(e, 'city')}
          error = {errorMessages('city') ? true : false}
          helperText={errorMessages('city')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          required
          id="size-small-standard"
          fullWidth
          autoComplete
          options={countries}
          getOptionLabel={(option) => option.name}
          value={countryIndex ? countries[countryIndex] : null }
          onChange={changeCountry}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Country"
              error = {errorMessages('country') ? true : false}
              helperText={errorMessages('country')} 
            />
          )}
        />
      </Grid>                   
      {/* { hasState && (<Grid item xs={12} sm={6}>
        <Autocomplete
          required
          id="billing-address-state-code"
          fullWidth
          options={states}
          value={stateCode}
          onInputChange={changeState}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="State Code"
              error = {errorMessages('stateCode') ? true : false}
              helperText={errorMessages('stateCode')}        
            />
          )}
        />
      </Grid>)} */}
      { 1 && (<Grid item xs={12} sm={6}>
        <TextField
          required
          id="billing-address-state-code"
          name="stateCode"
          label="State code"
          fullWidth
          autoComplete="billing-state-state-code"
          variant="standard"
          value={stateCode}  
          variant="standard"
          onInput = {handleInput}
          onBlur = {(e) => handleBlur(e, 'stateCode')}
          error = {errorMessages('stateCode') ? true : false}
          helperText={errorMessages('stateCode')}        
        />
      </Grid>)}
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="billing-address-zip-code"
          name="zipCode"
          label="Zip code"
          fullWidth
          autoComplete="billing-address-zip-code"
          variant="standard"
          value={zipCode}
          onInput = {handleInput}
          onBlur = {(e) => handleBlur(e, 'zipCode')}
          error = {errorMessages('zipCode') ? true : false}
          helperText={errorMessages('zipCode')}        
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="billing-address-phone"
          name="phone"
          label="Phone"
          fullWidth
          autoComplete=""
          variant="standard"
          value={phone}
          onInput = {handleInput}
          onBlur = {(e) => handleBlur(e, 'phone')}
          error = {errorMessages('phone') ? true : false}
          helperText={errorMessages('phone')} 
        />
      </Grid>

      {/* <Grid item xs={12} sm={6}>
        <TextField
          required
          id="billing-address-billing-info"
          name="billing_info"
          label="Billing Info"
          fullWidth
          autoComplete=""
          variant="standard"
          value = {billing_info}
          onInput = {handleInput}
          onBlur = {(e) => handleBlur(e, 'billing_info')}
          error = {errorMessages('billing_info') ? true : false}
          helperText={errorMessages('billing_info')} 
        />
      </Grid> */}
      {/* <Grid item xs={12} sm={6}>
        <Checkbox
          required
          id="billing-address-billing-info"
          name="billing_info"
          label="billing info"
          fullWidth
          autoComplete=""
          variant="standard"
          // value = {billing_info}
          // onChange={}
          error = {errorMessages('billing_info') ? true : false}
          helperText={errorMessages('billing_info')} 
        />
      </Grid> */}
    </>
  )
}

