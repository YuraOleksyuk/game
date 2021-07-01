import {Component} from 'react';
import Board from '../Board/Board';

class History extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        const histotyList = [];

        this.props.history.reverse().forEach((item) => {
            histotyList.push(<Board history={new Array(item)}/>)
        })

        return (
            <div className="game-history">
                {histotyList}
            </div>
        );
    }
}

export default History;
