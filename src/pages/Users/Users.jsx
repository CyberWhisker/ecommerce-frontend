import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridToolbar,
    GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { Avatar, Card } from '@mui/material';
import { fetchUserData } from '../../api/userApi';
import moment from 'moment';


function EditToolbar() {
    return (
        <GridToolbarContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <GridToolbar />
                <GridToolbarQuickFilter />
            </Box>
        </GridToolbarContainer>
    );
}

export default function FullFeaturedCrudGrid() {
    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'picture',
            headerName: 'Avatar',
            headerAlign: 'center',
            renderCell: ({ row }) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Avatar src={row.picture} alt={row.name} />
                </Box>
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 180,
            editable: true,
            flex: 1,
        },
        {
            field: 'last_login',
            headerName: 'Last Login',
            width: 220,
            flex: 1,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleGetData = async () => {
        const { data, error } = await fetchUserData();
        if (error) {
            console.log(error)
        } else {
            console.log(data);
            const formattedRows = data.map((item) => ({
                id: item.user_id,
                name: item.name,
                email: item.email,
                last_login: moment(item.last_login).format('YYYY-MM-DD HH:mm:ss'),
                picture: item.picture,
                role: item.role,
            }));
            setRows(formattedRows);
        }
    }

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <Card
            sx={{
                height: '100%',
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: { showQuickFilter: true, }
                }}
            />
        </Card>
    );
}

