import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Dropdown } from 'semantic-ui-react'

/*
Filter dataTabbles by passed in field
field = string for label
selector = string for field identifier
serachBy = function bubbled up
*/
function FilterBy({field, selector, searchBy}) {
    const [mfaList, setMFAList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/mfa').then(res => {
            let data = res.data;
            data = data.map( (item, index) => {
                return {
                    key: index,
                    value: item, 
                    text: item
                }
            })
            setMFAList(data);
        });

    }, []);

    return ( 
        <div>
            <label>{field}:</label>
            <Dropdown
                clearable={true}
                placeholder={'Select '+field}
                fluid
                search 
                selection
                selector={selector}
                options={mfaList}
                onChange={searchBy}
            />
        </div>   
    );
}

export default FilterBy;