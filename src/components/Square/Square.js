import React from 'react';

class Square extends React.Component {
    render() {
        return(
            <button
                className="square"
                key={this.props.value}
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}

export default Square;
