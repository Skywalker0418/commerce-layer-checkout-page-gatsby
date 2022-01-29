import {
  UPDATE_ORDER,
  UPDATE_CURRENT_STEP,
  UPDATE_REQUIRES_DELIVERY,
  UPDATE_REQUIRES_PAYMENT,
  UPDATE_ORDER_PAYMENT_SOURCE,
  UPDATE_BUTTON_LOADING_CUSTOMER,
  UPDATE_BUTTON_LOADING_DELIVERY,
  UPDATE_BUTTON_LOADING_PAYMENT,
  UPDATE_APPLY_COUPON_ERROR,
  UPDATE_GIFTCARD_OR_COUPON_APPLIED,
  UPDATE_SET_ADDRESSES_ERROR,
  UPDATE_PLACE_ORDER_ERROR,
  UPDATE_AUTH_HAS_CUSTOMER,
  UPDATE_AUTH_ACCESS_TOKEN,
  CLEAR_AUTH_ACCESS_TOKEN,
  UPDATE_AUTH_REFRESH_TOKEN,
  UPDATE_CUSTOMER_ADDRESSES,
  UPDATE_CUSTOMER_SUBSCRIPTION_ID,
  DISABLE_CUSTOMER_SUBSCRIPTION,
} from "../constants/checkoutConstants"

import APIService from '../../services/APIService'
import {
  getCurrentStep,
  getGiftCardOrCouponApplied,
  getRequiresDelivery,
  getRequiresPayment
} from '../../utils/functions'


import { navigate } from "gatsby"

import NProgress from 'nprogress'

export const setOrder = orderId => async (dispatch) => {

	return APIService.getOrder(orderId).then(order => {
	    dispatch({ type: UPDATE_ORDER, payload: order })
	    dispatch({ type: UPDATE_CURRENT_STEP, payload: getCurrentStep(order) })
	    dispatch({ type: UPDATE_REQUIRES_DELIVERY, payload: getRequiresDelivery(order) })
	    dispatch({ type: UPDATE_REQUIRES_PAYMENT, payload: getRequiresPayment(order) })
	    dispatch({ type: UPDATE_GIFTCARD_OR_COUPON_APPLIED, payload: getGiftCardOrCouponApplied(order) })

	    return order
    })
    .catch(response => console.log(response))
}

export const setCustomer = () => async (dispatch, getState) => {
      APIService.getCustomerAddresses()
        .then(customerAddresses => {
          dispatch({type: UPDATE_CUSTOMER_ADDRESSES, payload: customerAddresses})
          return customerAddresses
        })
        .catch(response => console.log(response))

      APIService.getCustomerPaymentSources()
        .then(customerPaymentSources => {})
        .catch(response => console.log(response))
    }

export const setOrderCustomerEmail = () => async (dispatch, getState) => {
      NProgress.start()
      const {
  	    checkout: { order },
  	  } = getState()
      return APIService.updateOrder(order, {
        customer_email: order.customer_email
      })
      .then(order => {
        dispatch({type: UPDATE_ORDER, payload: order})
        return order
      })
      .finally(() => {
        NProgress.done()
      })
    }

export const handleCustomerSubscription = () => async (dispatch, getState) => {
      NProgress.start()
      const {
	    checkout: { order, customer_subscription },
	  } = getState()
      return APIService.handleCustomerSubscription(
        order.customer_email,
        customer_subscription
      )
        .then(customerSubscription => {
          dispatch({type: 'UPDATE_CUSTOMER_SUBSCRIPTION_ID', payload:customerSubscription.id})
        })
        .catch(_ => {
          dispatch({type: DISABLE_CUSTOMER_SUBSCRIPTION})
        })
        .finally(() => {
          NProgress.done()
        })
    }

export const setOrderGiftCardOrCouponCode = () => async (dispatch, getState) => {
      NProgress.start()
      const {
	    checkout: { order },
	  } = getState()

      return APIService.updateOrder(order, {
        gift_card_or_coupon_code: order.gift_card_or_coupon_code
      })
        .then(order => {
          dispatch({ type: UPDATE_ORDER, payload: order })
          dispatch({ type: UPDATE_REQUIRES_PAYMENT, payload: getRequiresPayment(order) })
          dispatch({ type: UPDATE_APPLY_COUPON_ERROR, payload: null })
          dispatch({ type: UPDATE_GIFTCARD_OR_COUPON_APPLIED, payload: true })
          
          return order
        })
        .catch(response => {
          dispatch({type: UPDATE_APPLY_COUPON_ERROR, payload: response.data.errors[0].meta.error})
          // commit(
          //   'updateApplyCouponError',
          //   i18n.t('errors.' + response.data.errors[0].meta.error)
          // )
        })
        .finally(() => {
          NProgress.done()
        })
    }

export const setOrderAddresses = () => async (dispatch, getState) => {
  const {
    checkout: { order },
  } = getState()
  
  return APIService.updateOrderAddresses(order)
    .then(update_order => {
      dispatch({ type: UPDATE_ORDER, payload: update_order })
      return update_order
    })
    .catch(response => {
      dispatch({type: UPDATE_SET_ADDRESSES_ERROR, payload: response.data.errors[0].meta.error})
    })
    .finally(() => {
      dispatch({type: UPDATE_BUTTON_LOADING_CUSTOMER, payload: false})
    })
}

export const setShipmentShippingMethod = (payload) => async (dispatch, getState) => {
	dispatch({type: UPDATE_BUTTON_LOADING_DELIVERY, payload: true})
      return APIService.updateShipmentShippingMethod(
        payload.shipment,
        payload.shippingMethod
      ).then(() => {
        return dispatch(setOrder(payload.order.id)).then(order => {
          dispatch({type: UPDATE_BUTTON_LOADING_DELIVERY, payload: false})
          return order
        })
      })
    }

export const setOrderPaymentMethod = (payload) => async (dispatch, getState) => {
      return APIService.updateOrderPaymentMethod(
        payload.order,
        payload.paymentMethod
      ).then(order => {
        dispatch({type: UPDATE_ORDER, payload: order})
        return order
      })
    }

export const setOrderPaymentSource = (payload) => async (dispatch, getState) => {
      return APIService.createOrderPaymentSource(
        payload.order,
        payload.paymentMethod,
        payload.paymentSourceAttributes
      ).then(paymentSource => {
        dispatch({type: UPDATE_ORDER_PAYMENT_SOURCE, payload: paymentSource})
        return paymentSource
      })
    }

export const updateOrderPaymentSource = (paymentSourceAttributes) => async (dispatch, getState) => {
	const {
		checkout: { order },
	} = getState()
      return APIService.updateOrderPaymentSource(
        order,
        paymentSourceAttributes
      ).then(paymentSource => {
        dispatch({type: UPDATE_ORDER_PAYMENT_SOURCE, payload: paymentSource})
        return paymentSource
      })
    }

export const placeOrder = () => async (dispatch, getState) => {

	const {
		checkout: { order },
	} = getState()

	dispatch({type: UPDATE_PLACE_ORDER_ERROR, payload: null})
	dispatch({type: UPDATE_BUTTON_LOADING_PAYMENT, payload: true})

      return APIService.placeOrder(order)
        .then(order => {
          dispatch({ type: UPDATE_ORDER, payload: order })
          // commit('updateOrder', order)
          // trackPurchase(order)
          navigate(`/${order.id}/confirmation`)
          // router.push({
          //   name: 'confirmation',
          //   params: {
          //     order_id: order.id
          //   }
          // })
        })
        .catch(response => {
          dispatch({
            type: UPDATE_PLACE_ORDER_ERROR,
            payload: response.data.errors[0].meta.error
            //i18n.t('errors.' + response.data.errors[0].meta.error)
          })
        })
        .finally(() => {
        	dispatch({type: UPDATE_BUTTON_LOADING_PAYMENT, payload: false})
        })
    }