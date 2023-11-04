import React, {FC, useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Link, Modal } from '@mui/material'
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import {format} from 'timeago.js'
import Loader from '../../Loader/Loader'
import toast from 'react-hot-toast'

type Props = {}

const AllCourses:FC<Props> = () => {
    const { theme, setTheme } = useTheme();
    const {isLoading, data, error, refetch} = useGetAllCoursesQuery({}, {refetchOnMountOrArgChange: true});
    const [deleteCourse, {isSuccess: deleteSuccess, error: deleteError}] = useDeleteCourseMutation();
    const [open, setOpen] = useState(false);
    const [confirmCourseId, setConfrimCourseId] = useState("");

    const confirmDelete = (id: string) => {
        setOpen(!open);
        setConfrimCourseId(id);
    }

    const deleteCourseHandler = () => {
        const id = confirmCourseId;
        deleteCourse({id});
        setOpen(!open);
    }

    useEffect(() => {
        if(deleteSuccess) {
            refetch();
            toast.success("Delete course successfully");
            setOpen(false);
        }
        if(deleteError) {
            if("data"  in deleteError) {
                const errorMessage = deleteError as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [deleteError, deleteSuccess])

    const columns = [
        {field: "id", headerName: "ID", flex: 0.5},
        {field: "title", headerName: "Course Title", flex: 1},
        {field: "ratings", headerName: "Ratings", flex: 0.5},
        {field: "purchased", headerName: "Purchased", flex: 0.5},
        {field: "created_at", headerName: "Created At", flex: 0.5},
        {
            field: " ",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                    <Link href={`/admin/edit-course/${params.row.id}`}>
                        <AiFillEdit className="dark:text-white text-black" size={20} />
                    </Link>
                    </>
                )
            }
        },
        {
            field: "  ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                    <Button onClick={() => confirmDelete(params.row.id)}>
                        <AiOutlineDelete className="dark:text-white text-black" size={20} />
                    </Button>
                    </>
                )
            }
        },
    ];

    const rows: any = [];

    {data && data.courses.forEach((item: any) => {
        rows.push({
            id: item._id,
            title: item.name,
            ratings: item.ratings,
            purchased: item.purchased,
            created_at: format(item.createdAt),
        })
    })}

  return (
    <div className='mt-[120px]'>
        {isLoading ? (
            <Loader />
        ) : (
            <Box m="20px">
                <Box
                m="40px 0 0 0"
                height="80vh"
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

                                <button className="bg-red-600 text-white rounded-xl p-2 px-6" onClick={deleteCourseHandler}>
                                    Delete
                                </button>
                            </div>
                        </Box>
                    </Modal>
                )}
            </Box>
        )}
    </div>
  )
}

export default AllCourses