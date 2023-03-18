import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import { AddedToList, CreatedClaim } from "../generated/ListWrapper/ListWrapper"

export function createAddedToListEvent(
  user: string,
  podcastId: string,
  listId: string
): AddedToList {
  let addedToListEvent = changetype<AddedToList>(newMockEvent())

  addedToListEvent.parameters = new Array()

  addedToListEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromString(user))
  )
  addedToListEvent.parameters.push(
    new ethereum.EventParam("podcastId", ethereum.Value.fromString(podcastId))
  )
  addedToListEvent.parameters.push(
    new ethereum.EventParam("listId", ethereum.Value.fromString(listId))
  )

  return addedToListEvent
}

export function createCreatedClaimEvent(
  user: string,
  subject: string,
  descriptor: string
): CreatedClaim {
  let createdClaimEvent = changetype<CreatedClaim>(newMockEvent())

  createdClaimEvent.parameters = new Array()

  createdClaimEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromString(user))
  )
  createdClaimEvent.parameters.push(
    new ethereum.EventParam("subject", ethereum.Value.fromString(subject))
  )
  createdClaimEvent.parameters.push(
    new ethereum.EventParam("descriptor", ethereum.Value.fromString(descriptor))
  )

  return createdClaimEvent
}
