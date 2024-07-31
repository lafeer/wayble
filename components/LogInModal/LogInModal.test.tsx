import { render, screen } from '@/test-utils';
import { Providers } from '@/providers';
import LogInModal from './LogInModal';

describe('LogInModal component', () => {
  it('renders the modal with correct title', () => {
    render(
      <Providers>
        <LogInModal opened onClose={jest.fn()} />
      </Providers>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
