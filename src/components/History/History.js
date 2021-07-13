import {Component} from 'react';
import Board from '../Board/Board';

class History extends Component{

    render() {
        const histotyList = this.props.history.slice().map((item, index) => {
            return <Board key={'board-'+index} history={new Array(item)}/>;
        });

        return (
            <div className="game-history">
                {histotyList}
            </div>
        );
    }
}

export default History;
