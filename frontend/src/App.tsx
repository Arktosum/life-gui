import "./App.css";

function App() {
  return (
    <>
      <div className="h-[100dvh] bg-black flex flex-col">
        <div className="top-nav border-2 bg-gray-600 h-[10%]"></div>
        <div className="content border-2 border-blue-600 h-[10%] flex-1"></div>
        <div className="bottom-nav border-2 border-green-600 h-[10%]"></div>
      </div>
    </>
  );
}

export default App;
