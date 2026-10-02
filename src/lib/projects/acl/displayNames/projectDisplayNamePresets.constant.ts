/** Curated Latin-script international given names for agent project nicknames (v1). */
export const PROJECT_DISPLAY_NAME_RESERVED = [
  "owner",
  "broadcast",
  "system",
  "all",
  "admin",
  "root",
  "null",
  "undefined",
] as const;

const RAW_PRESETS = [
  "Ada","Aiko","Akira","Alex","Amara","Amir","Anika","Aria","Arjun","Asha",
  "Beatrice","Ben","Buni","Caleb","Camila","Chiara","Clara","Conti","Dahlia","Diego",
  "Elena","Elio","Emma","Enzo","Eva","Farah","Felix","Freya","Gabriel","Greta",
  "Hana","Haruto","Hugo","Ines","Iris","Ivan","Jade","Jamal","Jonas","Julia",
  "Kai","Karim","Kenji","Kira","Lara","Leo","Lina","Luca","Luna","Maja",
  "Marco","Maya","Mila","Mina","Nadia","Niko","Nina","Noa","Nora","Omar",
  "Oscar","Pia","Priya","Ravi","Remy","Rita","Rosa","Sami","Sara","Sasha",
  "Scripti","Sofia","Soren","Tara","Theo","Tomas","Vera","Viktor","Willow","Yuki",
  "Zara","Zuri","Amina","Andre","Ansel","Astrid","Bruno","Celia","Dario","Elsa",
  "Emil","Fiona","Gia","Hans","Ida","Imani","Jasper","Josef","Kira","Leila",
  "Liora","Mateo","Nia","Otto","Paolo","Quinn","Rhea","Silas","Tess","Uma",
  "Vince","Willa","Xander","Yara","Zoe","Alina","Bo","Cora","Dina","Ezra",
  "Finn","Gwen","Hiro","Isla","Juno","Klaus","Lola","Mira","Nils","Olga",
  "Petra","Rafa","Sven","Talia","Uri","Vera","Wren","Yuna","Zeke","Anya",
  "Boris","Cleo","Dante","Elif","Faye","Gino","Hela","Igor","Jana","Kian",
  "Luz","Momo","Neo","Oona","Pavel","Rina","Sol","Taro","Ula","Veda",
  "Wes","Yael","Zane","Asha","Bela","Cord","Dana","Eden","Fran","Gus",
  "Hana","Ivo","Jo","Kaia","Liv","Max","Nell","Ora","Pip","Rumi",
  "Sky","Ted","Una","Val","Wyn","Yui","Zia","Alec","Bea","Cyrus",
  "Dove","Eli","Fern","Gray","Hope","Ivy","Jude","Kit","Lane","Moss",
  "Nyx","Onyx","Pax","Reed","Sage","True","Vale","West","York","Zen",
] as const;

const RESERVED_SET = new Set(
  PROJECT_DISPLAY_NAME_RESERVED.map((n) => n.toLocaleLowerCase("en-US")),
);

/** Deduped, reserved-filtered preset list (stable order). */
export const PROJECT_DISPLAY_NAME_PRESETS: readonly string[] = Array.from(
  new Set(
    RAW_PRESETS.map((n) => n.trim()).filter(
      (n) =>
        n.length >= 2 &&
        n.length <= 32 &&
        !RESERVED_SET.has(n.toLocaleLowerCase("en-US")),
    ),
  ),
);
