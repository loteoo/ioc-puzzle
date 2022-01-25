import { useCallback, useEffect, useState } from 'react';
import fetchUsers from '/src/utils/fetchUsers';
import User, { UserData } from '/src/utils/User';

interface Args {
  orderByColumn?: keyof UserData;
  orderByDirection?: 'asc' | 'desc';
  pageSize?: number;
}

interface TableState {
  loading: boolean;
  users: User[];
  total: number;
}

const useUsers = ({
  orderByColumn = 'id',
  orderByDirection = 'asc',
  pageSize = 25,
}: Args) => {

  const [data, setData] = useState<TableState>({
    loading: false,
    users: [],
    total: 0
  });

  // Re-fetch when sorting options change
  useEffect(() => {
    setData(prev => ({
      ...prev,
      loading: true,
    }))
    fetchUsers({
      orderByColumn,
      orderByDirection,
      offset: 0,
      limit: pageSize,
    })
      .then(response => {
        setData({
          loading: false,
          users: response.users,
          total: response.total,
        })
      })
  }, [orderByColumn, orderByDirection])

  // Create fetchMore callback
  const fetchMore = useCallback(() => {
    setData(prev => ({
      ...prev,
      loading: true,
    }))
    fetchUsers({
      orderByColumn,
      orderByDirection,
      offset: data.users.length,
      limit: pageSize,
    })
      .then(response => {
        setData(prev => ({
          loading: false,
          users: prev.users.concat(response.users),
          total: response.total,
        }))
      })
  }, [orderByColumn, orderByDirection, data.users.length])

  return {
    loading: data.loading,
    users: data.users,
    total: data.total,
    fetchMore,
  }
}

export default useUsers;
