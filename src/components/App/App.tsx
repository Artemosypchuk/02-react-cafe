import { useState } from "react";
import CafeInfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";
import type { Votes, VoteType } from "../../types/vote";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const hendleVote = (type: VoteType): void => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };
  const resetVotes = (): void => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate =
    totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;

  const canReset = totalVotes > 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={hendleVote}
        onReset={resetVotes}
        canReset={canReset}
      />
      <VoteStats
        votes={votes}
        totalVotes={totalVotes}
        positiveRate={positiveRate}
      />
    </div>
  );
}
