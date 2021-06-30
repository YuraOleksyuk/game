import {Component} from 'react';
import Square from '../Square/Square';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNext: true,
            history: [{
                squares: new Array(9).fill(null),
            }]
        }
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.history[this.state.history.length-1].squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[this.state.history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.isNext ? 'X' : '0';

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            isNext: !this.state.isNext
        });
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
                return squares[a];
            }
        }
        return null;
    }

    handleGoBack() {
        let history = this.state.history.slice();

        if (history.length <= 1) {
            return;
        }

        history.splice(this.state.history.length - 1, 1);

        this.setState({
            isNext: !this.state.isNext,
            history: history
        });
    }

    render() {
        const winner = this.calculateWinner(this.state.history[this.state.history.length - 1].squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.isNext ? 'X' : 'O');
        }

        const squares = [];

        for (let i = 0; i < 9; i++) {
            if (i % 3 === 0) {
                squares.push(<div className="board-row"></div>);
            }
            squares.push(this.renderSquare(i));
        }

        return(
            <div>
                <button className="go-back" onClick={() => this.handleGoBack()}>Go back</button>
                <div className="status">
                    {status}
                </div>
                {squares}
            </div>
        );
    }
}

export default Board;
