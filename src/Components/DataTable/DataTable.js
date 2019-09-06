import React from 'react';

const DataTable = props => {
    
    let linhas = props.users.map(item =>
        <tr key={item.user} >
            <td> {item.user} </td>
            <td>{item.status}</td>
           
        </tr>
    );
 

    return (
        <table className='centered highlight'>
            <thead>
                <tr>
                    <th>Usuários</th>
                    <th>Status</th>
                </tr>

            </thead>
            <tbody>
                {linhas}
            </tbody>
        </table>

    );
}
export default DataTable;