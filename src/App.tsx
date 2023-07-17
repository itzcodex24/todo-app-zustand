import Box from "./components/Box";

function App() {
  const boxTitles = ["TODO", "DOING", "DONE"];

  return (
    <div className="w-full min-h-screen flex justify-center items-center gap-x-4 bg-violet-300">
      {boxTitles.map((t) => (
        <Box title={t} />
      ))}
    </div>
  );
}

export default App;
