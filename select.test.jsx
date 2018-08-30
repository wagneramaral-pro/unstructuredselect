const select = require('./select');
import React from 'react';
import UnstructuredSelect from './select';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import sinon from 'sinon';

const options = [
    {value: ['cats', 'dogs'], label: 'cats and dogs'},
    {value: {testObj: 'objValue'}, label: 'testObj'}
]; 

test('renders options', ()=>{
    const component = shallow(<UnstructuredSelect options={options} />);
    component.instance().componentDidMount();
    expect(component.find('option').length).toBe(2);
});

test('Sets state to object with index value and label ', ()=>{
    const component = shallow(<UnstructuredSelect options={options} />);
    component.instance().componentDidMount();
    const expectedState = {
        options: [
            {index: 1, value: 'cats', label: 'cats'}
        ]
    };
    expect(component.find('option').length).toBe(2);
});

test('onChange calls onChange from props with correct argument', () => {
    const onChangeSpy = sinon.spy();
    const component = shallow(<UnstructuredSelect options={options} onChange={onChangeSpy}/>);
    component.instance().componentDidMount();
    const event = {
        target: {
            value: 1
        }
    };
    component.instance().onChange(event);
    expect(onChangeSpy.getCall(0).args[0]).toEqual({testObj: 'objValue'})
});

test('onChange sets the value in state correctly', ()=>{
    const onChangeSpy = sinon.spy();
    const component = shallow(<UnstructuredSelect options={options} onChange={onChangeSpy}/>);
    component.instance().componentDidMount();
    const event = {
        target: {
            value: 1
        }
    };
    component.instance().onChange(event);
    expect(component.state().value).toEqual({testObj: 'objValue'});
});

test('componentDidMount sets value to undefined if not passed a value', ()=>{
    const component = shallow(<UnstructuredSelect options={options}/>);
    component.instance().componentDidMount();
    expect(component.state().value).toEqual(undefined);
});

test('componentDidMount sets value to defaultValue from props if passed a value', ()=>{
    const defaultValue = ['cats', 'dogs']
    const component = shallow(<UnstructuredSelect options={options} defaultValue={defaultValue}/>);
    component.instance().componentDidMount();
    expect(component.state().value).toEqual(defaultValue);
})

test('componentDidMount throws an error if a default value is passed in that is not in the options passed in', ()=>{
    const defaultValue = { 'over': '9000' }
    const component = shallow(<UnstructuredSelect defaultValue={defaultValue} options={options}/>, {disableLifecycleMethods:true});
    expect(() => component.instance.componentDidMount()).toThrow();
})  