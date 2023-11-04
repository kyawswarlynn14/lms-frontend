import React, {FC, useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Modal } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import {format} from 'timeago.js'
import Loader from '../../Loader/Loader'
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi'
import { MdOutlineEmail } from 'react-icons/md'
import { styles } from '@/app/styles/style'
import toast from 'react-hot-toast'

type Props = {
    isTeam: boolean
}

const AllUsers:FC<Props> = ({isTeam}) => {
    const { theme, setTheme } = useTheme();
    const [active, setActive] = useState(false);
    const [role, setRole] = useState("admin");
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [confirmUserId, setConfrimUserId] = useState("");
    const [updateUserRole, {error: updateError, isSuccess}] = useUpdateUserRoleMutation();
    const [deleteUser, {isSuccess: deleteSuccess, error: deleteError}] = useDeleteUserMutation();
    const {isLoading, data, refetch} = useGetAllUsersQuery({}, {refetchOnMountOrArgChange: true});

    useEffect(() => {
        if (updateError) {
            if("data"  in updateError) {
                const errorMessage = updateError as any;
                toast.error(errorMessage.data.message);
            }
        }

        if(isSuccess) {
            refetch();
            toast.success("User role updated successfully");
            setActive(false);
        }

        if(deleteSuccess) {
            refetch();
            toast.success("Delete user successfully");
            setOpen(false);
        }
        if(deleteError) {
            if("data"  in deleteError) {
                const errorMessage = deleteError as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [updateError, isSuccess, deleteError, deleteSuccess])

    const confirmDelete = (id: string) => {
        setOpen(!open);
        setConfrimUserId(id);
    }

    const deleteUserHandler = () => {
        const id = confirmUserId;
        deleteUser({id});
        setOpen(!open);
    }

    const updateUserRoleHandler = async () => {
        const id = userId;
        await updateUserRole({id, role});
        setActive(!active);
    }

    const columns = [
        {field: "id", headerName: "ID", flex: 0.5},
        {field: "name", headerName: "Name", flex: 0.3},
        {field: "email", headerName: "Email Address", flex: 0.5},
        {field: "role", headerName: "Role", flex: 0.2},
        {field: "courses", headerName: "Courses", flex: 0.2},
        {field: "created_at", headerName: "Join At", flex: 0.3},
        {
            field: " ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                    <Button onClick={() => confirmDelete(params.row.id)} >
                        <AiOutlineDelete className="dark:text-white text-black" size={20} />
                    </Button>
                    </>
                )
            }
        },
        {
            field: "  ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                    <a href={`mailto:${params.row.email}`}>
                        <MdOutlineEmail className="dark:text-white text-black" size={20} />
                    </a>
                    </>
                )
            }
        },
    ];

    const rows: any = [];

    if (isTeam) {
        if(data) {
            const newData = data.users.filter((item: any) => item.role === "admin");
            newData.forEach((item: any) => {
                rows.push({
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    role: item.role,
                    courses: item.courses.length,
                    created_at: format(item.createdAt),
                })
            })
        }
    } else {
        data && data.users.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt),
            })
        })
    }

  return (
    <div className='mt-[100px]'>
        {isLoading ? (
            <Loader />
        ) : (
            <Box m="20px">
                <div className="w-full flex justify-end">
                    <button 
                    onClick={() => setActive(!active)}
                    className={`bg-cyan-400 text-black hover:bg-opacity-80 p-2 px-4 rounded-xl`}>
                        Edit User Role
                    </button>
                </div>
                <Box
                m="20px 0 0 0"
                height="70vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                        outline: "none"
                    },
                    "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                        color: theme === "dark" ? "#fff" : "#000",
                    },
                    "& .MuiDataGrid-sortIcon": {
                        color: theme === "dark" ? "#fff" : "#000",
                    },
                    "& .MuiDataGrid-row": {
                        color: theme === "dark" ? "#fff" : "#000",
                        borderBottom: 
                            theme=== "dark"
                            ? "1px solid #ffffff30 !important"
                            : "1px solid #ccc !important",
                    },
                    "& .MuiTablePagination-root": {
                        color: theme === "dark" ? "#fff" : "#000",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-colunm--cell": {
                        color: theme === "dark" ? "#fff" : "#000",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                        borderBottom: "none",
                        color: theme === "dark" ? "#fff" : "#000",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        color: theme === "dark" ? "#fff" : "#000",
                        backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                        borderTop: "none",
                    },
                    "& .MuiCheckbox-root": {
                        color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: "#fff !important",
                    },
                }}
                >
                    <DataGrid checkboxSelection rows={rows} columns={columns} />
                </Box>

                {open && (
                    <Modal 
                        open={open}
                        onClose = {() => setOpen(!open)}
                        aria-labelledby = "modal-modal-title"
                        aria-describedby = "modal-modal-description"
                    >
                        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                            <h1 className='text-xl dark:text-white mb-4'>
                                Are you sure you want to delete this user?
                            </h1>
                            <div className='w-full flex justify-between'>
                                <button className="bg-cyan-400 text-white rounded-xl p-2 px-6" onClick={() => setOpen(!open)}>
                                    Cancel
                                </button>

                                <button className="bg-red-600 text-white rounded-xl p-2 px-6" onClick={deleteUserHandler}>
                                    Delete
                                </button>
                            </div>
                        </Box>
                    </Modal>
                )}

                {active && (
                    <Modal 
                        open={active}
                        onClose = {() => setActive(!active)}
                        aria-labelledby = "modal-modal-title"
                        aria-describedby = "modal-modal-description"
                    >
                        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                            <form>
                                <label className={`${styles.label}`}>
                                    Enter User ID
                                </label>
                                <input 
                                    type="text" 
                                    value={userId}
                                    onChange={e => setUserId(e.target.value)}
                                    id='userId'
                                    placeholder='123456774343'
                                    className={`${styles.input} mb-2`}
                                />

                                <label className={`${styles.label}`}>
                                    Select User Role
                                </label>
                                <select
                                    required
                                    name="role"
                                    className={`${styles.input} mb-4`}
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                >
                                    <option className='dark:bg-slate-700' value="admin">Admin</option>
                                    <option className='dark:bg-slate-700' value="user">User</option>
                                </select>

                                <button onClick={updateUserRoleHandler} className={styles.button}>
                                    Submit
                                </button>
                            </form>
                        </Box>
                    </Modal>
                )}
            </Box>
        )}
    </div>
  )
}

export default AllUsers;