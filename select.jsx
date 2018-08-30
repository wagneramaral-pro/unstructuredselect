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
  componentDidMount(){
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
    }
    // if default value prop doesn't match the value of an option passed in raise an error
    else if (!this.props.options.find((option)=>{ return deepEqual(option.value, this.props.defaultValue)})) {
      throw Error("Default value must be in options")
    }
    else {
      this.setState({
        options: optionsObject,
        value: defaultValue
      });
    }
  }

  // Use the object in state of complex types and the index to convert the options value (which is an index) into the appropriate complex value
  onChange(event){
    const value = this.state.options.find((option)=>{return option.index===event.target.value}).value
    this.setState({
      value
    })
    this.props.onChange(value)
  }

  renderOptions(){
    if (!this.state.options) return <div />
    else{
      return(
        <select
          value={this.state.value}
          onChange={this.onChange}
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