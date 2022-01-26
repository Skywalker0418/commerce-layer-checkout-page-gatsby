import React, { useState, useEffect } from "react"

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';

// import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

import CustomerFields from "../fields/CustomerFields";
import BillingAddressFields from "../fields/BillingAddressFields";
import ShippingAddressFields from "../fields/ShippingAddressFields";
import AddressSummary from "../summaries/AddressSummary";

import {UPDATE_CHANGE_STEP,UPDATE_BUTTON_LOADING_CUSTOMER, UPDATE_ERROR_SET_ADDRESSES} from '../../redux/constants/checkoutConstants';
import { setOrderAddresses } from "../../redux/actions/checkoutAction";

export default function CustomerStep() {
    const checkoutOrder = useSelector(state => state.checkout.order)
    const requires_delivery = useSelector(state => state.checkout.requires_delivery)
    const invalid_billing_address = useSelector(state => state.checkout.validations.invalid_billing_address)
    const invalid_shipping_address = useSelector(state => state.checkout.validations.invalid_shipping_address)
    const invalid_customer = useSelector(state => state.checkout.validations.invalid_customer)
    const _billing_address_clone_id = useSelector(state => state.checkout.order._billing_address_clone_id)
    const _shipping_address_clone_id = useSelector(state => state.checkout.order._shipping_address_clone_id)
    const current_step = useSelector(state => state.checkout.current_step)
    const [disabled, setDisabled] = useState(true)
    const isLoadingCustomerButton = useSelector(state => state.checkout.buttons.loading_customer)
    const [loading_customer, setLoadingCustomer] = useState(isLoadingCustomerButton)
    const error_set_addresses = useState(useSelector(state => state.checkout.errors.set_addresses))
    const dispatch = useDispatch()
    const completed = (current_step !== 1) ? true : false
    useEffect(() => {
        const disabled_flag =  (
            invalid_customer ||
          (!_billing_address_clone_id &&
            invalid_billing_address) ||
          (!_shipping_address_clone_id &&
            invalid_shipping_address)
        )
        setDisabled(disabled_flag)
        
    }, [invalid_customer, _billing_address_clone_id, invalid_billing_address, _shipping_address_clone_id, invalid_shipping_address])
    
    console.log("state ====. ", checkoutOrder)

    const handleSubmit = () => {     
        setLoadingCustomer(true)
        dispatch({type:UPDATE_BUTTON_LOADING_CUSTOMER, payload:true})
        dispatch({type:UPDATE_ERROR_SET_ADDRESSES, payload: null})
        dispatch(setOrderAddresses()).then(() => {
            if (error_set_addresses) {
                setLoadingCustomer(false)
                nextStep()
            } 
        })
    }        

    const nextStep = () => {
        dispatch({type:UPDATE_CHANGE_STEP, payload: 2})
    }

    return !completed ? (
        <Grid container spacing={3}>
            <CustomerFields/>
            <BillingAddressFields />
            { requires_delivery && <ShippingAddressFields /> }  
            <Grid item xs={12} sm={6}>
                <LoadingButton
                    loading={loading_customer}
                    variant="contained"
                    disabled = {disabled}
                    onClick={handleSubmit}
                    variant="contained"
                    fullWidth
                >
                    CONTINUE TO DELIVERY
                </LoadingButton>
            </Grid>
        </Grid> 
    ) : (
        <Box className="step-summary">
            <Grid container spacing={3}>
                <Grid item item xs={12} sm={6}>                    
                    <div className="header">{ checkoutOrder.customer_email}</div>
                    <div className="billing-address-summary">
                        <AddressSummary address={checkoutOrder.billing_address} />
                    </div>
                </Grid>
                <Grid item item xs={12} sm={6}>
                    <div className="header">{'Ship to'}:</div>
                    <div className="shipping-address-summary">
                        <AddressSummary
                            address={checkoutOrder.shipping_address}
                            billing={false}
                        />
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}
