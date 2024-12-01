import "./App.css";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white transition-all duration-300">
        <Header />

        <main className="p-4">
          <p>Это пример страницы с переключателем темы.</p>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
