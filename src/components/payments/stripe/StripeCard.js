import React, { useEffect } from "react"
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio'
import _ from 'lodash';

import {useDispatch, useSelector} from 'react-redux';

import {placeOrder, setOrderPaymentSource, setOrderPaymentMethod} from '../../../redux/actions/checkoutAction';
import {
	UPDATE_INVALID_PAYMENT_METHOD, 
	UPDATE_BUTTON_LOADING_PAYMENT
} from '../../../redux/constants/checkoutConstants';


const scriptSrc = 'https://js.stripe.com/v3/'

const getScript = (scriptSrc) => {
  let scripts = document.getElementsByTagName('script')
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src === scriptSrc) return scripts[i]
  }
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = scriptSrc
  script.className = 'payment-script'
  document.body.insertBefore(script, document.body.firstChild)
  return script
}
const inputLabel = (paymentSourceType) => {	
    return _.capitalize(`credit card`)
}

const StripeCard = ({payment_option}) => {
	const dispatch = useDispatch()
	const checkout = useSelector(state => state.checkout)
  	const selected_payment_option_component = checkout.selected_payment_option_component

  	const updateValidations = () => {
      const invalid_payment_method_ =
        _.isEmpty(checkout.order.payment_method) ||
        _.isEmpty(checkout.order.payment_source)
      console.log(invalid_payment_method_, 'StripeCard')
      dispatch({type: UPDATE_INVALID_PAYMENT_METHOD, payload: invalid_payment_method_})
    }

    const paymentSourceAttributes = () => {
      return {}
    }
    const setPaymentMethod = () => {
      let payload = {
        order: checkout.order,
        paymentMethod: payment_option.payment_method
      }
      console.log(payload)
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
    const handlePaymentSourceError = (error) => {
      console.log(error)
    }
    const setPaymentSource = () => {
      let payload = {
        order: checkout.order,
        paymentMethod: payment_option.payment_method,
        paymentSourceAttributes: paymentSourceAttributes()
      }
      return dispatch(setOrderPaymentSource(payload))
    }

  	const setupPayment = () => {
      let script = getScript(scriptSrc)

      // Init card element
      script.addEventListener('load', () => {
        let stripe = Stripe(process.env.GATSBY_APP_STRIPE_PUBLIC_KEY) // eslint-disable-line
        let elements = stripe.elements({ locale: 'en' })
        let cardElement = elements.create('card', {
          hidePostalCode: true,
          style: {
            base: {
              fontSize: '16px',
              fontFamily: 'Roboto, sans-serif'
            }
          }
        })
        cardElement.mount('#stripe-card')

        let btn = document.getElementById('payment-step-submit')
        btn.onclick = () => {
          handlePayment(stripe, cardElement)
        }
      })
    }
	const handlePayment = (stripe, cardElement) => {
	  dispatch({type:UPDATE_BUTTON_LOADING_PAYMENT, payload:true})

	  stripe
	    .handleCardPayment(
	      checkout.order.payment_source.client_secret,
	      cardElement,
	      {
	        payment_method_data: {
	          billing_details: {
	            name: `${checkout.order.billing_address.first_name} ${checkout.order.billing_address.last_name}`,
	            phone: checkout.order.billing_address.phone,
	            address: {
	              city: checkout.order.billing_address.city,
	              country: checkout.order.billing_address.country_code,
	              line1: checkout.order.billing_address.line_1,
	              postal_code: checkout.order.billing_address.zip_code,
	              state: checkout.order.billing_address.state_code
	            }
	          }
	        }
	      }
	    )
	    .then(result => {
	      if (result.error) {
	        let cardError = document.getElementById('stripe-card-error')
	        cardError.innerHTML = result.error.message
	        dispatch({type:UPDATE_BUTTON_LOADING_PAYMENT, payload:false})
	      } else {
	        dispatch(placeOrder())
	      }
	    })
	}

	useEffect(() => {
		if(selected_payment_option_component === 'StripeCard') {
			setPaymentMethod()		
		}
	})


	return (
		<div className='payment-method'>
			<FormControlLabel 
		        key={payment_option.component} 
		        label={inputLabel('stripe')}
		        value={payment_option.component}
		        control={<Radio/>} 
		    />
		    <div className="payment-method-fields" style={{display: (selected_payment_option_component === payment_option.component ? 'block' : 'none') }}>
		      <div id="stripe-card"></div>
		      <div className="payment-error" id="stripe-card-error"></div>
		    </div>
	    </div>	
	)}

export default StripeCard;