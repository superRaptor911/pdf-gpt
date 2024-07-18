import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Welcome</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/persona"
                className="block w-full px-4 py-2 text-lg text-center text-white bg-indigo-500 rounded hover:bg-indigo-600 transition"
              >
                Go to Persona
              </Link>
            </li>
            <li>
              <Link
                to="/insights"
                className="block w-full px-4 py-2 text-lg text-center text-white bg-indigo-500 rounded hover:bg-indigo-600 transition"
              >
                Go to Insights
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default App;
