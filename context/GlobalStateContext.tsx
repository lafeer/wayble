import React, { createContext, useReducer, useEffect } from 'react';
import { fetchJobs } from '@/services/api';

interface IApplicationState {
  jobs: IJob[];
}

const initialState: IApplicationState = {
  jobs: [],
};

export const GlobalStateContext = createContext<{
  state: IApplicationState;
  dispatch: React.Dispatch<Action>;
}>(
  // @ts-ignore
  null
);

export const ACTIONS = {
  FETCH_JOBS: 'FETCH_JOBS',
  APPLY_FOR_JOB: 'APPLY_FOR_JOB',
};

type Action = {
  type: keyof typeof ACTIONS;
  data: any;
};

const reducer = (state: IApplicationState, action: Action) => {
  switch (action.type) {
    case ACTIONS.FETCH_JOBS:
      return { ...state, jobs: action.data };
    case ACTIONS.APPLY_FOR_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.data.id ? { ...job, applied: true } : job
        ),
      };
    default:
      return state;
  }
};

export default function GlobalStateProvider({ children }: { children?: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchJobs()
      .then((jobs) => dispatch({ type: 'FETCH_JOBS', data: jobs }))
      .catch((err) => {
        throw new Error(err);
      });
  }, [dispatch]);

  return (
    <GlobalStateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
