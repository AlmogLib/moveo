import { FunctionComponent, useEffect } from "react";
import "../css/lobby.css";
import { Link } from "react-router-dom";
import io from "socket.io-client";

interface LobbyProps { }

const socket = io("http://localhost:3001");

const Lobby: FunctionComponent<LobbyProps> = () => {
    const codeBlocks = [
        'Async-Await',
        'Promise',
        'Array Manipulation',
        'Event Handling',
    ];

    const resetUser = () => {
        socket.emit("resetUser");
    };

    useEffect(() => {
        // הרשמה לפונקציה לאירוע "beforeunload" של החלון
        window.addEventListener("beforeunload", resetUser);

        // Cleanup
        return () => {
            // הסרת הרשמה לפונקציה בעת יציאה מהעמוד
            window.removeEventListener("beforeunload", resetUser);
        };
    }, []);

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
