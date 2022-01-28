import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
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
  const [activeStep, setActiveStep] = React.useState(0);

  const classes = useStyles()

  const dispatch = useDispatch()

  const checkout = useSelector(state => state.checkout)

  const order = checkout.order

  const isMobile = window.innerWidth <= 768 ? true : false
  const cartLinkLabels = ['Hide order summary', 'Show order summary']

  const [viewCartLink, setViewCartLink] = useState(isMobile)
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

{/*

<template>
  <div className="order-summary">
    <h2 className="order-summary-title" v-if="!viewCartLink">
      {{ $t('order_summary.title') | capitalize }}
      <span
        className="order-summary-title-total"
      >{{ order.formatted_total_amount_with_taxes }}</span>
    </h2>
    <div className="order-summary-toggle" v-if="viewCartLink">
      <a @click="toggleCart()">{{ viewCartLabel | capitalize }}</a>
      <span className="order-summary-title-total">{{ order.formatted_total_amount_with_taxes }}</span>
    </div>
    <div className="order-summary-content" v-show="viewCart">
      <div className="order-summary-header">
        {{ $t('order_summary.number') | capitalize }}: #{{ order.number }}
        <span
          v-if="editCartLink"
          className="edit-cart"
        >
          &mdash;
          <a :href="order.cart_url">{{ $t('generic.edit') }}</a>
        </span>
      </div>
      <div className="line-items">
        <OrderSummaryLineItem
          v-for="line_item in skuLineItems"
          :line_item="line_item"
          :key="line_item.id"
        />
        <OrderSummaryLineItem
          v-for="line_item in giftCardLineItems"
          :line_item="line_item"
          :key="line_item.id"
        />
      </div>
      <div className="coupon" v-if="showGiftCardOrCoupon">
        <OrderSummaryGiftCardOrCoupon />
      </div>
      <div className="subtotals">
        <OrderSummarySubtotal
          label="subtotal"
          id="order-summary-subtotal"
          :formattedAmount="order.formatted_subtotal_amount"
          :amountFloat="order.subtotal_amount_float"
        />
        <OrderSummarySubtotal
          label="discount"
          id="order-summary-discount-total"
          :formattedAmount="order.formatted_discount_amount"
          :amountFloat="order.discount_amount_float"
        />
        <OrderSummarySubtotal
          label="shipping"
          id="order-summary-shipping"
          :formattedAmount="order.formatted_shipping_amount"
          :amountFloat="order.shipping_amount_float"
        />
        <OrderSummarySubtotal
          label="payment_method"
          id="order-summary-payment-method"
          :formattedAmount="order.formatted_payment_method_amount"
          :amountFloat="order.payment_method_amount_float"
        />
        <OrderSummarySubtotal
          label="taxes"
          id="order-summary-taxes"
          :formattedAmount="order.formatted_total_tax_amount"
          :amountFloat="order.total_tax_amount_float"
        />
        <OrderSummarySubtotal
          label="gift_card"
          id="order-summary-gift-card"
          :formattedAmount="order.formatted_gift_card_amount"
          :amountFloat="order.gift_card_amount_float"
        />
        <OrderSummarySubtotal
          label="total"
          id="order-summary-total"
          :formattedAmount="order.formatted_total_amount_with_taxes"
          :amountFloat="order.total_amount_with_taxes_float"
          :total="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import OrderSummaryLineItem from '@/components/summaries/OrderSummaryLineItem'
import OrderSummaryGiftCardOrCoupon from '@/components/summaries/OrderSummaryGiftCardOrCoupon'
import OrderSummarySubtotal from '@/components/summaries/OrderSummarySubtotal'
import { mapState } from 'vuex'

export default {
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      viewCart: false
    }
  },
  components: {
    OrderSummaryLineItem,
    OrderSummaryGiftCardOrCoupon,
    OrderSummarySubtotal
  },
  computed: {
    viewCartLink () {
      return this.$vuetify.breakpoint.smAndDown
    },
    editCartLink () {
      return !_.isEmpty(this.order.cart_url) && this.order.editable
    },
    viewCartLabel () {
      return this.viewCart
        ? this.$t('order_summary.hide')
        : this.$t('order_summary.show')
    },
    showGiftCardOrCoupon () {
      return (
        this.order.editable &&
        process.env.VUE_APP_HIDE_GIFT_CARD_OR_COUPON !== 'TRUE'
      )
    },
    skuLineItems () {
      return _.filter(this.order.line_items, { item_type: 'skus' })
    },
    giftCardLineItems () {
      console.log(this.order.line_items)
      return _.filter(this.order.line_items, lineItem => {
        return (
          lineItem.item_type === 'gift_cards' && lineItem.total_amount_float > 0
        )
      })
    },
    ...mapState(['order', 'notifications'])
  },
  methods: {
    toggleCart () {
      this.viewCart = !this.viewCart
    }
  },
  mounted () {
    this.viewCart = this.$vuetify.breakpoint.mdAndUp
  }
}
</script>

<style lang="scss" scoped>
.order-summary-title-total {
  float: right;
}
.order-summary-toggle {
  font-size: 1.2rem;
  .order-summary-title-total {
    font-weight: bolder;
  }
}
.order-summary {
  padding: 0.5rem;
  margin-bottom: 1rem;
}
.order-summary-content {
  margin-top: 1rem;
  border-top: 1px solid $v-border;

  .order-summary-header {
    margin: 1rem 0 2rem;
  }
}
.md-and-up {
  .order-summary {
    padding: 2rem;
  }
}
</style>


*/}
