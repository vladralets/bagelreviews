import ThemeSwitcher from "./ThemeSwitcher"

const Header = () => {
  return (
    <header className="flex justify-between py-4 px-9 border-b-[0.5px] border-bagel bg-dark">
      <img 
        src="https://bagellounge.cz/wp-content/uploads/2022/04/Слой_x0020_1.svg" 
        alt="bagel logo"
        className="w-24"
        />
      <ThemeSwitcher />
    </header>
  )
}

export default Header