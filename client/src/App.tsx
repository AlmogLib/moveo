import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from "./components/Lobby";
import CodeBlock from "./components/CodeBlock";


const App = () => {
  return (
    <div className="container">
      <h1>JS Practice</h1>
      <ul className="code-list">
        <Router>
          <Routes>
            <Route path='/' element={<Lobby />} />
            <Route path="/codeBlock/:blockName" Component={CodeBlock} />
          </Routes>
        </Router>

      </ul>

    </div>
  );
};

export default App;
