import {
  VotedOnPoll as VotedOnPollEvent,
  Staked as StakedEvent,
} from "../generated/PollAttest/PollAttest";
import { loadUser, loadVote, loadOption, loadPoll } from "./utils";
import { BigInt } from "@graphprotocol/graph-ts";



export function handleVotedOnPoll(event: VotedOnPollEvent): void {
  let user = loadUser(event.params.user.toHexString());
  let poll = loadPoll(event.params.poll.toString());
  let option = loadOption(event.params.option.toString());
  let vote = loadVote(event.transaction.hash.toHex() + "-" + event.logIndex.toString());

  vote.user = user.id;
  vote.option = option.id;
  vote.save();

  option.poll = poll.id;
  option.numVotes = option.numVotes.plus(BigInt.fromI64(1));
  option.save();
}