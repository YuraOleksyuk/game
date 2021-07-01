import './App.css';
import Board from './components/Board/Board';
import History from './components/History/History';
import {Component} from 'react';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: new Array(9).fill(null),
            }],
            isNext: true,
        }
    }

    updateHistory(squares) {
        this.setState({
            history: this.state.history.concat([{
                squares: squares
            }]),
        });
    }

    updateIsNext() {
        this.setState((state) => ({
            isNext: !state.isNext
        }));
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
        return (
            <div className="main-container">
                <button className="go-back" onClick={() => this.handleGoBack()}>Go back</button>
                <div className="game">
                    <div className="game-board">
                        <Board
                            isNext={this.state.isNext}
                            history={this.state.history}
                            updateHistory={this.updateHistory.bind(this)}
                            updateIsNext={this.updateIsNext.bind(this)}
                        />
                    </div>
                </div>
                <div className="game-info">
                    <h2 className="game-info__title">History:</h2>
                    <History history={this.state.history}/>
                </div>
            </div>
        );
    }
}

export default App;
