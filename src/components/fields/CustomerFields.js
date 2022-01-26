import _ from 'lodash'

import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { setOrderCustomerEmail, handleCustomerSubscription } from '../../redux/actions/checkoutAction'; 
import { UPDATE_CUSTOMER_EMAIL, UPDATE_CUSTOMER_SUBSCRIPTION_CHECKED, UPDATE_INVALID_BILLING_ADDRESS, UPDATE_INVALID_CUSTOMER } from '../../redux/constants/checkoutConstants';

// import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

export default function CustomerStep() {
  const checkout = useSelector(state => state.checkout)
  const editable = checkout.order.editable
  const [email, setEmail] = useState( checkout.order.customer_email)
  const [subscription_checked, setChecked] = useState(checkout.customer_subscription.checked)
  const [errorEmail, setErrorEmail] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    validation(email)
  }, [email])
  
  const handleInput = (e) => {
    setEmail(e.target.value)
    validation(e.target.value)
  }

  const validation = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
    if (email === "" || email === undefined) setErrorEmail("Can't be blank")
    else if (!regexp.test(email)) setErrorEmail('Must be valid email')
    else setErrorEmail("")
    if (errorEmail) {
      dispatch({ type: UPDATE_INVALID_CUSTOMER, payload: true})
      return true
    }
    else {
      dispatch({ type: UPDATE_INVALID_CUSTOMER, payload: false})
      return false
    }
  }

  const handleChange = (e) => {
    setChecked(e.target.checked)
    dispatch({ type: UPDATE_CUSTOMER_SUBSCRIPTION_CHECKED, payload: subscription_checked})
    handleCustomer_Subscription()
  }

  const handleBlur = () => {
    setCustomerEmail()
  }
  
  const setCustomerEmail = () => {
    dispatch({ type: UPDATE_CUSTOMER_EMAIL, payload: email })
    dispatch(setOrderCustomerEmail())
    handleCustomer_Subscription()
  }

  const handleCustomer_Subscription = () => {
    dispatch(handleCustomerSubscription());
  }

  const showCustomerSubscription = () => {
      return editable && process.env.GATSBY_APP_SUBSCRIPTION_REF
  }
  
  return (
    <>
      <Grid item item xs={12}>
        <TextField
          required
          id="email"
          name="email"
          label="Email"
          fullWidth
          autoComplete="Email"
          variant="standard"
          value = {email}
          onInput = {handleInput}
          onBlur = {handleBlur}
          // autoFocus
          error = {errorEmail ? true : false}
          helperText={errorEmail}
        />
    </Grid>
    {showCustomerSubscription && (
    <Grid item xs={12}>
      <FormControlLabel
        control={<Checkbox color="primary" name="newsletter" checked={subscription_checked} onChange={handleChange} />}
        label="Subscribe to Newsletter"
      />
    </Grid>
    )}
    </>
  )
}

