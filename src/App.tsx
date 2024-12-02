import "./App.css";
import Header from "./components/Header";
import RestCard from "./components/RestCard";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white transition-all duration-300">
        <Header />

        <main className="w-5/6 mx-auto mt-6 grid grid-cols-2 gap-6">
          <RestCard rest="FL"/>
          <RestCard rest="ML"/>
          <RestCard rest="KV"/>
          <RestCard rest="CH"/>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
