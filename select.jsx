import React, {Component} from 'react';

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
        label: optionObject.value
      }
    });
    this.setState({
      options: optionsObject
    });
  }

  // Use the object in state of complex types and the index to convert the options value (which is an index) into the appropriate complex value
  onChange(event){
    const value = this.state.options.filter((option)=>{return option.index===event.target.value})[0].value;
    this.props.onChange(value)
  }

  renderOptions(){
    if (!this.state.options) return <div />
    else{
      return(
        <select
          onChange={this.onChange}
        >
        {
          this.state.options.map((option)=>{
            return(
              <option value={option.index}>{option.label}</option>
            )
          })
        }
        </select>
      )
    }
  }
  render(){
    <div>
     {this.renderOptions()}
    </div>
  }
}