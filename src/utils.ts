import { BigInt } from "@graphprotocol/graph-ts";
import { Attestation, Entry, List, User } from "../generated/schema";

export function loadUser(id: string): User {
  let entity = User.load(id);
  if (entity == null) {
    entity = new User(id);
    entity.save();
  }
  return entity;
}

export function loadEntry(id: string): Entry {
  let entity = Entry.load(id);
  if (entity == null) {
    entity = new Entry(id);
    entity.user = new User("0").id;
    entity.list = new List("0").id;
    entity.save();
  }
  return entity;
}

export function loadList(id: string): List {
  let entity = List.load(id);
  if (entity == null) {
    entity = new List(id);
    entity.save();
  }
  return entity;
}

export function loadAttestation(id: string): Attestation {
  let entity = Attestation.load(id);
  if (entity == null) {
    entity = new Attestation(id);
    entity.scope = "ENTRY";
    entity.user = "0x00000000000000000000000000000000";
    entity.subject = "";
    entity.descriptor = "";
    entity.stake = BigInt.fromI64(0);
    entity.isCounterStake = false;
    entity.save();
  }
  return entity;
}
