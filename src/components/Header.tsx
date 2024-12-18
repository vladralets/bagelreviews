import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center py-4 px-9 border-b-[0.5px] border-bagel bg-dark">
      <img
        src="https://bagellounge.cz/wp-content/uploads/2022/04/Слой_x0020_1.svg"
        alt="bagel logo"
        className="w-24"
      />
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
