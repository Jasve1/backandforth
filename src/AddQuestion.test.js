import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import AddQuestion from './components/AddQuestion';

afterEach(cleanup);

it('test form', () => {
    const {getByPlaceholderText} = render(<AddQuestion/>);
    expect(getByPlaceholderText('Your name')).toBeInTheDocument();
})