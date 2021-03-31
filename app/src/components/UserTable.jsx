import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { Button } from 'semantic-ui-react'

import FilterBy from './FilterBy';

function UserTable() {
    const [tableData, setTableDate] = useState({});
    let countryList = {};
    let queryParams = new URLSearchParams();

    useEffect(() => {
        axios.get('http://localhost:3030/users').then(res => {
            const data = res.data;
            updateTableData(data);
        });

    }, []);


    const updateTableData = (data) => {

        setTableDate({
            columns,
            data,
        });
    }

    // data table options
    const columns = [
        {
            name: 'First Name',
            selector: 'firstName',
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: 'lastName',
            sortable: true,
        },
        {
            name: 'Tokens',
            selector: 'amt',
            sortable: true,
            cell: row => {
                return (
                    <div className="table-token">µ <span className="table-token-value">{new Intl.NumberFormat().format(row.amt)}</span></div>
                );
            },
        },

        {
            name: 'Country',
            selector: 'countryName',
            sortable: true,
        },
        {
            name: 'email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Date Of Birth',
            selector: 'dob',
            sortable: true,
        },
        {
            name: 'Auth Type',
            selector: 'mfa',
            sortable: true,
            cell: row => {
                if (row.mfa === 'null') {
                    return (
                        <div></div>
                    );
                } else {
                    return (
                        <div>{row.mfa}</div>
                    );
                }
            },
        },
        {
            name: 'CreatedDate',
            selector: 'created',
            sortable: true,
        },
        {
            name: 'Referred By',
            selector: 'referredBy',
            sortable: true,
        },
    ];

    const searchCountry = (event, data) => {
        queryParams.set('country', data.value);
    }

    const searchTable = () => {
        const URL = 'http://localhost:3030/users?' + queryParams.toString();
        
        axios.get(URL).then(res => {
            const data = res.data;
            updateTableData(data);
        });
    }


    return (
        <div>
            <div className="search-table">
                <FilterBy countries={countryList} searchCountry={searchCountry} />
                {/* <FilterBy field="Auth Type" selector="mfa" setSearch={setSearch} /> */}
                <Button primary onClick={searchTable}>Filter</Button>
            </div>

            <DataTableExtensions
                {...tableData}
            >
                <DataTable
                    noHeader
                    defaultSortField="id"
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                />
            </DataTableExtensions>
        </div>
    );
}

export default UserTable;