import { GridFrameworkComponentEditUser } from "./GFCEditUser"
import { GridFrameworkComponentDelete } from "./GFCDeleteUser"

export const columDefinition = [
    {
        headerName: '',
        field: 'id',
        width: 50,
        cellRendererFramework: GridFrameworkComponentEditUser,
        cellStyle: { padding: 0, border: 'none' }
    },
    {
        headerName: '',
        field: 'id',
        width: 40,
        cellRendererFramework: GridFrameworkComponentDelete,
        cellStyle: { padding: 0, border: 'none' }
    },
    {
        field: 'FirstName',
        flex: 1,
    },
    {
        field: 'LastName',
        flex: 1
    },
    {
        field: 'Email',
        flex: 1
    },
    {
        headerName: 'Gender',
        field: 'Gender',
        flex: 1
    },
    {
        headerName: 'Role',
        field: 'Role',
        flex: 1
    }
]