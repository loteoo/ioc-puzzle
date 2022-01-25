import { DragEventHandler } from 'react';
import useUsers from '/src/hooks/useUsers';
import useSortableColumns from './useSortableColumns';

import css from './table.module.css';
import User from '/src/utils/User';

const preventDefault: DragEventHandler = (ev) => {
  ev.preventDefault();
}

const userColumnLabels: Record<keyof User, string> = {
  id: 'ID #',
  firstName: 'First name',
  lastName: 'Last name',
  fullName: 'Full name',
  email: 'Email',
  city: 'City',
  createdAt: 'Registered Date',
  registeredDate: 'Registered Date',
  daysSinceRegistered: 'DSR',
}

const UsersTable = () => {

  const {
    columns,
    sortingPreference,
    handleDragStart,
    handleDrop,
    loadUserPreference,
    saveUserPreference,
    handleColumnClick,
  } = useSortableColumns();


  const { users, loading, fetchMore } = useUsers({
    orderByColumn: sortingPreference.orderByColumn,
    orderByDirection: sortingPreference.orderByDirection,
  })

  return (
    <div className={css.table}>
      <h4>Columns order:</h4>
      <div className="grid">
        <button onClick={saveUserPreference}>Save</button>
        <button onClick={loadUserPreference}>Load</button>
      </div>
      <figure>
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col}
                  draggable
                  onDragStart={handleDragStart(col)}
                  onDrop={handleDrop(col)}
                  onDragOver={preventDefault} // Without this, the onDrop event doesn't register
                  onClick={handleColumnClick(col)}
                >
                  {userColumnLabels[col]}
                  {sortingPreference.orderByColumn === col && (
                    <>
                      {sortingPreference.orderByDirection === 'asc' ? '▲' : '▼'}
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={columns.length} aria-busy="true" />
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  {columns.map(col => (
                    <td key={col}>{user[col]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </figure>
      <button onClick={fetchMore} aria-busy={loading}>Load more</button>
    </div>
  )
}

export default UsersTable;
