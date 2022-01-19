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
  DISABLE_CUSTOMER_SUBCRIPTION,
} from "../constants/checkoutConstants"

const initialState = {
 auth: {
    has_customer: false,
    access_token: null,
    refresh_token: null
  },
  current_step: 1,
  requires_delivery: true,
  requires_payment: true,
  notifications: {
    gift_card_or_coupon_applied: false
  },
  buttons: {
    loading_customer: false,
    loading_delivery: false,
    loading_payment: false
  },
  validations: {
    invalid_customer: false,
    invalid_billing_address: false,
    invalid_shipping_address: false,
    invalid_shipments: false,
    invalid_payment_method: false
  },
  errors: {
    apply_gift_card_or_coupon: null,
    set_addresses: null,
    place_order: null
  },
  selected_payment_option_component: null,
  order: {},
  customer_subscription: {
    id: null,
    checked: false
  },
  customer: {
    addresses: [],
    payment_sources: []
  }
};


export const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER:      
      return {
        ...state,
        order: action.payload,
      }
    case UPDATE_CURRENT_STEP:
      return {
        ...state,
        current_step: action.payload
      }
    case UPDATE_REQUIRES_DELIVERY:
      return {
        ...state,
        requires_delivery: action.payload
      }
    case  UPDATE_REQUIRES_PAYMENT:
      console.log(state)
      return {
        ...state,
        requires_payment: action.payload
      }
    case UPDATE_ORDER_PAYMENT_SOURCE:
      let order = state.order
      return {
        ...state,
        order : { ...order, payment_source : action.payload}
      }
    case UPDATE_BUTTON_LOADING_CUSTOMER:
      let buttons = state.buttons
      return {
        ...state,
        buttons: { ...buttons, loading_customer : action.payload }
      }
    case UPDATE_BUTTON_LOADING_DELIVERY:
      // let buttons = state.buttons
      return {
        ...state,
        buttons: { ...buttons, loading_delivery : action.payload }
      } 
    case UPDATE_BUTTON_LOADING_PAYMENT:
      // let buttons = state.buttons
      return {
        ...state,
        buttons: { ...buttons, loading_payment : action.payload }
      }
    case UPDATE_APPLY_COUPON_ERROR:
      let errors = state.errors
      return {
        ...state,
        errors: { ...errors, apply_gift_card_or_coupon : action.payload }
      }
    case UPDATE_GIFTCARD_OR_COUPON_APPLIED:
      let notifications = state.notifications
      return {
        ...state,
        notifications: { ...notifications, gift_card_or_coupon_applied : action.payload }
      }
    case UPDATE_SET_ADDRESSES_ERROR:
      // let errors = state.errors
      return {
        ...state,
        errors: { ...errors, set_addresses : action.payload }
      }
    case UPDATE_PLACE_ORDER_ERROR:
      // let errors = state.errors
      return {
        ...state,
        errors: { ...errors, place_order : action.payload }
      }
    case UPDATE_AUTH_HAS_CUSTOMER:
      let auth = state.auth
      return {
        ...state,
        auth: { ...auth, has_customer : action.payload }
      }
    case UPDATE_AUTH_ACCESS_TOKEN:
      // let auth = state.auth
      return {
        ...state,
        auth: { ...auth, access_token : action.payload }
      }
    case CLEAR_AUTH_ACCESS_TOKEN:
      // let auth = state.auth
      return {
        ...state,
        auth: { ...auth, access_token : null }
      }
    case UPDATE_AUTH_REFRESH_TOKEN:
      // let auth = state.auth
      return {
        ...state,
        auth: { ...auth, refresh_token : action.payload }
      }
    case UPDATE_CUSTOMER_ADDRESSES:
      let customer = state.customer
      return {
        ...state,
        customer: { ...customer, addresses : action.payload }
      }
    case UPDATE_CUSTOMER_SUBSCRIPTION_ID:
      let customer_subscription = state.customer_subscription
      return {
        ...state,
        customer_subscription: { ...customer_subscription, id : action.payload }
      }
    case DISABLE_CUSTOMER_SUBCRIPTION: 
      // let customer_subscription = state.customer_subscription
      return {
        ...state,
        customer_subscription: { ...customer_subscription, disabled : true }
      }
    default:
      return state;
  }
}

