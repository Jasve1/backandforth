import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import App from './App';

afterEach(cleanup);

it('isLoading', () => {
    const {getByText} = render(<App/>)
    expect(getByText('Questions loading...')).toBeInTheDocument();
});

it('form headline', () => {
    const {getByText} = render(<App/>)
    expect(getByText('Ask your question')).toBeInTheDocument();
});