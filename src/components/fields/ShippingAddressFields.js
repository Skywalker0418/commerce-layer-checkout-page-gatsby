import _ from 'lodash'

import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';

import countries from '../../data/countries'

import { setOrderCustomerEmail, handleCustomerSubscription } from '../../redux/actions/checkoutAction'; 
import { UPDATE_INVALID_SHIPPING_ADDRESS, UPDATE_SHIPPING_ADDRESS, UPDATE_SHIP_TO_DIFFERENT_ADDRESS_REQUIRED, UPDATE_SHIP_TO_DIFFERENT_ADDRESS} from '../../redux/constants/checkoutConstants';

import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

export default function ShippingAddressFields() {
  
  const checkout = useSelector(state => state.checkout)
  
  const dispatch = useDispatch()

  const shipping_address_clone = checkout.order.shipping_address ? checkout.order.shipping_address : checkout.order.billing_address

  const getIndex = () => {
    const index = _.findIndex(countries, { code: shipping_address_clone.country_code })
    return index
  }
  const shipping_country_code_lock = checkout.order.shipping_country_code_lock
  const _shipping_address_clone_id = checkout.order._shipping_address_clone_id
  const showShippingAddress = _shipping_address_clone_id ? false : true
  const [firstName, setFirstName] = useState(shipping_address_clone.first_name)
  const [lastName, setLastName] = useState(shipping_address_clone.last_name)
  const [line_1, setLine_1] = useState(shipping_address_clone.line_1)
  const [city, setCity] = useState(shipping_address_clone.city)
  const [countryCode, setCountryCode] = useState(shipping_address_clone.country_code)
  const [stateCode, setStateCode] = useState(shipping_address_clone.state_code)
  const [zipCode, setZipCode] = useState(shipping_address_clone.zip_code)
  const [phone, setPhone] = useState(shipping_address_clone.phone)
  const [shipping_info, setShipping_info] = useState(shipping_address_clone.shipping_info)
  const [invalid_shipping_address, setInvalidBillingAddress] = useState(checkout.validations.invalid_shipping_address)
  const [shipping_country_loc, setShipping_country_loc] = useState(checkout.order.shipping_country_lock)
  const [ship_to_different_address, setShipToDifferentAddress] = useState(checkout.order.ship_to_different_address)
  const [ship_to_different_address_required, setShipToDifferentAddressRequired] = useState(checkout.order.ship_to_different_address_required)
  const [_save_shipping_address_to_customer_address_book, set_save_shipping_address_to_customer_address_book] = 
    useState(checkout.order._save_shipping_address_to_customer_address_book)
  
  const [countryIndex, setCountryIndex] = useState(getIndex())
  const [hasState, setHasState] = useState(false)
  const [states, setStates] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const index = _.findIndex(countries, { code: countryCode })
    if (index >= 0) {
      setCountryIndex(index) 
      setHasState(hasStateCheck(index))  
    }
    updateShipToDifferentAddressRequired()
    if (shippingCountryCodeLocked()) {
      setCountryCode(shipping_country_code_lock)
    }
    if(ship_to_different_address && showShippingAddress) {
      if(countryCode) validate()
    } 
    
  }, [])

  const updateShipToDifferentAddressRequired = () => {
    if (!_.isEmpty(shipping_country_code_lock)) {
      let isRequired = shipping_country_code_lock !== countryCode
      setShipToDifferentAddressRequired(isRequired)
      setShipToDifferentAddress(isRequired)
      dispatch({type: UPDATE_SHIP_TO_DIFFERENT_ADDRESS, payload: isRequired})
      dispatch({type: UPDATE_SHIP_TO_DIFFERENT_ADDRESS_REQUIRED, payload: isRequired})
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
      case 'shipping_info':
        setShipping_info(value)
        break
    }
    validateField(field, value)     
  }
  
  const handleChecked = (e) => {    
    setShipToDifferentAddress(e.target.checked)    
    dispatch({type: UPDATE_SHIP_TO_DIFFERENT_ADDRESS, payload: e.target.checked})
    if(e.target.checked && showShippingAddress) {
      validate()
    }
    else {
      dispatch({type: UPDATE_INVALID_SHIPPING_ADDRESS, payload: false})
    }    
  }

  const handleBlur = (e, field) => {
    if(ship_to_different_address && showShippingAddress) {
      validateField(field, e.target.value)   
      validate()
    }    
  }
  
  const validate = () => {
    if ( firstName && lastName && line_1 && city && zipCode && countryCode && stateCode && phone ) {
      setInvalidBillingAddress(false)
      dispatch({type: UPDATE_INVALID_SHIPPING_ADDRESS, payload: false})
    }
    else {
      setInvalidBillingAddress(true)
      dispatch({type: UPDATE_INVALID_SHIPPING_ADDRESS, payload: true})
    }
    // console.log(countryCode)
    let shipping_address = {
      first_name: firstName, 
      last_name : lastName,
      line_1: line_1,
      city: city,
      zip_code: zipCode,
      country_code: countryCode,
      state_code: stateCode,
      phone: phone
    }
    dispatch({ type: UPDATE_SHIPPING_ADDRESS, payload: shipping_address})
  }

  const shippingCountryCodeLocked = () => {
      return !_.isEmpty(shipping_country_code_lock)
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
      }
      updateShipToDifferentAddressRequired()
    }
  }

  const changeState = (e, v, r) => {
    if ( v ) setStateCode(v)
  }

  const hasStateCheck = (index) => {
    const hasStateFlag = !(
      _.isEmpty(countries[index]) ||
      _.isEmpty(countries[index].states)
    )
    if (hasStateCheck) setStates(countries[index].states)
    else setStates([])
    return hasStateFlag
  }

  return (
    <>
    <Grid item xs={12}>
      <FormControlLabel
        control={<Checkbox color="primary" id="ship-to-different-address-checkbox" checked = {ship_to_different_address} onChange={handleChecked}/>}
        label="Ship to different address"
      />
    </Grid>
    {ship_to_different_address && showShippingAddress && ( <>
        <Grid item xs={12} sm={6}>
            <TextField
            required
            id="shipping-address-first-name"
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
            id="shipping-address-last-name"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="familyName"
            variant="standard"
            value={lastName}
            onInput = {handleInput}
            onBlur = {(e)=>handleBlur(e, 'lastName')}
            error = {errorMessages('lastName') ? true : false}
            helperText={errorMessages('lastName')}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
            required
            id="shipping-address-line-1"
            name="line_1"
            label="Address"
            fullWidth
            autoComplete="shipping-address-line-1"
            variant="standard"
            value={line_1}
            onInput = {handleInput}
            onBlur = {(e) => handleBlur(e,'line_1')}
            error = {errorMessages('line_1') ? true : false}
            helperText={errorMessages('line_1')}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
            required
            id="shipping-address-country-city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping-address-country-city"
            value={city}
            variant="standard"
            onInput = {handleInput}
            onBlur = {e => handleBlur(e, 'city')}
            error = {errorMessages('city') ? true : false}
            helperText={errorMessages('city')}
            />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
            <TextField
            required
            id="shipping-address-country-code"
            name="countryCode"
            label="Country"
            fullWidth
            autoComplete="shipping-address-country-code"
            value={countryCode}
            variant="standard"
            onInput = {handleInput}
            onBlur = {handleBlur('countryCode')}
            error = {errorMessages('countryCode') ? true : false}
            helperText={errorMessages('countryCode')}
            />
        </Grid> */}
        <Grid item xs={12} sm={6}>
            <Autocomplete
            required
            id="size-small-standard"
            fullWidth
            options={countries}
            getOptionLabel={(option) => option.name}
            value={countryIndex ? countries[countryIndex] : undefined}
            onChange={(e,v,r) => changeCountry(e,v,r)}
            renderInput={(params) => (
                <TextField
                {...params}
                variant="standard"
                label="Country"
                />
            )}
            />
        </Grid>                   
        {/* { hasState && (<Grid item xs={12} sm={6}>
            <Autocomplete
            required
            id="shipping-address-state-code"
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
            id="shipping-address-state-code"
            name="stateCode"
            label="State code"
            fullWidth
            autoComplete="shipping-address-state-code"
            variant="standard"
            value={stateCode}  
            variant="standard"
            onInput = {handleInput}
            onBlur = {e => handleBlur(e, 'stateCode')}
            error = {errorMessages('stateCode') ? true : false}
            helperText={errorMessages('stateCode')}        
            />
        </Grid>)}
        <Grid item xs={12} sm={6}>
            <TextField
            required
            id="shipping-address-zip-code"
            name="zipCode"
            label="Zip code"
            fullWidth
            autoComplete="shipping-address-zip-code"
            variant="standard"
            value={zipCode}
            onInput = {handleInput}
            onBlur = {e => handleBlur(e, 'zipCode')}
            error = {errorMessages('zipCode') ? true : false}
            helperText={errorMessages('zipCode')}        
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
            required
            id="shipping-address-phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete=""
            variant="standard"
            value={phone}
            onInput = {handleInput}
            onBlur = {e => handleBlur(e, 'phone')}
            error = {errorMessages('phone') ? true : false}
            helperText={errorMessages('phone')} 
            />
        </Grid> 
      </>) 
      }

      {/* <Grid item xs={12} sm={6}>
        <TextField
          required
          id="shipping-address-billing-info"
          name="shipping_info"
          label="Billing Info"
          fullWidth
          autoComplete=""
          variant="standard"
          value = {shipping_info}
          onInput = {handleInput}
          onBlur = {handleBlur('shipping_info')}
          error = {errorMessages('shipping_info') ? true : false}
          helperText={errorMessages('shipping_info')} 
        />
      </Grid> */}
      {/* <Grid item xs={12} sm={6}>
        <Checkbox
          required
          id="shipping-address-billing-info"
          name="shipping_info"
          label="billing info"
          fullWidth
          autoComplete=""
          variant="standard"
          // value = {shipping_info}
          // onChange={}
          error = {errorMessages('shipping_info') ? true : false}
          helperText={errorMessages('shipping_info')} 
        />
      </Grid> */}
    </>
  )
}

