import axios from "axios"

export const getRandomActivity = async () => {
  const response = await axios.get("https://www.boredapi.com/api/activity");
  return response.data;
}

/* export const getActivityByType = async (type: string) => {
  const response = await axios.get(`https://www.boredapi.com/api/activity?type=${type}`);
  return response.data;
} */

/* export const getActivityByParticipants = async (participants: number) => {
  const response = await axios.get(`https://www.boredapi.com/api/activity?participants=${participants}`);
  return response.data;
} */

