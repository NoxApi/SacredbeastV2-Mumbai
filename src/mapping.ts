import { BigInt } from "@graphprotocol/graph-ts"
import {
  SCBV2,
  Approval,
  ApprovalForAll,
  Evole,
  Feed,
  Mint,
  NewLockChoice,
  OwnershipTransferred,
  Reclaim,
  Recovered,
  RewardPaid,
  Transfer,
  UpdateLockChoice
} from "../generated/SCBV2/SCBV2"
import { user,food,token } from "../generated/schema"

export function handleFeed(event: Feed): void {
  let ID = token.load(event.params.tokenId.toString())
  let foods = new food(ID!.foodindex.toString())
  foods.amount = event.params.amount
  foods.Token = event.params.tokenId.toString()
  foods.unlockweek = event.params.unlockWeek
  foods.save()
  ID!.Exp = event.params.newEXP
  ID!.amount+=foods.amount
}
export function handleReclaim(event: Reclaim): void {
  let ID = token.load(event.params.tokenId.toString())
  ID!.LastestReclaim = event.params.week
  ID!.save()
}
export function handleMint(event: Mint): void {
  let entity = user.load(event.params.User)
  if (entity== null) {
    entity = new user(event.params.User)
  }
 let ID = new token(event.params.tokenID.toString())
 ID.evolform = new BigInt(0)
 ID.race = new BigInt(0)
 ID.amount =new BigInt(0)
 ID.foodindex = 0
 ID.Exp = new BigInt(0)
 ID.LastestReclaim =new BigInt(0)
 ID.User=event.params.User
 ID.save()
 entity.save()
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleEvole(event: Evole): void {
  let ID = token.load(event.params.tokenId.toString())
  ID!.evolform = event.params.evolForm
}

export function handleNewLockChoice(event: NewLockChoice): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}


export function handleRecovered(event: Recovered): void {}

export function handleRewardPaid(event: RewardPaid): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUpdateLockChoice(event: UpdateLockChoice): void {}
