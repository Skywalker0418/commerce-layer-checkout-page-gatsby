import React, { useEffect } from "react"
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio'
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';

import {setOrderPaymentSource, setOrderPaymentMethod} from '../../redux/actions/checkoutAction';

import {
	UPDATE_INVALID_PAYMENT_METHOD, 
	UPDATE_BUTTON_LOADING_PAYMENT
} from '../../redux/constants/checkoutConstants';

// const payment_methods = {
//     "adyen": {
//       "title": "credit card"
//     },
//     "braintree": {
//       "title": "credit card"
//     },
//     "paypal": {
//       "title": "paypal",
//       "hint": "by placing the order, you will be redirected to the PayPal website to sign in and authorize the payment"
//     },
//     "stripe": {
//       "title": "credit card"
//     },
//     "wire_transfer": {
//       "title": "wire transfer",
//       "hint": "after placing the order, you will need to manually complete the payment with your bank"
//     }
// }

const inputLabel = (paymentSourceType) => {	
    return _.capitalize(`paypal`)
}

const PaypalPayment = ({payment_option}) => {
	const checkout = useSelector(state => state.checkout)
  	const selected_payment_option_component = checkout.selected_payment_option_component

  	const dispatch = useDispatch()
  	
  	const updateValidations = () => {
      const invalid_payment_method_ =
        _.isEmpty(checkout.order.payment_method) ||
        _.isEmpty(checkout.order.payment_source)
      console.log(invalid_payment_method_, 'PaypalPayment')
      dispatch({type: UPDATE_INVALID_PAYMENT_METHOD, payload: invalid_payment_method_})
    }
    const setPaymentMethod = () => {
      let payload = {
        order: checkout.order,
        paymentMethod: payment_option.payment_method
      }
      dispatch({type:UPDATE_BUTTON_LOADING_PAYMENT, payload:true})
      
      dispatch(setOrderPaymentMethod(payload)).then(() => {
        // this.trackPaymentOption()
        setPaymentSource()
          .then(() => {
            updateValidations()
            dispatch({type:UPDATE_BUTTON_LOADING_PAYMENT, payload:false})
            setupPayment()
          })
          .catch(error => {
          	console.log(error)
            handlePaymentSourceError(error)
          })
      })
    }
    const setPaymentSource = () => {
      let payload = {
        order: checkout.order,
        paymentMethod: payment_option.payment_method,
        paymentSourceAttributes: paymentSourceAttributes()
      }
      return dispatch(setOrderPaymentSource(payload))
    }
  	const paymentSourceAttributes = () => {
      return {
        return_url: window.location.href + '/paypal',
        cancel_url: window.location.href
      }
    }
    const setupPayment = () => {
      let btn = document.getElementById('payment-step-submit')
      btn.onclick = () => {
        handlePayment()
      }
    }
    const handlePaymentSourceError = (error) => {
      let paypalError = document.getElementById('paypal-payment-error')
      paypalError.innerHTML = error.data.errors[0].detail
      dispatch({type:UPDATE_BUTTON_LOADING_PAYMENT, payload:false})
    }
    const handlePayment = () => {
      dispatch({type:UPDATE_BUTTON_LOADING_PAYMENT, payload:true})
      window.location = checkout.order.payment_source.approval_url
    }

    useEffect(() => {
		if(selected_payment_option_component === 'PaypalPayment') {
			setPaymentMethod()		
		}
	},[selected_payment_option_component])

	return (
		<div className='payment-method'>
			<FormControlLabel 
		        key={payment_option.component} 
		        label={inputLabel('paypal')}
		        value={payment_option.component}
		        control={<Radio/>} 
		    />
		    <div className="payment-method-fields" style={{display: (selected_payment_option_component === payment_option.component ? 'block' : 'none') }}>
		      <div id="paypal-payment-hint">By placing the order, you will be redirected to the PayPal website to sign in and authorize the payment</div>
		      <div className="payment-error" id="paypal-payment-error"></div>
		    </div>
	    </div>	
	)
}

export default PaypalPayment;