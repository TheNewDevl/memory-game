import style from "../UI/Components/Card/Card.module.scss";

/** Add a 'selected' class to the selected cards first child. This class is supposed to rotate the card */
export  const flipSelectedCards = (selectedCards : HTMLButtonElement[] ) => {
  if(selectedCards?.length > 0){
    selectedCards.map(card => {
      const div = card.querySelector('div')
      if(div && !div?.classList.contains(`${style.selected}`)) div.classList.add(`${style?.selected ?? 'selected'}`)
    })
  }
}

/** Remove the 'selected' class from the selected cards first child. This class is supposed to rotate back the card */
export const unFlipSelectedCards = (selectedCards: HTMLButtonElement[], ) => {
  if(selectedCards?.length > 0){
    selectedCards.map(card => card.firstElementChild?.classList.remove(`${style?.selected ?? 'selected'}`))
  }
}

/** Remove the selected cards from the DOM */
export const hideWinningCards = (removedCards: HTMLButtonElement[]) => {
  if(removedCards?.length > 0){
    removedCards.map(card => card.classList.add(`${style?.removed ?? 'removed'}`))
  }
}

/** Created by carlos on 29/12/2022 */
