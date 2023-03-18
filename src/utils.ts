import { BigInt } from "@graphprotocol/graph-ts";
import { Poll, Option, Vote, User } from "../generated/schema";

export function loadUser(id: string): User {
  let entity = User.load(id);
  if (entity == null) {
    entity = new User(id);
    entity.save();
  }
  return entity;
}

export function loadVote(id: string): Vote {
  let vote = Vote.load(id);
  if (vote == null) {
    vote = new Vote(id);
    vote.user = new User("0").id;
    vote.option = new Option("0").id;
    vote.save();
  }
  return vote;
}

export function loadOption(id: string): Option {
  let option = Option.load(id);
  if (option == null) {
    option = new Option(id);
    option.poll = new Poll("0").id;
    option.numVotes = BigInt.fromI64(0);
    option.save();
  }
  return option;
}

export function loadPoll(id: string): Poll {
  let poll = Poll.load(id);
  if (poll == null) {
    poll = new Poll(id);
    poll.save();
  }
  return poll;
}


// export function loadAttestation(id: string): Attestation {
//   let entity = Attestation.load(id);
//   if (entity == null) {
//     entity = new Attestation(id);
//     entity.scope = "ENTRY";
//     entity.user = "0x00000000000000000000000000000000";
//     entity.subject = "";
//     entity.descriptor = "";
//     entity.stake = BigInt.fromI64(0);
//     entity.isCounterStake = false;
//     entity.save();
//   }
//   return entity;
// }
