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
import { Avatar, Card, Chip, Drawer } from '@mui/material';
import { fetchUserData } from '../../../api/userApi';
import moment from 'moment';
import Edit from './Forms/Edit';
import AlertModal from '../../../components/AlertModal';
import Delete from './Forms/Delete';

export default function FullFeaturedCrudGrid() {
    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


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
            field: 'createdAt',
            headerName: 'Created At',
            width: 220,
            flex: 1,
        },
        {
            field: 'verified',
            headerName: 'Verified',
            width: 220,
            flex: 1,
            renderCell: ({ row }) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {row.verified && (
                        <Chip color='success' label='Verified' />
                    )}
                    {!row.verified && (
                        <Chip color='error' label='Not Verified' />
                    )}
                </Box>
            )
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        color="warning"
                        onClick={() => handleEditModal(row)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        color="error"
                        onClick={() => handleDeleteModal(row)}
                    />,
                ];
            },
        },
    ];

    const handleEditModal = (data) => {
        setSelected(data)
        setEditModal(true)
    }

    const handleDeleteModal = (data) => {
        setSelected(data)
        setDeleteModal(true)
    }

    const handleGetData = async () => {
        const { data, error } = await fetchUserData();
        if (error) {
            console.log(error)
        } else {
            const formattedRows = data.map((item) => ({
                id: item.id,
                name: item.name,
                email: item.email,
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                picture: item.picture,
                verified: item.verified,
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
            <Drawer
                open={editModal}
                anchor='right'
                sx={{ zIndex: 1300 }}
                onClose={() => setEditModal(false)}
            >
                <Edit selected={selected} onClose={() => setEditModal(false)} handleGetData={handleGetData} />
            </Drawer>

            <AlertModal
                open={deleteModal}
                anchor='right'
                sx={{ zIndex: 1300 }}
                onClose={() => setDeleteModal(false)}
            >
                <Delete selected={selected} onClose={() => setDeleteModal(false)} handleGetData={handleGetData} />
            </AlertModal>
        </Card>
    );
}

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

