const select = require('./select');
import React from 'react';
import UnstructuredSelect from './select';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const options = [
    ['cats', 'dogs'],
    {object: 'obj'}
];

test('select renders', test => {
    const component = shallow(<UnstructuredSelect options={options} />);
    expect(component.find('option').length).toBe(2);
});