import TableUI from 'react-bootstrap/Table';

function Table({listTitle,children}) {
    return (
        <TableUI striped bordered hover>
            <thead>
                <tr>
                    {
                        listTitle.map((title,ind)=>{
                            return (
                                <th key={ind}>{title}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    children
                }
            </tbody>
        </TableUI>
    );
}

export default Table;