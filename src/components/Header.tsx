import ThemeSwitcher from "./ThemeSwitcher"

const Header = () => {
  return (
    <header className="flex justify-end py-4 px-5 border-b-[0.5px] border-border-color">
      <ThemeSwitcher />
    </header>
  )
}

export default Header