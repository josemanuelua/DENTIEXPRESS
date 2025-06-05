// tests/Home.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home/Home';
import { IntlProvider } from 'react-intl';
import messagesSpanish from '../language/es.json';
import messagesEnglish from '../language/en.json';

describe('Home', () => {
  it('muestra mensaje de bienvenida en español', () => {
    render(
      <IntlProvider locale="es" messages={messagesSpanish}>
        <Home />
      </IntlProvider>
    );
    expect(screen.getByText(/Bienvenidos/i)).toBeInTheDocument();
  });

  it('muestra mensaje de bienvenida en inglés', () => {
    render(
      <IntlProvider locale="en" messages={messagesEnglish}>
        <Home />
      </IntlProvider>
    );
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});
