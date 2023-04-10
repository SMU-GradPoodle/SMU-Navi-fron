import React from 'react';
import "./Board_list.css";
function Board_list(props) {
    return (
        <div className="board_list_container">
            <span>{props.title}</span>
            <span>{props.posttime}</span>
        </div>
    );
}

export default Board_list;
