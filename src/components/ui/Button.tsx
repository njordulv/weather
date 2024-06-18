interface ButtonProps {
  title: string
  onClick?: () => void
  type?: 'submit' | 'button'
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ title, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6 py-4 rounded-full 
        inline-flex items-center gap-2 justify-center
        text-slate-500 bg-white text-xl leading-5
        transition-all
        shadow-lg 
        hover:shadow-inner
        hover:text-slate-600 hover:bg-slate-50
    `}
    >
      <span>{title}</span>
    </button>
  )
}

export default Button
