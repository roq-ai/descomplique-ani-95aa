import axios from 'axios';
import queryString from 'query-string';
import { ActivityInterface, ActivityGetQueryInterface } from 'interfaces/activity';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getActivities = async (
  query?: ActivityGetQueryInterface,
): Promise<PaginatedInterface<ActivityInterface>> => {
  const response = await axios.get('/api/activities', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createActivity = async (activity: ActivityInterface) => {
  const response = await axios.post('/api/activities', activity);
  return response.data;
};

export const updateActivityById = async (id: string, activity: ActivityInterface) => {
  const response = await axios.put(`/api/activities/${id}`, activity);
  return response.data;
};

export const getActivityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/activities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteActivityById = async (id: string) => {
  const response = await axios.delete(`/api/activities/${id}`);
  return response.data;
};
