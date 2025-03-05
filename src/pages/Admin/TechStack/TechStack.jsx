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
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Divider, Drawer, Fab, Grid2, IconButton, Typography } from '@mui/material';
import { fetchUserData } from '../../../api/userApi';
import moment from 'moment';
import Edit from './Forms/Edit';
import AlertModal from '../../../components/AlertModal';
import Delete from './Forms/Delete';
import FadeInAnimation from '../../../components/FadeInAnimation';
import { Add, EditAttributes, Update } from '@mui/icons-material';
import Store from './Forms/Store';
import { fetchTechStack } from '../../../api/techStack';
import { toast } from 'react-toastify';

export default function TechStack() {
    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleEditModal = (data) => {
        setSelected(data)
        setEditModal(true)
    }

    const handleDeleteModal = (data) => {
        setSelected(data)
        setDeleteModal(true)
    }

    const handleGetData = async () => {
        const { data, error } = await fetchTechStack()
        if (error) {
            toast.error("Server Error")
        } else {
            setRows(data)
        }
    }

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <Box>
            <CardList rows={rows} handleGetData={handleGetData} />
            <AddContent handleGetData={handleGetData} />
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
        </Box>
    );
}

function CardList({ rows, handleGetData }) {
    return (
        <Grid2 container spacing={2}>
            {rows.map((item, index) => (
                <Grid2 size={3} key={index}>
                    <FadeInAnimation index={index}>
                        <Card
                            style={{
                                // backgroundColor: 'slategrey',
                                height: '40vh',
                                width: '100%' // Make width responsive
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt={item.title}
                                height="180"
                                image={item.image}
                            />
                            <Divider />
                            <CardContent>
                                <Typography>{item.title}</Typography>
                                <Typography>{item.description}</Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <EditContent handleGetData={handleGetData} selected={item} />
                                <DeleteContent handleGetData={handleGetData} selected={item} />
                            </CardActions>
                        </Card>
                    </FadeInAnimation>
                </Grid2>
            ))}
        </Grid2>
    );
}

function AddContent({ handleGetData }) {
    const [storeModal, setStoreModal] = useState(false)
    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
                onClick={() => setStoreModal(true)}
            >
                <Add />
            </Fab>
            <Drawer
                open={storeModal}
                onClose={() => setStoreModal(false)}
                anchor='right'
                sx={{ zIndex: 1300 }}
            >
                <Store
                    handleGetData={handleGetData}
                    onClose={() => setStoreModal(false)}
                />
            </Drawer>
        </>
    )
}

function EditContent({ handleGetData, selected }) {
    const [modal, setModal] = useState(false)
    return (
        <>
            <IconButton variant='contained' color='warning' onClick={() => setModal(true)}><EditIcon /></IconButton>
            <Drawer
                open={modal}
                onClose={() => setModal(false)}
                anchor='right'
                sx={{ zIndex: 1300 }}
            >
                <Edit
                    selected={selected}
                    handleGetData={handleGetData}
                    onClose={() => setModal(false)}
                />
            </Drawer>
        </>
    )
}

function DeleteContent({ handleGetData, selected }) {
    const [modal, setModal] = useState(false)
    return (
        <>
            <IconButton variant='contained' color='error' onClick={() => setModal(true)}><DeleteIcon /></IconButton>
            <AlertModal
                open={modal}
                onClose={() => setModal(false)}
                anchor='right'
                sx={{ zIndex: 1300 }}
            >
                <Delete
                    selected={selected}
                    handleGetData={handleGetData}
                    onClose={() => setModal(false)}
                />
            </AlertModal>
        </>
    )
}

