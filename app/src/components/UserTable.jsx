import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

function UserTable() {
    const [tableData, setTableDate] = useState({});
  
    useEffect(() => {
      axios.get('http://localhost:3030/users')
      .then(res => {
        const data = res.data;
        setTableDate ( {
          columns,
          data,
        } );
      })
          
    }, []);

    const columns = [
        {
          name: 'First Name',
          selector: 'First Name',
          sortable: true,
        },
        {
          name: 'Last Name',
          selector: 'Last Name',
          sortable: true,
        },
        {
          name: 'Tokens',
          selector: 'amt',
          sortable: true,
          cell: row => {
              return (
                <div className="table-token">µ <span className="table-token-value">{ new Intl.NumberFormat().format(row.amt)}</span></div>
              );
          },
        },
        
        {
          name: 'Country',
          selector: 'Country',
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
          selector: 'Created',
          sortable: true,
        },
        {
          name: 'Referred By',
          selector: 'ReferredBy',
          sortable: true,
        },
    ];

  
  

  return (
    <div>
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