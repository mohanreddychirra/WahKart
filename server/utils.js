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

const isInt = (value) => (
  (
    typeof value == 'number' ||
    typeof value == 'string'
  ) && !!(`${value}`.match(/^\d+$/))
);

export const filterWhere = (filter) => {
  if (!filter) return {}
  let { min, max, shopIds } = filter;

  min = isInt(min) && parseInt(min) > 0 ? parseInt(min) : null;
  max = isInt(max) && parseInt(max) > 0 ? parseInt(max) : null;
  if (max && min && max <= min) max = min;

  const where = {};

  // handle price
  if(min || max) where.price = {};

  if (min && max) {
    where.price.$and = {
      $gte: min,
      $lte: max
    }
  } else if (min) {
    where.price.$gte = min;
  } else if (max) {
    where.price.$lte = max;
  }

  // handle shop
  if (Array.isArray(shopIds) && shopIds.length) {
    where.shopId = {};
    where.shopId.$in = shopIds;
  }

  console.log(where);
  return where;
}
