import React, {Component} from 'react';

import './TextField.css';

class TextField extends Component {
  constructor(props){
    super(props);

    this.state = {
      isFilled: false,
    }
  }
  render() {
    let className = this.state.isFilled ? 'input input--minoru input--filled' : 'input input--minoru';
    if(this.props.additionalClasses) {
      className = className + ' ' + this.props.additionalClasses;
    }
    return (
      <div id="TextField">
        <span className={className}>
					<input className="input__field input__field--yoko" type="text" id="input-16" onChange={(event) => {
					  if(event.target.value === '')
					    this.setState({isFilled: false});
            else
					    this.setState({isFilled: true});

            this.props.onChangeText(event.target.value);
          }} />
					<label className="input__label input__label--yoko" htmlFor="input-16">
						<span className="input__label-content input__label-content--yoko">{this.props.label}</span>
					</label>
				</span>
      </div>
    );
  }
}

export default TextField;