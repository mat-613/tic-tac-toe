import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {connect} from 'react-redux';
import './index.css';
import sqaures from './reducer'


function Square ({value,onclick}){
        return (
            <button className="square" onClick={onclick}>
                {value}
            </button>
        );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.value[i]} onclick={()=>{this.props.Click(i)}}/>;
    }
    render() {
        return (
            <div>
                <div className="status">{this.props.status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                {this.props.a && <button onClick={this.props.onclickFin}>{'Ricomincia'}</button>}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(){
        super();
        this.state={
            xIsNext :true,
            status:'Next player is X',
            a: ''};
    }
    updateGame(i){
        let status="";
        let newArr=[];
        let a=calculateWinner(this.props.squares);
        if(a){
            status = "Winner is "+a;
        }else{
            status= "Next player is "+(this.state.xIsNext?'O':'X');
            console.log('updategame')
            newArr = this.props.squares.slice();
            newArr[i] = this.state.xIsNext ? "x" : "o";
            this.props.updateGame(newArr);
            console.log(this.props.squares);
        }
        console.log(a);
        this.setState({a:a,status: status,xIsNext: (!this.state.xIsNext)});
    }
    onclickFin(){
        this.setState({
            xIsNext :true,
            status:'Next player is X',
            a: ''});
        this.props.clearGame();
    }

    render() {
        console.log(this.props.squares)
        return (
                <div>
                <div className="game">
                <div className="game-board">
                    <Board onclickFin={()=>{this.onclickFin()}} a={this.state.a} status={this.state.status}  Click={this.updateGame.bind(this)} value={this.props.squares}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol></ol>
                </div>
            </div>
            </div>
        );
    }
}
let store = createStore(sqaures, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
function mapStateToProps(state) {
    return({
        squares: state.reducer
    })
}
function mapDispatchToProps(dispatch) {
    return({
        updateGame :squares => {
            dispatch({type:'ADD_SQUARE', value: squares})
        },
        clearGame: ()=>{
            dispatch({type: 'CLEAR'})
        }
    })

}
let MyNewConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Game)

// ========================================

ReactDOM.render(
    <Provider store={store}><MyNewConnectedComponent /></Provider>,
    document.getElementById('root')
);

function calculateWinner(squares) {
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






