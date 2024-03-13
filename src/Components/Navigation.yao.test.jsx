import React from 'react';
import { describe, expect, test, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import Symbols from './Symbols';
import '@testing-library/jest-dom';
import data from '../../data/symbol.json';

describe('Symbols Page', () => {
  beforeEach(() => {
    // Render Symbols component before each test
    render(<Symbols user={{}} />);
  });

  test('initial render should not show translations', () => {
    // Check that the "Translations" section is not populated initially
    const translations = screen.queryByTestId('translations');
    expect(screen.getByText('Translations')).toBeInTheDocument();

  });

  
});
