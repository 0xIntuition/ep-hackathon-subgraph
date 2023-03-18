import {
  AddedToList as AddedToListEvent,
  Staked as StakedEvent,
} from "../generated/ListWrapper/ListWrapper";
import { RealityTunnel } from "../generated/schema";
import { loadAttestation, loadEntry, loadList, loadUser } from "./utils";

export function handleAddedToList(event: AddedToListEvent): void {
  let user = loadUser(event.params.user.toHexString());
  let list = loadList(event.params.listId);
  let entry = loadEntry(`${user.id}.${list.id}.${event.params.entryId}`);

  entry.user = user.id;
  entry.list = list.id;

  entry.save();
}

export function handleStaked(event: StakedEvent): void {
  // Stake on descriptor of list entry, optional context for reality tunnel

  //TODO: ENSURE THAT MSG.SENDER IS THE LIST WRAPPER CONTRACT
  let attestation = loadAttestation(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  attestation.subject = event.params.subject;
  if (event.params.context != "") {
    const realityTunnel = new RealityTunnel(event.params.context);
    attestation.scope = "LIST";
    attestation.realityTunnel = realityTunnel.id;
  } else {
    attestation.scope = "ENTRY";
    attestation.entry = event.params.subject;
  }

  let user = loadUser(event.params.user.toHexString());
  attestation.user = user.id;
  attestation.descriptor = event.params.descriptor;
  attestation.stake = event.params.amount;
  attestation.isCounterStake = event.params.counter;

  attestation.save();
}
