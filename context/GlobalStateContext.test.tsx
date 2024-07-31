import React from 'react';
import { render, screen } from '@testing-library/react';
import GlobalStateProvider, { GlobalStateContext } from '@/context/GlobalStateContext';
import { fetchJobs } from '@/services/api';

jest.mock('../services/api', () => ({
  fetchJobs: jest.fn(),
}));

describe('GlobalStateProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches jobs on mount and updates the state', async () => {
    const mockJobs = [
      { id: 1, company: 'Company A', title: 'Job A', description: 'Description A' },
      { id: 2, company: 'Company B', title: 'Job B', description: 'Description B' },
    ];
    (fetchJobs as jest.Mock).mockResolvedValue(mockJobs);

    render(
      <GlobalStateProvider>
        <GlobalStateContext.Consumer>
          {({ state }) => (
            <div>
              {state.jobs.map((job) => (
                <div key={job.id}>{job.title}</div>
              ))}
            </div>
          )}
        </GlobalStateContext.Consumer>
      </GlobalStateProvider>
    );

    expect(fetchJobs).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Job A')).toBeInTheDocument();
    expect(await screen.findByText('Job B')).toBeInTheDocument();
  });
});
