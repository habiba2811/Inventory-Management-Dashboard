'use client';

import { useGetUsersQuery } from '@/app/state/api';
import Header from '@/app/(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useAppSelector } from '@/app/redux';

const columns: GridColDef[] = [
  { field: 'userId', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const Users = () => {
  const globalSearchTerm = useAppSelector(
    (state) => state.global.globalSearchTerm ?? ''
  );
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!globalSearchTerm) return users;
    const needle = globalSearchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(needle) ||
        user.email.toLowerCase().includes(needle) ||
        user.userId.toLowerCase().includes(needle)
    );
  }, [users, globalSearchTerm]);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }
  return (
    <div className="flex flex-col" data-testid="users-page">
      <Header name="Users" />
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        className="bg-white shadow rounded-lg border-gray-200 mt-5 !text-gray-700"
        data-testid="users-grid"
      />
    </div>
  );
};
export default Users;
