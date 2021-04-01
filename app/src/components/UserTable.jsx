import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { Button } from 'semantic-ui-react'

import FilterByCountry from './FilterByCountry';
import FilterBy from './FilterBy';
import moment from 'moment';

function UserTable() {
    const [tableData, setTableDate] = useState({});
    const [queryParams, setQueryParams] = useState({});

    // data table options
    const columns = useMemo(() => 
        [
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
                cell: row => {
                    const formatedDate = moment(row.dob).format('MM/DD/YYYY');;
                    return (
                        <div>{formatedDate}</div>
                    );
                },
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
                name: 'Created Date',
                selector: 'createdDate',
                sortable: true,
                cell: row => {
                    const formatedDate = moment(row.createdDate).format('MM/DD/YYYY');;
                    return (
                        <div>{formatedDate}</div>
                    );
                },
            },
            {
                name: 'Referred By',
                selector: 'referredBy',
                sortable: true,
            },
        ]
    ,[]);

    const updateTableData = useCallback((data) => {

        setTableDate({
            columns,
            data,
        });
    }, [columns]);

    useEffect(() => {
        axios.get('http://localhost:3030/users').then(res => {
            const data = res.data;
            updateTableData(data);
        });

    }, [updateTableData]);



    const searchCountry = (event, data) => {
        setQueryParams({
            ...queryParams,
            country: data.value.toUpperCase()
        });

    }

    const searchBy = (event, data) => {
        setQueryParams({
            ...queryParams,
            [data.selector]: data.value.toUpperCase()
        });
    }

    const searchTable = () => {
        const URL = 'http://localhost:3030/users';
        
        axios.get(URL, { params: queryParams }).then(res => {
            const data = res.data;
            updateTableData(data);
        });
    }


    return (
        <div>
            <div className="search-table">
                <div className="form-element">
                    <FilterByCountry searchCountry={searchCountry} />
                </div>
                <div className="form-element">
                    <FilterBy field="Auth Type" selector="mfa" searchBy={searchBy} />
                </div>
                <div className="submit-element">
                    <Button primary onClick={searchTable}>Filter</Button>
                </div>
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