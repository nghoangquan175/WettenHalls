import qs from 'qs';

export const fetchStrapi = async (path = '', params = {}, options = {}) => {
  const queries = qs.stringify(params, { encodeValuesOnly: true });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${path}?${queries}`, options);
  return res.json();
};
