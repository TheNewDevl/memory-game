import style from './Title.module.scss'

interface TitleProps {
  text: string
}

export const Title = ({text}: TitleProps) => {
  return (
    <h1 className={style.Title}>
      {text}
    </h1>
  );
};

/** Created by carlos on 28/12/2022 */