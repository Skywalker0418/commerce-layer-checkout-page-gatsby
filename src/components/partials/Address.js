import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import _ from 'lodash'
import countries from '../../data/countries'

export default function Address({address, billing = true}) {
    function countryName() {
      let country = _.find(countries, {
        code: _.upperCase(address.country_code)
      })
      return country.name
    }
    return (
        <div>
            { address.first_name } { address.last_name }
            <br />
            { address.line_1 }
            <br />
            { address.zip_code } { address.city } ( { address.state_code }) { countryName() }
            <br />
            { address.phone }
            { billing ? 
                (<span>
                    <br />
                    { address.billing_info }
                </span>) : ( <> </> )
            }
            
        </div>
    )
}