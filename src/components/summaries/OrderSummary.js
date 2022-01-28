import * as React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useSelector } from "react-redux"
import { useState } from "react"
import _ from 'lodash';
import OrderSummaryLineItem from './OrderSummaryLineItem';
import OrderSummaryGiftCardOrCoupon from './OrderSummaryGiftCardOrCoupon'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  summaryContainer: {
    padding: "2rem",
  },
  OrderSummarySubtotal: {
    padding:"0.9rem"
  },
  OrderSummaryOrderTotal: {
    padding: "0.9rem",
    fontWeight: "bolder",
    fontSize: "1.3rem"
  }
}))



export default function OrderSummary() {

  const classes = useStyles()

  const checkout = useSelector(state => state.checkout)

  const order = checkout.order

  const isMobile = window.innerWidth <= 768 ? true : false
  const cartLinkLabels = ['Hide order summary', 'Show order summary']

  const viewCartLink = isMobile
  const [viewCart, setViewCart] = useState(true)

  const [viewCartLabel, setViewCartLabel] = useState(cartLinkLabels[0]) // Show order summary
  const editCartLink = !_.isEmpty(checkout.order.cart_url) && checkout.order.editable

  const toggleCart = () => {
    setViewCart(!viewCart)
    setViewCartLabel( viewCartLabel === cartLinkLabels[0] ? cartLinkLabels[1] : cartLinkLabels[0] )
  }

  const skuLineItems = _.filter(checkout.order.line_items, { item_type: 'skus' })
  const giftCardLineItems = _.filter(checkout.order.line_items, lineItem => {
        return (
          lineItem.item_type === 'gift_cards' && lineItem.total_amount_float > 0
        )
      })
  const showGiftCardOrCoupon =
        checkout.order.editable &&
        process.env.VUE_APP_HIDE_GIFT_CARD_OR_COUPON !== 'TRUE'

  const OrderSummarySubtotal = ({label, id, formattedAmount, amountFloat}) => {
    const className = (label === "Order total") ?
      classes.OrderSummaryOrderTotal :
      classes.OrderSummarySubtotal
  
    return (
      <>
        <Divider/>
        <Grid container spacing={3} className={className}>

          <Grid item xs={3}/>
          <Grid item xs={6}>
            <div className="label">{label}</div>
            <div className="hint"></div>
          </Grid>
          <Grid item xs={3}>
            <div className={{amount: true, discounted: (amountFloat < 0)}}
                 id={`order-summary-${label}-amount`}>
              {formattedAmount}
            </div>
          </Grid>
        </Grid>
      </>
    )
  }
    
  return (
    <div className="order-summary">
    { !viewCartLink &&
      <h2 className="order-summary-title">
        Order summary
        <span
          className="order-summary-title-total"
        >{ checkout.order.formatted_total_amount_with_taxes }</span>
      </h2>
    }
    { viewCartLink &&
      <div className="order-summary-toggle">
        <a onClick={() => toggleCart()}>{ viewCartLabel }</a>
        <span className="order-summary-title-total">{ checkout.order.formatted_total_amount_with_taxes }</span>
      </div>
    }
    
     { viewCart && 
       <div className="order-summary-content">
          <div className="order-summary-header">
            { 'Order number' }: #{ checkout.order.number }
            { editCartLink &&
              <span
                className="edit-cart"
              >
              &mdash;
              <a href={checkout.order.cart_url}>edit</a>
              </span>
            }
          </div>
          <div className="line-items">
            {
              skuLineItems.map(line_item => 
                <OrderSummaryLineItem
                  line_item = {line_item}
                  key = {line_item.id}
                />
              )              
            }
            {
              giftCardLineItems.map(line_item => 
                <OrderSummaryLineItem
                  line_item = {line_item}
                  key = {line_item.id}
                />
              )
            }
          </div>
          { showGiftCardOrCoupon &&
            <div className="coupon">
              <OrderSummaryGiftCardOrCoupon />
            </div>
          }
          <Divider/>
          <div className="subtotals">
            <OrderSummarySubtotal
              label="Subtotal"
              id="order-summary-subtotal"
              formattedAmount={order.formatted_subtotal_amount}
              amountFloat={order.subtotal_amount_float}
            />
            <OrderSummarySubtotal
              label="Discount"
              id="order-summary-discount-total"
              formattedAmount={order.formatted_discount_amount}
              amountFloat={order.discount_amount_float}
            />
            <OrderSummarySubtotal
              label="Shipping"
              id="order-summary-shipping"
              formattedAmount={order.formatted_shipping_amount}
              amountFloat={order.shipping_amount_float}
            />
            <OrderSummarySubtotal
              label="Payment method"
              id="order-summary-payment-method"
              formattedAmount={order.formatted_payment_method_amount}
              amountFloat={order.payment_method_amount_float}
            />
            <OrderSummarySubtotal
              label="Taxes"
              id="order-summary-taxes"
              formattedAmount={order.formatted_total_tax_amount}
              amountFloat={order.total_tax_amount_float}
            />
            <OrderSummarySubtotal
              label="Gift_card"
              id="order-summary-gift-card"
              formattedAmount={order.formatted_gift_card_amount}
              amountFloat={order.gift_card_amount_float}
            />
            <OrderSummarySubtotal
              label="Order total"
              id="order-summary-total"
              formattedAmount={order.formatted_total_amount_with_taxes}
              amountFloat={order.total_amount_with_taxes_float}
              total="true"
            />
          </div>
      </div>
      }

    </div>
    
  );
}

