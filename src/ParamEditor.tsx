import React from 'react';
import './App.css';


interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: { [key: number]: string };
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const paramValues: { [key: number]: string } = {};
    props.params.forEach(param => {
      const paramValue = props.model.paramValues.find(
          pv => pv.paramId === param.id
      );
      if (paramValue) {
        paramValues[param.id] = paramValue.value;
      } else {
        paramValues[param.id] = "";
      }
    });

    this.state = { paramValues };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState(prevState => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value
      }
    }));
  };

  getModel = (): Model => {
    const paramValues: ParamValue[] = Object.keys(this.state.paramValues).map(
        paramId => ({
          paramId: parseInt(paramId),
          value: this.state.paramValues[parseInt(paramId)]
        })
    );

    return { paramValues };
  };

  render() {
    return (
        <div className={'App'}>
          {this.props.params.map(param => (
              <div className={'Params'} key={param.id}>
                <label>{param.name}</label>
                <input
                    type="text"
                    value={this.state.paramValues[param.id]}
                    onChange={e => this.handleChange(param.id, e.target.value)}
                />
              </div>
          ))}
          <button onClick={() => console.log(this.getModel())}>
            Save Model
          </button>
        </div>
    );
  }
}

export default ParamEditor;
