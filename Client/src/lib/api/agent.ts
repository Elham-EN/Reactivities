import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../../app/router/Route";

const sleep = (delay: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Response interceptor: Do delay 1 sec before a response is received
agent.interceptors.response.use(
  // Fake delay: simulate loading in application
  async (response) => {
    await sleep(1000);
    return response;
  },

  // Any status codes that falls outside the range of 2xx cause this
  // function to trigger. Do something with response error
  async (error) => {
    await sleep(1000);

    const { status, data } = error.response;

    switch (status) {
      case 400:
        // Case 1: Validation errors (data.errors exists)
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          // flattens them into a single array and throws it
          // Before flat: [["Title is required", "Title too long"], ["City is required"]]
          // After flat:  ["Title is required", "Title too long", "City is required"]
          throw modalStateErrors.flat();
          // Case 2: Simple bad request (data.errors doesn't exist)
        } else {
          // Just shows a toast with the message.
          toast.error(data);
        }
        break;
      case 401:
        // Login failures are handled by the calling mutation's onError,
        // so the form can show a context-specific message instead.
        if (error.config?.url?.includes("/login")) break;
        toast.error("Unauthorised");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }

    return Promise.reject(error);
  },
);

export default agent;
