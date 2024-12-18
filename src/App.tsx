import "./App.css";
import Header from "./components/Header";
import RestCard from "./components/RestCard";
import { Restaurants } from "./constants/restaurants";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./components/Login";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  // Проверяем localStorage при загрузке страницы
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      setUsername(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem("username", username);
    setUsername(username);
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-white transition-all duration-300">
        {isAuthenticated ? (
          <>
            <Header onLogout={handleLogout} />
            <h1 className="text-3xl text-center font-semibold mt-6">
              Welcome, {username}!
            </h1>
            <main className="w-5/6 mx-auto mt-6 pb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {Restaurants.map((rest) => (
                <RestCard key={rest.id} rest={rest} />
              ))}
            </main>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
