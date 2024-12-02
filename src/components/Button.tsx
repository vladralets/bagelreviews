
interface IButtonProps {
    onClick: () => void;
    text: string;
}

const Button = ({onClick, text}: IButtonProps) => {
  return (
    <button
        className="bg-bagel text-white py-2 px-4 rounded-md font-bold text-xl hover:bg-bagel-dark"
        onClick={onClick}
    >
        {text}
    </button>
  )
}

export default Button