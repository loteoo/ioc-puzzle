import { useState } from 'react';
import useAuth from '/src/hooks/useAuth';
import User, { UserData, virtualProps } from '/src/utils/User';

const defaultColumnsOrder: Array<keyof User> = ['id', 'firstName', 'lastName', 'fullName', 'email', 'city', 'registeredDate', 'daysSinceRegistered']


interface SortingPreference {
  orderByColumn?: keyof UserData;
  orderByDirection?: 'asc' | 'desc';
}

const defaultSortingPreference: SortingPreference = {
  orderByColumn: 'id',
  orderByDirection: 'desc'
}

const useSortableColumns = () => {

  const { me, setUserPreference } = useAuth();

  const [columns, setColumns] = useState(defaultColumnsOrder);
  const [sortingPreference, setSortingPreference] = useState(defaultSortingPreference);

  const [draggedColumn, setDraggedColumn] = useState<keyof User | undefined>();

  const handleDragStart = (colName: keyof User) => () => {
    setDraggedColumn(colName);
  }

  const handleDrop = (colName: keyof User) => () => {
    // Swap columns
    if (draggedColumn) {
      setColumns(prev => {
        const targetIndex = prev.indexOf(colName);
        const newColumns = prev.filter(col => col !== draggedColumn);
        newColumns.splice(targetIndex, 0, draggedColumn);
        return newColumns;
      })
    }
    setDraggedColumn(undefined);
  }

  const loadUserPreference = () => {
    if (me?.preferences?.columnsOrder) {
      setColumns(me.preferences.columnsOrder)
    }
    if (me?.preferences?.orderByColumn && me?.preferences?.orderByDirection) {
      setSortingPreference({
        orderByColumn: me.preferences.orderByColumn,
        orderByDirection: me.preferences.orderByDirection,
      })
    }
  }

  const saveUserPreference = () => {
    setUserPreference({
      columnsOrder: columns,
      orderByColumn: sortingPreference.orderByColumn,
      orderByDirection: sortingPreference.orderByDirection,
    })
  }

  const handleColumnClick = (colName: keyof User) => () => {
    if (!virtualProps.includes(colName)) {
      if (sortingPreference.orderByColumn === colName) {
        setSortingPreference({
          orderByColumn: colName,
          orderByDirection: sortingPreference.orderByDirection === 'asc' ? 'desc' : 'asc',
        })
      } else {
        setSortingPreference({
          orderByColumn: colName as keyof UserData,
          orderByDirection: 'desc',
        })
      }
    }
  }

  return {
    columns,
    sortingPreference,
    handleDragStart,
    handleDrop,
    loadUserPreference,
    saveUserPreference,
    handleColumnClick,
  }
}

export default useSortableColumns;
