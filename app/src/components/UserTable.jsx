import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
function UserTable() {
    const [userDate, setUserDate] = useState(0);
  
    useEffect(() => {
      
      axios.get('http://localhost:3030/users')
      .then(res => {
        const data = res.data;
        setUserDate({ data });
      })
          
    });

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
          name: 'Country',
          selector: 'Country',
          sortable: true,
        },
        {
          name: 'email',
          selector: 'email',
          sortable: true,
        },
    ];

  const tableData = {
    columns,
    userData,
  };
  

  return (
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
  );
}

export default UserTable;