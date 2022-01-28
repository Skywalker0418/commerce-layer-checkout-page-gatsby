import _ from 'lodash';
import React, { useState } from "react"
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';

import StripeCard from '../payments/stripe/StripeCard'
import PaypalPayment from '../payments/PaypalPayment'
// import AdyenCard from '../payments/adyen/AdyenCard'
// import BraintreeCard from '../payments/braintree/BraintreeCard'
// import WireTransfer from '../payments/WireTransfer'

import {UPDATE_PAYMENT_OPTION} from '../../redux/constants/checkoutConstants';
import { useDispatch, useSelector } from "react-redux"

// import { makeStyles } from '@mui/styles';
// const useStyles = makeStyles(theme => ({
// }))

export default function PaymentStep({step}) {

  const dispatch = useDispatch()

  const checkout = useSelector(state => state.checkout)

  const [selected_payment_option_component, setPaymentOptionComponent] = useState(checkout.selected_payment_option_component)

  const availablePaymentOptions = () => {
      let paymentOptions = []
      _.each(checkout.order.available_payment_methods, paymentMethod => {
        switch (paymentMethod.payment_source_type) {
          case 'adyen_payments':
            if (
              process.env.GATSBY_APP_ADYEN_ENV &&
              process.env.GATSBY_APP_ADYEN_ORIGIN_KEY
            ) {
              paymentOptions.push({
                payment_method: paymentMethod,
                component: 'AdyenCard',
                priority: 1
              })
              // More Adyen Payment Methods go here
            }
            break
          case 'braintree_payments':
            paymentOptions.push({
              payment_method: paymentMethod,
              component: 'BraintreeCard',
              priority: 1
            })
            // More Braintree Payment Methods go here
            break
          case 'stripe_payments':
            if (process.env.GATSBY_APP_STRIPE_PUBLIC_KEY) {
              paymentOptions.push({
                payment_method: paymentMethod,
                component: 'StripeCard',
                priority: 1
              })
              // More Stripe Payment Methods go here
            }
            break
          case 'paypal_payments':
            paymentOptions.push({
              payment_method: paymentMethod,
              component: 'PaypalPayment',
              priority: 2
            })
            break
          case 'wire_transfers':
            paymentOptions.push({
              payment_method: paymentMethod,
              component: 'WireTransfer',
              priority: 3
            })
            break
           default:
           	console.log('not supported')
        }
      })
      return _.sortBy(paymentOptions, ['priority'])
  }

  const renderChild = (payment_option) => {
  	if (payment_option.component === 'StripeCard') return <StripeCard key={payment_option.component} payment_option={payment_option}/>
  	else if(payment_option.component === 'PaypalPayment') return <PaypalPayment key={payment_option.component} payment_option={payment_option}/>

  }
  const handleChange = (e, v) => {
  	setPaymentOptionComponent(v)
  	dispatch({type: UPDATE_PAYMENT_OPTION, payload: v})
  }
  const handleSubmit = () => {
  	console.log('submit')
  }
  return (
	  <div>
	  	<FormControl fullWidth>
	      <RadioGroup
	        aria-labelledby="demo-radio-buttons-group-label"
	        name="radio-buttons-group"
	        value={selected_payment_option_component}
	        onChange={handleChange}
	      >
	      {
	        availablePaymentOptions().map((payment_option, index) => 
	        	renderChild(payment_option)
	        )
	      }
	      </RadioGroup>
	    </FormControl>
	    <Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
			  <LoadingButton
			        loading={checkout.buttons.loading_delivery}
			        variant="contained"
			        disabled = {checkout.validations.invalid_payment_method}
			        onClick={()=>handleSubmit()}
			        fullWidth
			    >
			        Place order
			    </LoadingButton>
			</Grid>
		</Grid>

		<div
			className="order-error"
			id="place-order-error"
			style={{display: (checkout.errors.place_order?'block':'none') }}
			>
			{ checkout.errors.place_order }
		</div>
	  </div>
  )
}

