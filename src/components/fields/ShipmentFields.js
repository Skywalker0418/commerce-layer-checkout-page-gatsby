import _ from 'lodash'

import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Autocomplete from '@mui/material/Autocomplete';


import { UPDATE_INVALID_SHIPMENTS } from '../../redux/constants/checkoutConstants';
import { setShipmentShippingMethod } from '../../redux/actions/checkoutAction';

// validations.invalid_shipments

import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

import ShipmentSummary from '../summaries/ShipmentSummary';

export default function ShipmentFields({shipment, count, total}) {

    const _shippingMethodId = shipment.shipping_method
        ? shipment.shipping_method.id
        : null
    const [shippingMethodId, setShippingMethodId] = useState(_shippingMethodId)
    const [invalid_shipments, setInvalidShipments] = useState(true)
    
    const checkout = useSelector(state => state.checkout)

    const dispatch = useDispatch()

    const sortedAvailableShippingMethods =
      _.sortBy(shipment.available_shipping_methods, [
        'price_amount_for_shipment_cents'
      ])


    const handleChange = (e, v) => {
        setShippingMethodId(v)
        const shipping_method = _.find(sortedAvailableShippingMethods, {id: v})
        let payload = {
          order: checkout.order,
          shipment: shipment,
          shippingMethod: shipping_method
        }
        dispatch(setShipmentShippingMethod(payload)).then(() => {
          // trackDeliveryOption(shippingMethod.name)
          updateValidations()
        })
    }

    const updateValidations = () => {
      const _invalid_shipments = !_.isEmpty(
        _.find(checkout.order.shipments, shipment_ => {
          return _.isEmpty(shipment_.shipping_method)
        })
      )
      setInvalidShipments(_invalid_shipments)
      dispatch({type: UPDATE_INVALID_SHIPMENTS, payload: _invalid_shipments})
    }

    function shippingMethodLabel(shippingMethod) {
      return `${shippingMethod.name} - ${shippingMethod.formatted_price_amount_for_shipment}`
    }

    return (
        <div className="shipment">
            <ShipmentSummary shipment={shipment} count={count} total={total} editable={true} />
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={shippingMethodId}
                onChange={handleChange}
              >
              {
                sortedAvailableShippingMethods.map((shipping_method, index) => 
                  <FormControlLabel 
                    key={shipping_method.id} 
                    label={shippingMethodLabel(shipping_method)}
                    value={shipping_method.id}
                    control={<Radio />} 
                   />   
                )
              }
              </RadioGroup>
            </FormControl>
        </div>
    )
}


{/* 

<v-radio-group :value="shippingMethodId">
              <v-radio
                class="available-shipping-method"
                v-for="shipping_method in sortedAvailableShippingMethods"
                :key="shipping_method.id"
                :label="shippingMethodLabel(shipping_method)"
                :value="shipping_method.id"
                color="primary"
                @change="handleChange(shipping_method)"
              ></v-radio>
            </v-radio-group>


  <template>
  <div class="shipment">
    <ShipmentSummary :shipment="shipment" :count="count" :total="total" :editable="true" />
    <v-radio-group :value="shippingMethodId">
      <v-radio
        class="available-shipping-method"
        v-for="shipping_method in sortedAvailableShippingMethods"
        :key="shipping_method.id"
        :label="shippingMethodLabel(shipping_method)"
        :value="shipping_method.id"
        color="primary"
        @change="handleChange(shipping_method)"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import _ from 'lodash'
import ShipmentSummary from '@/components/summaries/ShipmentSummary'

import { mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { stepMixin } from '@/mixins/stepMixin'

export default {
  components: {
    ShipmentSummary
  },
  mixins: [stepMixin],
  props: {
    shipment: {
      type: Object,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    updateValidations () {
      this.invalid_shipments = !_.isEmpty(
        _.find(this.order.shipments, shipment => {
          return _.isEmpty(shipment.shipping_method)
        })
      )
    },
    shippingMethodLabel(shippingMethod) => {
      return `${shippingMethod.name} - ${shippingMethod.formatted_price_amount_for_shipment}`
    },
    handleChange (shippingMethod) {
      let payload = {
        order: this.order,
        shipment: this.shipment,
        shippingMethod: shippingMethod
      }
      this.$store.dispatch('setShipmentShippingMethod', payload).then(() => {
        this.trackDeliveryOption(shippingMethod.name)
        this.updateValidations()
      })
    }
  },
  computed: {
    sortedAvailableShippingMethods () {
      return _.sortBy(this.shipment.available_shipping_methods, [
        'price_amount_for_shipment_cents'
      ])
    },
    shippingMethodId () {
      return this.shipment.shipping_method
        ? this.shipment.shipping_method.id
        : null
    },
    ...mapState(['order']),
    ...mapFields(['validations.invalid_shipments'])
  },
  mounted () {
    this.updateValidations()
  }
}
</script>

<style lang="scss">
.shipment-header {
  margin-bottom: 0.5rem;
}
</style> */}
