const select = require('./select');
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const fakeState = {
    options: {
        index: 0,
        label: "lolxd"
    }
}

test('select renders', () => {
    const component = shallow(<select state={fakeState} />)
});