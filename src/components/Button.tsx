
interface IButtonProps {
    onClick: () => void;
    text: string;
    disabled?: boolean;
}

const Button = ({onClick, text, disabled}: IButtonProps) => {
  return (
    <button
        className="bg-bagel text-white py-2 px-4 rounded-md font-bold text-xl hover:bg-bagel-dark"
        onClick={onClick}
        disabled={disabled}
    >
        {text}
    </button>
  )
}

export default Button