import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Dropdown } from 'semantic-ui-react'

/*
Filter dataTabbles by passed in field
searchCountry = bubled function for storing 
*/
function FilterByCountry({searchCountry}) {
    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/countries').then(res => {
            let data = res.data;
            data = data.map( item => {
                const code = item.country.toLowerCase();
                return {
                    key: code,  
                    value: code, 
                    flag: code, 
                    text: item.countryName
                }
            })
            setCountryList(data);
        });

    }, []);
    
    // need objec in folowing format
    // { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },

    return ( 
        <div>
            Country:
            <Dropdown
                placeholder='Select Country'
                fluid
                search
                selection
                multiple=""
                options={countryList}
                onChange={searchCountry}
            />
        </div>   
    );
}

export default FilterByCountry;