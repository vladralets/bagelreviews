import "./App.css";
import Header from "./components/Header";
import RestCard from "./components/RestCard";
import { Restaurants } from "./constants/restaurants";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white transition-all duration-300">
        <Header />

        <main className="w-5/6 mx-auto mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {
            Restaurants.map((rest) => (
              <RestCard key={rest.id} rest={rest} />
            ))
          }
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
