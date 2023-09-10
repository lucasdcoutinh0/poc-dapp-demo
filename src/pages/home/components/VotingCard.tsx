import { useState } from "react"
import { useBallotInfo, vote } from "../hooks/useSimpleVoting"
import css from "./card.module.css"

export const VostingCard = () => {
  const ballot = useBallotInfo()
  const [selectedOption, setSelectedOption] = useState<number>()

  return (
    <div className={css.card}>
      <div className={css.cardHeader}>Voting</div>
      <div className={css.cardBody}>
        <div className={css.cardBodyTitle}>{ballot?.question?.slice(1, -1)}</div>
        {ballot.status === false ? (
          <div>Voting is not available</div>
        ) : (
          <div className={css.cardVote}>
            {ballot.options?.map((option, index) => (
              <div key={index} className={css.cardOption}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="voteOption"
                  value={index}
                  className={css.radio}
                  onChange={() => setSelectedOption(index)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
            <button className={css.button} onClick={() => vote(selectedOption!)}>
              Vote
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
