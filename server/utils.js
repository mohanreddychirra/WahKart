export const productPerPage = 4;

export const capitalize = argument => {
  if (typeof argument !== 'string') return '';

  return (
    argument.split(' ')
      .filter(word => word.trim() !== '')      
      .map((word) => {
        const start = word[0].toUpperCase();
        const rest = word.substr(1).toLowerCase();
        return `${start}${rest}`;
      }).join(' ')
  );
}

export const paginate = (total, perPage, page=1) => {
  const rem = total % perPage;
  const remPageCount = parseInt(total / perPage);
  const pageCount = rem > 0 ? remPageCount + 1 : remPageCount;
  
  const pageSize = pageCount !== page || rem == 0 ? perPage : rem;
  
  return {
    total,
    pageCount,
    page,
    pageSize
  }
}
