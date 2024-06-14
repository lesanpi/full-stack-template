import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactQueryClientExample from '@/components/example-connect-backend/ReactQueryClientExample';
import { useUsers } from '@/services/user/hooks';

// Configura un QueryClient que no reintenta automáticamente las consultas fallidas
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Componente wrapper para incluir el contexto de QueryClient
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('ReactQueryClientExample', () => {
  it('renders user data correctly', async () => {
    render(<ReactQueryClientExample users={[]} />, { wrapper }); // Asegúrate de usar el wrapper aquí

    // Espera a que el texto "Juan" esté en el documento
    await waitFor(() => expect(screen.getByText('Juan')).toBeInTheDocument());

    // Comprueba si el título "iPhone 9" está presente
    expect(screen.getByText('iPhone 9')).toBeInTheDocument();
  });
});
