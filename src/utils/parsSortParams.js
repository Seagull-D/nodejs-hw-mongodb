import { sortList } from '../constants/index.js';

export const parsSortParams = ({ sortBy = 'name', sortOrder }, sortFields) => {
  console.log('sortBy:', sortBy);
  console.log('sortOrder:', sortOrder);

  const parsedSortOrder = sortList.includes(sortOrder?.toLowerCase())
    ? sortOrder.toLowerCase()
    : sortList[0];

  const parsedSortBy = sortFields.includes(sortBy) ? sortBy : 'name';

  console.log('parsedSortBy:', parsedSortBy);
  console.log('parsedSortOrder:', parsedSortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
