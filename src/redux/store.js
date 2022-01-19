import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  checkoutReducer
} from "./reducers/checkoutReducers"

const reducer = combineReducers({
  checkout: checkoutReducer
})

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
}

const middleware = [thunk]

const createStore = reduxCreateStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
)

export default createStore
