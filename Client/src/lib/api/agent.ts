import axios from "axios";

const sleep = (delay: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Response interceptor: Do delay 1 sec before a response is received
agent.interceptors.response.use(
  // Fake delay: simulate loading in application
  async (response) => {
    try {
      await sleep(1000);
      return response;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
);

export default agent;
