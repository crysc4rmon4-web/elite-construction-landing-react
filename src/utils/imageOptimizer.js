
export const optimizeImg = (url, width = 800) => {
  if (!url) return '';
  if (url.includes('unsplash.com')) {
    return `${url.split('?')[0]}?auto=format&fit=crop&w=${width}&q=80`;
  }
  if (url.includes('pexels.com')) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}`;
  }
  return url;
};