const setCategory = (categoryArray, param) => {
  if (categoryArray.includes(param)) {
    categoryArray.splice(categoryArray.indexOf(param), 1)
  } else {
    categoryArray.push(param)
  }
  if(categoryArray.length === 0) {
    categoryArray = ['']
  }
  return categoryArray
}

const setSort = (sort, sortDirection, param) => {
  if (sort === param) {
    sortDirection === 'desc' ? sortDirection = 'asc' : sortDirection = 'desc'
  } else {
    sort = param
    sortDirection = 'desc'
  }
  sort = param
  return { sort, sortDirection }
}

export default {
  setCategory,
  setSort
}