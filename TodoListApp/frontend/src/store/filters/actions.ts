// actions.ts
import { createAction } from "@reduxjs/toolkit";
import axios from "../../lib/axios";

export const setFilter =
  (user: any, filter: string) => async (dispatch: Function) => {
    try {
      if (filter === "all") {
        const response = await axios.get(`/api/tasks`);
        console.log(response);
        dispatch(setFilterSuccess(response.data));
      } else {
        const response = await axios.get(
          `/api/tasks?userId=${user?.id}&filter=${filter}`
        );
        console.log(response);

        if (response.status !== 200) {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
        dispatch(setFilterSuccess(response.data));
      }
    } catch (error) {
      console.error("An error occurred while fetching tasks:", error);
    }
  };

export const setFilterSuccess = createAction<string>("SET_FILTER_SUCCESS");
