const select = require('./select');
import React from 'react';
import UnstructuredSelect from './select';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import sinon from 'sinon';

const options = [
    {value: ['cats', 'dogs'], label: 'cats and dogs'},
    {value: {testObj: 'objValue'}, label: 'testObj'},
    {value: 'testPrimitive', label:'testPrimitive'}
]; 

test('renders options', ()=>{
    const component = shallow(<UnstructuredSelect options={options} />);
    expect(component.find('option').length).toBe(3);
});

test('Sets state to object with index value and label ', ()=>{
    const component = shallow(<UnstructuredSelect options={options} />);
    const expectedState = [
            {index:0, value: ['cats', 'dogs'], label: 'cats and dogs'},
            {index:1, value: {testObj: 'objValue'}, label: 'testObj'},
            {index:2, value: 'testPrimitive', label:'testPrimitive'}
    ]
    expect(component.state().options).toEqual(expectedState);
});

test('onChange calls onChange from props with correct argument', () => {
    const onChangeSpy = sinon.spy();
    const component = shallow(<UnstructuredSelect options={options} onChange={onChangeSpy}/>);
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
    expect(component.state().value).toEqual(undefined);
});

test('componentDidMount sets value to defaultValue from props if passed a value', ()=>{
    const defaultValue = ['cats', 'dogs']
    const component = shallow(<UnstructuredSelect options={options} defaultValue={defaultValue}/>);
    expect(component.state().value).toEqual(defaultValue);
})

test('componentDidMount throws an error if a default value is passed in that is not in the options passed in', ()=>{
    const defaultValue = { 'over': '9000' }
    try {
        shallow(<UnstructuredSelect defaultValue={defaultValue} options={options}/>, {disableLifecycleMethods:true});
        throw new Error('Error not triggered');
    } catch (error) {
        expect(error.message).toBe("Default value must be in options");
    }
})

test('multiple prop successfully adds multiple attribute to select', ()=>{
    const component = shallow(<UnstructuredSelect multiple={true} options={options}/>);
    expect(component.find('select').filterWhere((item) => {
        return item.prop('multiple') === true;
      }).length).not.toBe(0);
})

test('multiple prop defaultValue ', ()=>{
    const component = shallow(<UnstructuredSelect defaultValue={'testPrimitive'} multiple={true} options={options}/>);
    expect(component.find('select').filterWhere((item) => {
        return item.prop('multiple') === true;
      }).length).not.toBe(0);
    expect(component.state().value).toEqual(['testPrimitive']);
})

test('onChange sets the value in state correctly when multiple is passed in', ()=>{
    const onChangeSpy = sinon.spy();
    const component = shallow(<UnstructuredSelect multiple={true} options={options} onChange={onChangeSpy}/>);
    const valuesToSelect = [0, 1]
    const selectedValues = []
    valuesToSelect.forEach((value) => {
      let event = {
        target: {
          selectedOptions:[...selectedValues, {value}]
        }
      };
      component.instance().onChange(event);
      selectedValues.push({value})
    })
    expect(component.state().value).toEqual(options.filter((option, index) => valuesToSelect.includes(index)).map(obj => obj.value));
})

test('element attributes are being set properly', ()=>{
  const form = "testForm"
  const autofocus = true
  const disabled = true

  const component = shallow(<UnstructuredSelect autofocus={autofocus} disabled={disabled} form={form} options={options}/>);
    expect(component.find('select').filterWhere((item) => {
        const isAutofocus = item.prop('autofocus') === autofocus;
        const isDisabled = item.prop('disabled') === disabled;
        const isProperForm = item.prop('form') === form;
        return isAutofocus && isDisabled && isProperForm;
      }).length).not.toBe(0);
})