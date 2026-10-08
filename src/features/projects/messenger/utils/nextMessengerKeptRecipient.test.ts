import { describe, expect, it } from "vitest";

import { messengerKeptRecipientKey } from "@/features/projects/messenger/utils/messengerChatKey";
import {
  NOW,
  memoryChatStore,
} from "@/features/projects/messenger/utils/messengerChatStore.fixtures";
import { nextMessengerKeptRecipient } from "@/features/projects/messenger/utils/nextMessengerKeptRecipient";
import {
  readMessengerKeptRecipient,
  writeMessengerKeptRecipient,
} from "@/features/projects/messenger/utils/persistMessengerKeptRecipient";

const botA = { kind: "assistant", membershipId: "a" } as const;
const two = ["a", "b"];

describe("nextMessengerKeptRecipient (COMPOSER-LOCK persist)", () => {
  it("checked keep persists r; unchecked one-shot goes back to nothing kept", () => {
    expect(
      nextMessengerKeptRecipient(null, {
        type: "confirm",
        recipient: botA,
        keepSending: true,
      }).recipient,
    ).toEqual(botA);
    expect(
      nextMessengerKeptRecipient(null, {
        type: "confirm",
        recipient: botA,
        keepSending: false,
      }).recipient,
    ).toBeNull();
  });

  it("explicit @ sends once and leaves kept r unchanged; chip uncheck clears", () => {
    expect(
      nextMessengerKeptRecipient(botA, { type: "explicitMention" }).recipient,
    ).toEqual(botA);
    expect(
      nextMessengerKeptRecipient(botA, { type: "uncheckChip" }).recipient,
    ).toBeNull();
  });

  it("kept assistant leaves → nothing kept + gone ids for the notice", () => {
    const next = nextMessengerKeptRecipient(botA, {
      type: "assistantsChanged",
      assistantMembershipIds: ["b", "c"],
    });
    expect(next).toEqual({ recipient: null, goneMembershipIds: ["a"] });
    expect(
      nextMessengerKeptRecipient(botA, {
        type: "assistantsChanged",
        assistantMembershipIds: two,
      }).recipient,
    ).toEqual(botA);
  });

  it("SINGLE (one assistant) keeps nothing", () => {
    expect(
      nextMessengerKeptRecipient(botA, {
        type: "assistantsChanged",
        assistantMembershipIds: ["a"],
      }).recipient,
    ).toBeNull();
  });

  it("persists per project chat per member; clearing writes EVERYONE, never deletes", async () => {
    const { store, kept } = memoryChatStore();
    const scope = { store, projectId: "p1", memberKey: "mem-1" };
    await writeMessengerKeptRecipient({ ...scope, recipient: botA, now: NOW });
    expect(await readMessengerKeptRecipient(scope)).toEqual(botA);
    expect(
      await readMessengerKeptRecipient({ ...scope, memberKey: "mem-2" }),
    ).toBeNull();
    await writeMessengerKeptRecipient({ ...scope, recipient: null, now: NOW });
    expect(kept.get(messengerKeptRecipientKey(scope))?.recipient).toBeNull();
  });
});
