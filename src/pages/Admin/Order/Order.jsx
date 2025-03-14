import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridToolbar,
    GridToolbarQuickFilter
} from '@mui/x-data-grid';
import { Button, Card, Drawer } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Edit from './Forms/Edit';
import AlertModal from '../../../components/AlertModal';
import Delete from './Forms/Delete';
import { Add } from '@mui/icons-material';
import Store from './Forms/Store';
import { fetchOrder } from '../../../api/orderApi';

export default function Order() {
    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'user',
            headerName: 'User',
            headerAlign: 'center',
            editable: true,
            flex: 1,
        },
        {
            field: 'item',
            headerName: 'Item',
            headerAlign: 'center',
            editable: true,
            flex: 1,
        },
        {
            field: 'quantity',
            type: 'number',
            headerName: 'Qauntity',
            headerAlign: 'center',
            width: 180,
            editable: true,
            flex: 1,
        },
        {
            field: 'price',
            type: 'number',
            headerName: 'Price',
            headerAlign: 'center',
            width: 180,
            editable: true,
            flex: 1,
        },
        {
            field: 'createdAt',
            type: 'date',
            headerAlign: 'center',
            headerName: 'Created At',
            width: 220,
            flex: 1,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => {
                return [
                    <EditContent row={row} handleGetData={handleGetData} />,
                    <DeleteContent row={row} handleGetData={handleGetData} />,
                ];
            },
        },
    ];

    const handleGetData = async () => {
        const { data, error } = await fetchOrder();
        if (error) {
            console.log(error);
        } else {
            setRows(data);
        }
    };

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
                slots={{ toolbar: () => <EditToolbar handleGetData={handleGetData} /> }}
                slotProps={{
                    toolbar: { showQuickFilter: true, }
                }}
            />
        </Card>
    );
}

function EditToolbar({ handleGetData }) {
    return (
        <GridToolbarContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <StoreContent handleGetData={handleGetData} />
                <GridToolbar />
                <GridToolbarQuickFilter />
            </Box>
        </GridToolbarContainer>
    );
}

function StoreContent({ handleGetData }) {
    const [modal, setModal] = useState(false)
    return (
        <>
            <Button endIcon={<Add />} onClick={() => setModal(true)}>Add Order</Button>
            <Drawer
                open={modal}
                anchor='right'
                sx={{ zIndex: 1300 }}
                onClose={() => setModal(false)}
            >
                <Store onClose={() => setModal(false)} handleGetData={handleGetData} />
            </Drawer>
        </>
    )
}

function EditContent({ row, handleGetData }) {
    const [modal, setModal] = useState(false);
    return (
        <>
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                color="warning"
                onClick={() => setModal(true)}
            />

            <Drawer
                open={modal}
                anchor='right'
                sx={{ zIndex: 1300 }}
                onClose={() => setModal(false)}
            >
                <Edit selected={row} onClose={() => setModal(false)} handleGetData={handleGetData} />
            </Drawer>
        </>
    )
}

function DeleteContent({ row, handleGetData }) {
    const [modal, setModal] = useState(false);
    return (
        <>
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                color="error"
                onClick={() => setModal(true)}
            />

            <AlertModal
                open={modal}
                onClose={() => setModal(false)}
            >
                <Delete selected={row} onClose={() => setModal(false)} handleGetData={handleGetData} />
            </AlertModal>
        </>
    )
}