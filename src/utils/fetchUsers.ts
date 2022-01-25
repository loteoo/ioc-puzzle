import User, { UserData } from '/src/utils/User';

interface Args {
  orderByColumn?: keyof UserData;
  orderByDirection?: 'asc' | 'desc';
  offset?: number;
  limit?: number;
}

const fetchUsers = async ({
  orderByColumn = 'id',
  orderByDirection = 'asc',
  offset = 0,
  limit = 25,
}: Args) => {

  // TODO:
  // Demo DISCLAIMER: this is used as a fake "endpoint". It's just a static JSON file.
  // It's used in a way that would emulate usage of a real REST API with sorting / pagination capabilities.

  const queryString = new URLSearchParams({ orderByColumn, orderByDirection, offset, limit } as any).toString();

  const response = await fetch(`/users.json?${queryString}`);

  let users: UserData[] = await response.json();

  const total = users.length;

  // Fake "sorting" for demo
  users.sort((a, b) => {

    const modifier = orderByDirection === 'asc' ? 1 : -1;

    if ( a[orderByColumn] < b[orderByColumn] ){
      return -1 * modifier;
    }
    if ( a[orderByColumn] > b[orderByColumn] ){
      return 1 * modifier;
    }
    return 0;

  })

  // Fake "pagination" for demo
  users = users.slice(offset, offset + limit);



  // "Hydrate" user objects into the User class
  const hydratedUsers = users.map(data => new User(data))

  console.log('fetchUsers response: ', {
    users,
    total
  })

  return {
    users: hydratedUsers,
    total
  }
}

export default fetchUsers;
