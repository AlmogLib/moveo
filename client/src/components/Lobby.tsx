import { FunctionComponent } from "react";
import "../css/lobby.css";
import { Link } from "react-router-dom";

interface LobbyProps { }

const Lobby: FunctionComponent<LobbyProps> = () => {
    const codeBlocks = [
        'Async-Await',
        'Promise',
        'Array Manipulation',
        'Event Handling',
    ];

    return (
        <div className="container">
            <h3>Choose code block</h3>
            <ul className="code-list">
                {codeBlocks.map((block, index) => (
                    <Link key={index} to={`/codeBlock/${block}`} className="code-link">
                        <li className="code-item">
                            {block}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Lobby;
