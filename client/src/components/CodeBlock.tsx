import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import ControlledEditor from "@monaco-editor/react";
import 'highlight.js/styles/monokai-sublime.css';
import "../css/codeBlock.css";
import codeBlocks from "./codeBlocksData"


interface CodeBlockProps { }

const socket = io("http://localhost:3001");

const CodeBlock: React.FunctionComponent<CodeBlockProps> = () => {
    const { blockName } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [mentorStatus, setMentorStatus] = useState(false);

    const handleEnterLobby = () => {
        socket.emit("enterLobby");
        navigate("/");
    };


    useEffect(() => {
        // מציאת הקוד בלוק המתאים לפי שם הבלוק
        const currentCodeBlock = codeBlocks.find((block) => block.name === blockName);
        // מגדיר את הטקסט הרלוונטי לאותו קוד בלוק
        if (currentCodeBlock && !text) {
            setText(currentCodeBlock.code);
        }
        const handleSettings = (userId: any, userRole: any) => {
            // איפוס המשתמש כל פעם שהוא נכנס לדף
            setMentorStatus(false);

            // בדיקה אם המשתמש הוא Mentor
            if (userRole === "mentor") {
                setMentorStatus(true);
            }
        };

        // שליחת בקשה לבדיקת המשתמש בכניסה לדף
        socket.emit("checkExistence");

        // הגדרת האזנה להגדרות מהשרת
        socket.once("settings", handleSettings);

        // Cleanup
        return () => {
            socket.off("settings", handleSettings);
        };
    }, []);

    const handleCodeChange = (value: string | undefined) => {
        // שולח את הקוד המתעדכן לשרת
        socket.emit("updateCode", { blockName, code: value });
    };

    socket.on("codeUpdated", ({ blockName, code }) => {
        // עדכון הקוד של הבלוק הנוכחי בזמן אמת
        if (blockName === blockName) {
            setText(code);
        }
    });

    const handleCheck = () => {
        const currentCodeBlock = codeBlocks.find((block) => block.name === blockName);

        if (currentCodeBlock) {
            const formattedText = text.trim().replace(/\s+/g, ''); // מסיר רווחים
            const formattedSolution = currentCodeBlock.solution.trim().replace(/\s+/g, ''); // מסיר רווחים

            const isSolutionCorrect = formattedText === formattedSolution;

            if (isSolutionCorrect) {
                alert("Correct! 😃");
            } else {
                alert("Incorrect! 😢");
            }
        }
    };

    return (
        <div className="container">
            <div className="block">
                <h3 className="title">{blockName}</h3>
                <div className="code">
                    <div className="bar">
                        <p>Example Code</p>
                        {mentorStatus && <p>Read Only</p>}
                    </div>

                    <pre>
                        <code>
                            {!mentorStatus && (
                                <>
                                    <ControlledEditor
                                        language="javascript"
                                        value={text}
                                        onChange={handleCodeChange}
                                        theme="vs-dark"
                                        width="100%"
                                        height="500px"
                                    />
                                    <div className="bar">
                                        <button onClick={handleEnterLobby}>Back To Lobby</button>
                                        <button onClick={handleCheck}>Check</button>
                                    </div>
                                </>
                            )}
                            {mentorStatus && (
                                <>
                                    <ControlledEditor
                                        language="javascript"
                                        value={text}
                                        theme="vs-dark"
                                        width="100%"
                                        height="500px"
                                        options={{ minimap: { enabled: false }, automaticLayout: true, readOnly: true }}
                                    />
                                    <div className="bar">
                                        <button onClick={handleEnterLobby}>Back To Lobby</button>
                                    </div>
                                </>
                            )}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CodeBlock;
