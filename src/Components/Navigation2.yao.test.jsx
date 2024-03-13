import React from 'react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Scanner from './Scanner';


vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom'); 
  return {
    ...originalModule,
    useNavigate: vi.fn(),
  };
});

describe('Scanner Page', () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = vi.fn();
    vi.mocked(useNavigate).mockImplementation(() => navigateMock);
    render(<Scanner user={{}} />);
  });


  test('navigates to /ScannerCompatibility when the second div is clicked', () => {
    const compatibilityLink = screen.getByText('Capture 2 Items for Compatibility').closest('div');
    fireEvent.click(compatibilityLink);
    expect(navigateMock).toHaveBeenCalledWith('/ScannerCompatibility');
  });
});
