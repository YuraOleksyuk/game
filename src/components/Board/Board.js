import {Component} from 'react';
import Square from '../Square/Square';

class Board extends Component {

    constructor(props) {
        super(props);
    }

    renderSquare(i) {
        let value = this.props.history[this.props.history.length-1].squares[i];

        return (
            <Square
                value={value}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        const history = this.props.history;
        const current = history[this.props.history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.props.isNext ? 'X' : '0';

        this.props.updateHistory(squares)

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
        });

        this.props.updateIsNext();
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {winner: squares[a], line: lines[i]};
            }
        }
        return null;
    }

    render() {
        const currentBoard = this.props.history[this.props.history.length - 1].squares;
        const winner = this.calculateWinner(currentBoard);

        let status;
        if (winner) {
            status = 'Winner: ' + winner.winner;
        } else if (!winner && !currentBoard.includes(null)) {
            status = 'Winner: X-Y';
        } else {
            status = 'Next player: ' + (this.props.isNext ? 'X' : 'O');
        }

        const squares = [];

        for (let i = 0; i < 9; i++) {
            if (i % 3 === 0) {
                squares.push(<div className="board-row"></div>);
            }
            squares.push(this.renderSquare(i));
        }

        return(
            <div className="item">
                <div className="status">
                    {status}
                </div>
                {squares}
            </div>
        );
    }
}

export default Board;
