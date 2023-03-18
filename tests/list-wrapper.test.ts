import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import {} from "@graphprotocol/graph-ts"
import { AddedToList } from "../generated/schema"
import { AddedToList as AddedToListEvent } from "../generated/ListWrapper/ListWrapper"
import { handleAddedToList } from "../src/list-wrapper"
import { createAddedToListEvent } from "./list-wrapper-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = "Example string value"
    let podcastId = "Example string value"
    let listId = "Example string value"
    let newAddedToListEvent = createAddedToListEvent(user, podcastId, listId)
    handleAddedToList(newAddedToListEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddedToList created and stored", () => {
    assert.entityCount("AddedToList", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddedToList",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "Example string value"
    )
    assert.fieldEquals(
      "AddedToList",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "podcastId",
      "Example string value"
    )
    assert.fieldEquals(
      "AddedToList",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "listId",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
