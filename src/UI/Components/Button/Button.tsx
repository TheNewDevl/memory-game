import style from './Button.module.scss'

interface ButtonProps {
  onClick: () => void
  text: string
  disabled?: boolean
}

export const Button = ({text, onClick, disabled = false}: ButtonProps) => {
  return (
    <button disabled={disabled} onClick={onClick} className={style.Button}>
      {text}
    </button>
  );
};

/** Created by carlos on 28/12/2022 */