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
