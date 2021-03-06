import React, {Component} from 'react';
const deepEqual = require('fast-deep-equal');

export default class UnstructuredSelect extends Component {
  constructor(props){
    super(props);
    this.state={};
    this.onChange = this.onChange.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  // on mount construct an object that includes options labels and a value of any type 
  componentWillMount(){
    const optionsObject = this.props.options.map((optionObject, idx)=>{
      return {
        index: idx,
        value: optionObject.value,
        label: optionObject.label || optionObject.value
      }
    });
    // if no default value passed in dont set a default value 
    let defaultValue = this.props.defaultValue
    if (!defaultValue){
      this.setState({
        options: optionsObject
      });
      return;
    }
    // if default value prop doesn't match the value of an option passed in raise an error
    if (!this.props.options.find((option)=>{ return deepEqual(option.value, this.props.defaultValue)})) {
      throw Error("Default value must be in options");
    }
    if (this.isMultiple()) {
      // if defaultValue is a string it should not be destructured even if isMultiple
      defaultValue = typeof defaultValue === 'string' ? [defaultValue] : [...defaultValue];
    }
    this.setState({
      options: optionsObject,
      value: defaultValue
    });
  }

  // Use the object in state of complex types and the index to convert the options value (which is an index) into the appropriate complex value
  onChange(event){
    let value = []

    if (this.isMultiple()) {      
      const selectedValues = [...event.target.selectedOptions].map(obj => obj.value)
      value = this.state.options.filter((option)=>{return selectedValues.includes(option.index)}).map(obj => obj.value)
    } else {
      value = this.state.options.find((option)=>{return option.index===event.target.value}).value
    }

    this.setState({
      value
    })
    this.props.onChange(value)
  }

  isMultiple(){
    return this.props.multiple
  }

  getAdditionalAttributes(){
    const attributeObj = {}
    if (this.props.multiple) {
      attributeObj.multiple = true
    }
    if (this.props.autofocus) {
      attributeObj.autofocus = true
    }
    if (this.props.disabled) {
      attributeObj.disabled = true
    }
    if (this.props.form) {
      attributeObj.form = this.props.form
    }
    return attributeObj
  };

  renderOptions(){
    if (!this.state.options) return <div />
    else{
      return(
        <select
          value={this.state.value}
          onChange={this.onChange}
          {...this.getAdditionalAttributes()}
        >
        {
          this.state.options.map((option)=>{
            return(
              <option key={option.index} value={option.index}>{option.label}</option>
            )
          })
        }
        </select>
      )
    }
  }
  render(){
    return(
      <div>
        {this.renderOptions()}
     </div>
    )
  }
}