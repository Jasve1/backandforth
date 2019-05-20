import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import App from './App';

afterEach(cleanup);

it('renders app withe header text', () => {
    const {getByText} = render(<App/>)
    expect(getByText('Questions loading...')).toBeInTheDocument();
})