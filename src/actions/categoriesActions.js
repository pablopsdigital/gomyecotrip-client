import axiosClient from '../services/axiosAPIClient';

// Configure params
const apiVersionUrl = '/api/v1';

const categories = [
  {
    _id: '1',
    name: 'Adventure',
    image:
      'https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    _id: '2',
    name: 'Relax',
    image:
      'https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    _id: '3',
    name: 'Family',
    image:
      'https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    _id: '4',
    name: 'Culture',
    image:
      'https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
];

export const getListCategories = () => {
  const url = `${apiVersionUrl}/experiences`;
  return axiosClient.get(url);
};
