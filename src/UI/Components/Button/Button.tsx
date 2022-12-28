import style from './Button.module.scss'

interface ButtonProps {
  onClick: () => void
  text: string
}

export const Button = ({text, onClick}: ButtonProps) => {
  return (
    <button onClick={onClick} className={style.Button}>
      {text}
    </button>
  );
};

/** Created by carlos on 28/12/2022 */