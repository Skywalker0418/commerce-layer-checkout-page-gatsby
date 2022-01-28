import _ from 'lodash'

import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import {useDispatch, useSelector} from 'react-redux';

import {UPDATE_GIFTCARD_OR_COUPON_CODE} from '../../redux/constants/checkoutConstants';
import {setOrderGiftCardOrCouponCode} from '../../redux/actions/checkoutAction';

export default function OrderSummaryGiftCardCoupon() {
	const dispatch = useDispatch()
	const checkout = useSelector(state => state.checkout)
	const applyCoupon = () => {
		dispatch({type: UPDATE_GIFTCARD_OR_COUPON_CODE, payload: gift_card_or_coupon_code})
		dispatch(setOrderGiftCardOrCouponCode())
	}
	const [gift_card_or_coupon_code, setGiftCardOrCouponCode] = useState(checkout.order.gift_card_or_coupon_code ? checkout.order.gift_card_or_coupon_code : '')
	const inputError = () => {
		return !_.isEmpty(checkout.errors.apply_gift_card_or_coupon)
	}
	
	const onInputHandle = (e) => {
		setGiftCardOrCouponCode(e.target.value)
	}
	return (
		!checkout.notifications.gift_card_or_coupon_applied &&
		<Grid className="line-item body-2">
            <Grid container spacing={3}>
                <Grid item xs={3}>                    
                </Grid>
                <Grid item xs={9}>
                    <TextField
		                fullWidth
		                id="gift-card-or-coupon-code"
				            label="Have a gift card or coupon?"
	            			value={gift_card_or_coupon_code}
				            error={inputError()?true:false}
	          				helperText={inputError()?`errors ${checkout.errors.apply_gift_card_or_coupon}`:' '}
	          				onInput={ onInputHandle }
			              variant="outlined"
			              InputProps={{
			                  endAdornment: (
			                    <IconButton onClick={() => applyCoupon()}>
			                      <ArrowForwardOutlinedIcon />
			                    </IconButton>
			                  ),
			              }}
		              />
                </Grid>
            </Grid>
        </Grid>
	)

}
