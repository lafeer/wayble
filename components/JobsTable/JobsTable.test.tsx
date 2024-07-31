import { render, screen, act } from '@/test-utils';
import GlobalStateProvider, { GlobalStateContext } from '@/context/GlobalStateContext';
import { JobsTable } from './JobsTable';
import { fetchJobs } from '@/services/api';

jest.mock('../../services/api', () => ({
  fetchJobs: jest.fn(),
}));

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe('JobsTable component', () => {
  it('renders the table with correct headers', async () => {
    const mockJobs = [
      { id: 1, company: 'Company A', title: 'Job A', description: 'Description A' },
      { id: 2, company: 'Company B', title: 'Job B', description: 'Description B' },
    ];
    (fetchJobs as jest.Mock).mockResolvedValue(mockJobs);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <GlobalStateProvider>
          <GlobalStateContext.Consumer>{() => <JobsTable />}</GlobalStateContext.Consumer>
        </GlobalStateProvider>
      );
    });
    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.getByText('Job Title')).toBeInTheDocument();
    expect(screen.getByText('About the Position')).toBeInTheDocument();

    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Job A')).toBeInTheDocument();
    expect(screen.getByText('Description A')).toBeInTheDocument();

    expect(screen.getByText('Company B')).toBeInTheDocument();
    expect(screen.getByText('Job B')).toBeInTheDocument();
    expect(screen.getByText('Description B')).toBeInTheDocument();
  });

  it('navigates to the correct job page when a row is clicked', async () => {
    const mockJobs = [
      { id: 1, company: 'Company A', title: 'Job A', description: 'Description A' },
    ];
    (fetchJobs as jest.Mock).mockResolvedValue(mockJobs);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <GlobalStateProvider>
          <GlobalStateContext.Consumer>{() => <JobsTable />}</GlobalStateContext.Consumer>
        </GlobalStateProvider>
      );
    });
    const row = screen.getByText('Company A').closest('tr');
    row?.click();

    expect(mockRouterPush).toHaveBeenCalledWith('/job/1');
  });
});
