// (\n *)("/.*?")
// => $1 { "text": $2 }

// Item
// => Items

// sublocation
// \{\n.*"eventName": (.*),\n.*"location": (.*)\n.*\}
// => $1: $2

// mainlocation
// \{\n.*"key": (.*),\n.*"name": (.*)\n.*\}
// => $1: $2

//zones
// \{\n.*"name": (.*)\n.*\}
// => $1

//eventitem (not active)
// "Items": ([^\]]*\]).*?\n.*"name": ([^,\n]*)(,)?
// => $2: $1$3

//eventItem
// \{\n.*"Items": ([^\]]*\]).*?\n.*"name": ([^,\n]*),?[^\}]*\}
// => $2: $1

// eventItem with no data
// \{\n.*"name": ([^,\n]*),?[^\}]*\}
// => $1: [\n          { "text": "" }\n       ]


var db = {
   "Zones": [
      "Earth",
      "Rhom",
      "Corsus",
      "Yaesha",
      "Reisum"
   ],
   // eventName: location
   "SubLocations": {
      "ArmorVault": "VaultOfTheHeralds",
      "BarbTerror": "NeedleLair",
      "BlinkFiend": "Widow'sPass",
      "BlinkThief": "ForgottenUndercroft",
      "BlizzardMage": "WutheringKeep",
      "Brabus": "CutthroatChannel",
      "BrainBug": "StrangePass",
      "CreepersPeeper": "Watcher'sHollow",
      "DoeShrine": "Widow'sVestry",
      "Fatty": "TheFetidGlade",
      "FlickeringHorror": "HallOfWhispers",
      "FrozenLords": "Judgment'sSpear",
      "Guardian": "TheGuardian'sSanctum",
      "HoundMaster": "TheBurrows",
      "HuntersHideout": "HiddenGrotto",
      "ImmolatorAndZephyr": "WitheringVillage",
      "IceSkimmer": "TheFrieranSea",
      "KinCaller": "TheHallOfJudgement",
      "LastWill": "Sorrow'sField",
      "LizAndLiz": "TheWarren",
      "MadMerchant": "Junktown",
      "RatRider": "TheCrimsonHold",
      "RootBrute": "SunkenPassage",
      "RootCultist": "MarrowPass",
      "RootDragon": "TheAshYard",
      "RootEnt": "TheChokingHollow",
      "RootMother": "ChurchOfTheHarbinger",
      "RootShrine": "TheGallows",
      "RootTumbleweed": "TheTangledPass",
      "RootWraith": "TheHiddenSanctum",
      "Sentinel": "ShackledCanyon",
      "ShamanFlames": "GraveOfTheElders",
      "ShieldWarden": "Exile'sTrench",
      "SlimeHulk": "TheDrownedTrench",
      "Splitter": "ResearchStationAlpha",
      "StormCaller": "Heretic'sNest",
      "StuckMerchant": "MerchantDungeon",
      "SwampGuardian": "TheGrotto",
      "SwarmMaster": "TheIronRift",
      "TheCleanRoom": "ThePurgeHall",
      "TheHarrow": "TheBunker",
      "TheJackal": "TheWildReach",
      "TheLostGantry": "ConcourseOfTheSun",
      "TheRisen": "Ahanae'sLament",
      "TotemFather": "TheTempestCourt",
      "Tyrant": "TheCapillary",
      "UndyingKing": "UndyingThrone",
      "UrikkiBlademasters": "ValenhaagMines",
      "Vyr": "TheArdentTemple",
      "WarningTotems": "Magir'sDirge",
      "WastelandGuardian": "LoomOfTheBlackSun",
      "Wisp": "CircletHatchery",
      "Wolf": "TheRavager'sHaunt",
      "WolfShrine": "TempleOfTheRavager"
   },
   // key: name
   "MainLocations": {
      "City Overworld Zone1": "Fairview",
      "City Overworld Zone2": "Westcourt",
      "Wasteland Overworld Zone1": "TheEasternWind",
      "Wasteland Overworld Zone2": "TheScouringWaste",
      "Swamp Overworld Zone1": "TheFetidGlade",
      "Swamp Overworld Zone2": "TheMistFen",
      "Jungle Overworld Zone1": "TheVerdantStrand",
      "Jungle Overworld Zone2": "TheScaldingGlade",
      "Rural Overworld 01": "Rural",
      "Rural Overworld 02": "Rural",
      "Snow Overworld Zone1": "DrolniirWoods",
      "Snow Overworld Zone2": "DeepfrostExpanse"
   },
   // eventName: altname (if no alt name then altname = eventName)
   "Events": {
      "AbandonedThrone": "AbandonedThrone",
      "AbrasiveAmulet": "AbrasiveAmulet",
      "AcesCoin": "AcesCoin",
      "Afterbirth": "ChillwindHovel",
      "AggressorsBane": "AggressorsBane",
      "AlchemistsJewel": "Alchemist'sJewel",
      "ArmorVault": "ArmorVault",
      "BackbreakerRing": "BackbreakerRing",
      "BandOfCastor": "BandOfCastor",
      "BandOfPollux": "BandOfPollux",
      "BandOfStrength": "BandOfStrength",
      "BarbTerror": "BarbedTerror",
      "BarnSiege": "BarnSiege",
      "BlinkFiend": "Onslaught",
      "BlinkThief": "BlinkThief",
      "BlizzardMage": "IkroTheIceConjurer",
      "BloodFont": "BloodFont",
      "Brabus": "Brabus",
      "BrainBug": "Mar'gosh",
      "BrutalMark": "BrutalMark",
      "BurdenOfTheReckless": "BurdenOfTheReckless",
      "BurdenOfTheGambler": "BurdenOfTheGambler",
      "BurdenOfTheDevoted": "BurdenOfTheDevoted",
      "BurdenOfTheFollower": "BurdenOfTheFollower",
      "BurdenOfTheWarlord": "BurdenOfTheWarlord",
      "ButchersFetish": "ButchersFetish",
      "CharcoalNecklace": "CharcoalNecklace",
      "CleansingJewel": "CleansingJewel",
      "CompulsionLoop": "CompulsionLoop",
      "CreepersPeeper": "CreepersPeeper",
      "Cryptolith": "Cryptolith",
      "DeceiversBand": "DeceiversBand",
      "DevouringLoop": "DevouringLoop",
      "DoeShrine": "DoeShrine",
      "DrifterMask": "DrifterMask",
      "Driftstone": "Driftstone",
      "EzlansBand": "EzlansBand",
      "Fatty": "TheUncleanOne",
      "FetidPool": "FetidPool",
      "FiveFingeredRing": "FiveFingeredRing",
      "Flautist": "Flautist",
      "FlickeringHorror": "DreamEater",
      "FoundersHideout": "FoundersHideout",
      "FrozenLords": "FrozenLords",
      "GalenicCharm": "GalenicCharm",
      "GraveyardElf": "GraveyardElf",
      "GravityStone": "GravityStone",
      "Guardian": "Guardian",
      "GunslingersCharm": "GunslingersCharm",
      "GunslignersRing": "Gunslinger'sRing",
      "HeartSeeker": "HeartSeeker",
      "Homestead": "Homestead",
      "HoundMaster": "HoundMaster",
      "HuntersBand": "HuntersBand",
      "HuntersHalo": "HuntersHalo",
      "HuntersHideout": "HuntersHideout",
      "IceSkimmer": "IceSkimmer",
      "ImmolatorAndZephyr": "ScaldAndSear",
      "IskalQueen": "IskalQueen",
      "JanitorsWatch": "JanitorsWatch",
      "KeepersRing": "KeepersRing",
      "KinCaller": "Warden",
      "KrallBaby": "KrallBaby",
      "LastWill": "SupplyRun",
      "LeechEmber": "LeechEmber",
      "LizAndLiz": "TaleOfTwoLiz's",
      "MadMerchant": "MadMerchant",
      "Monolith": "Monolith",
      "MothersRing": "MothersRing",
      "MudTooth": "MudTooth",
      "Nexus": "RootNexus",
      "OldManAndConstruct": "WudAndAncientConstruct",
      "PearlOfLuminescence": "PearlOfLuminescence",
      "Penitent": "Leto'sAmulet",
      "PillarOfStone": "PillarOfStone",
      "PolishedWhetstone": "PolishedWhetstone",
      "QueensTemple": "QueensTemple",
      "RadioactiveEmber": "RadioactiveEmber",
      "RatRider": "RargrAndBrudvaak",
      "RazorStone": "RazorStone",
      "RazorwireNecklace": "RazorwireNecklace",
      "ReggiesRing": "ReggiesRing",
      "RestrictionCord": "RestrictionCord",
      "RingOfElusion": "RingOfElusion",
      "RingOfEvasion": "RingOfEvasion",
      "RockOfAnguish": "RockOfAnguish",
      "RingOfShadows": "RingOfShadows",
      "RootBrute": "Gorefist",
      "RootCultist": "RootCultist",
      "RootDragon": "Singe",
      "RootMother": "RootMother",
      "RootTumbleweed": "TheMangler",
      "RootWraith": "Shroud",
      "RootEnt": "TheEnt",
      "RootShrine": "RootShrine",
      "Ruins": "Ruins",
      "SageStone": "SageStone",
      "Sentinel": "Raze",
      "SerpentsFang": "SerpentsFang",
      "Settlement": "Settlement",
      "ShamanFlames": "ShamanFlames",
      "ShieldWarden": "ObrykTheShieldWarden",
      "Sketterling": "Sketterling",
      "SlaveRevolt": "SlaveRevolt",
      "SlimeHulk": "Canker",
      "SnowRuins": "TheSilentSnow",
      "SoulLink": "SoulLink",
      "SpiritStone": "SpiritStone",
      "Splitter": "Riphide",
      "StalkersBrand": "StalkersBrand",
      "StockpileCirclet": "StockpileCirclet",
      "StoneOfBalance": "StoneOfBalance",
      "StormAmulet": "StormAmulet",
      "StormCaller": "Stormcaller",
      "StuckMerchant": "StuckMerchant",
      "SwampGuardian": "Ixillis",
      "SwarmMaster": "Scourge",
      "TalismanOfAnimosity": "TalismanOfAnimosity",
      "TalismanOfPerseverance": "TalismanOfPerseverance",
      "TerrorMargin": "TerrorMargin",
      "TheCleanRoom": "TheCleanRoom",
      "TheHarrow": "TheHarrow",
      "TheJackal": "ErforTheJackal",
      "TheLostGantry": "TheLostGantry",
      "TheRisen": "TheRisen",
      "TotemFather": "TotemFather",
      "Tyrant": "TheThrall",
      "UndyingKing": "UndyingKing",
      "UrikkiBlademasters": "TianTheAssassin",
      "VargylBones": "VargylBones",
      "VengeanceIdol": "VengeanceIdol",
      "Uncategorized": "Uncategorized",
      "VolatileGem": "VolatileGem",
      "Vyr": "ShadeAndShatter",
      "WailingWood": "WailingWood",
      "Ward13": "Ward13",
      "Ward17": "Ward17",
      "Ward17Root": "Ward17Root",
      "WardPrime": "WardPrime",
      "WarningTotems": "WarningTotems",
      "Wisp": "CircletHatchery",
      "WastelandGuardian": "Claviger",
      "Wolf": "TheRavager",
      "WolfShrine": "WolfShrine"
   },
   // eventName: items
   "EventItems": {
      "AbandonedThrone": [
         { "text": "/Items/Traits/Trait_Luminescent" }
      ],
      "AbrasiveAmulet": [
         {
            "notes": "Random drop on Corsus",
            "text": "/Items/Trinkets/Trinket_AbrasiveAmulet"
         }
      ],
      "AcesCoin": [
         { "text": "/Items/Weapons/Basic/HandGuns/Revolver/Weapon_Revolver" }
      ],
      "Afterbirth": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/ScavengersRing"
         },
         {
            "dlc": "Subject 2923",
            "notes": "Free Krall Baby then speak to mother at Chillwind Hovel",
            "text": "/Items/Trinkets/BlessedNecklace"
         }
      ],
      "AggressorsBane": [
         { "text": "/Items/Trinkets/AggressorsBane" }
      ],
      "AlchemistsJewel": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/Trinket_AlchemistsJewel"
         }
      ],
      "ArmorVault": [
         { "text": "/Items/Armor/Akari/Armor_Head_Akari" },
         { "text": "/Items/Armor/Akari/Armor_Body_Akari" },
         { "text": "/Items/Armor/Akari/Armor_Legs_Akari" }
      ],
      "BackbreakerRing": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on Rural Earth",
            "text": "/Items/Trinkets/BackbreakerRing"
         }
      ],
      "BandOfCastor": [
         { "text": "/Items/Trinkets/BandsOfCastorAndPollux/Trinket_BandOfCastor" }
      ],
      "BandOfPollux": [
         { "text": "/Items/Trinkets/BandsOfCastorAndPollux/Trinket_BandOfPollux" }
      ],
      "BandOfStrength": [
         { "text": "/Items/Trinkets/BandOfStrength" }
      ],
      "BarbTerror": [
         { "text": "/Items/Mods/UnstableQuills" }
      ],
      "BarnSiege": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/HangmansMemento"
         }
      ],
      "BlinkFiend": [
         { "text": "/Items/Mods/BlinkToken" }
      ],
      "BlinkThief": [
         { "text": "/Items/Weapons/Basic/RicochetRifle/Weapon_Pan_RicochetRifle" },
         { "text": "/Items/Trinkets/Trinket_CelerityStone" }
      ],
      "BlizzardMage": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Mods/Blizzard"
         }
      ],
      "BloodFont": [
         { "text": "/Items/Trinkets/Trinket_BloodFont" }
      ],
      "Brabus": [
         { "text": "/Items/Mods/ExplosiveShot" },
         { "text": "/Items/Armor/Bandit/Armor_Head_Bandit" },
         { "text": "/Items/Armor/Bandit/Armor_Body_Bandit" },
         { "text": "/Items/Armor/Bandit/Armor_Legs_Bandit" },
         { "text": "/Items/Traits/Trait_ColdAsIce" }
      ],
      "BrainBug": [
         {
            "dlc": "Swamps of Corsus",
            "altname": "Gift of the Iskal",
            "text": "/Items/Trinkets/GIftOfTheIskal"
         },
         {
            "dlc": "Swamps of Corsus",
            "text": "/Items/Armor/Carapace/Armor_Head_Carapace"
         },
         {
            "dlc": "Swamps of Corsus",
            "text": "/Items/Armor/Carapace/Armor_Body_Carapace"
         },
         {
            "dlc": "Swamps of Corsus",
            "text": "/Items/Armor/Carapace/Armor_Legs_Carapace"
         },
         {
            "dlc": "Swamps of Corsus",
            "text": "/Items/Traits/Trait_Luminescent"
         }
      ],
      "BrutalMark": [
         { "text": "/Items/Trinkets/BrutalMark" }
      ],
      "BurdenOfTheReckless": [
         {
            "notes": "Random drop on Rhom",
            "text": "/Items/Trinkets/BurdenOfTheReckless"
         }
      ],
      "BurdenOfTheGambler": [
         {
            "notes": "Random drop on Earth",
            "text": "/Items/Trinkets/BurdenOfTheGambler"
         }
      ],
      "BurdenOfTheDevoted": [
         {
            "notes": "Random drop on Corsus",
            "text": "/Items/Trinkets/BurdenOfTheDevoted"
         }
      ],
      "BurdenOfTheFollower": [
         {
            "notes": "Random drop on Yaesha",
            "text": "/Items/Trinkets/Trinket_BurdenOfTheFollower"
         }
      ],
      "BurdenOfTheWarlord": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on Reisum",
            "text": "/Items/Trinkets/Trinket_BurdenOfTheWarlord"
         }
      ],
      "ButchersFetish": [
         { "text": "/Items/Trinkets/ButchersFetish" }
      ],
      "CharcoalNecklace": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on Reisum",
            "text": "/Items/Trinkets/CharcoalNecklace"
         }
      ],
      "CleansingJewel": [
         { "text": "/Items/Trinkets/CleansingJewel" }
      ],
      "CompulsionLoop": [
         { "text": "/Items/Trinkets/CompulsionLoop" }
      ],
      "CreepersPeeper": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/SwashbucklersSignet"
         },
         {
            "dlc": "Subject 2923",
            "altname": "Twin Shot",
            "text": "/Items/Weapons/Basic/MiniCrossbow/Weapon_MiniCrossbow"
         }
      ],
      "Cryptolith": [
         { "text": "/Items/Traits/Trait_Concentration" },
         { "text": "/Items/Traits/Trait_BloodBond" },
         { "text": "/Items/Armor/Armor_Head_Labyrinth" },
         { "text": "/Items/Armor/Armor_Body_Labyrinth" },
         { "text": "/Items/Armor/Armor_Legs_Labyrinth" }
      ],
      "DeceiversBand": [
         { "text": "/Items/Trinkets/DeceiversBand" }
      ],
      "DevouringLoop": [
         { "text": "/Items/Trinkets/DevouringLoop" }
      ],
      "DoeShrine": [
         { "text": "/Items/Trinkets/Trinket_ScavengersBauble" },
         { "text": "/Items/Traits/Trait_Swiftness" }
      ],
      "DrifterMask": [
         { "text": "/Items/Armor/Drifter/Armor_Head_Drifter" }
      ],
      "Driftstone": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on Reisum",
            "text": "/Items/Trinkets/DriftStone"
         }
      ],
      "EzlansBand": [
         { "text": "/Items/Trinkets/Trinket_EzlansBand" }
      ],
      "Fatty": [
         { "text": "/Items/Weapons/Boss/Devastator/Weapon_Swamp_Devastator" },
         {
            "dlc": "Swamps of Corsus",
            "text": "/Items/Weapons/Boss/ButchersFlail/Weapon_Swamp_ButchersFlail"
         },
         { "text": "/Items/Traits/Trait_Glutton" },
         { "text": "/Player/Emotes/Emote_Exhausted" }
      ],
      "FetidPool": [
         { "text": "/Items/Trinkets/Trinket_RustedAmulet" },
         { "text": "/Items/Trinkets/HeartOfDarkness" },
         { "text": "/Items/Trinkets/HerosRing" },
         { "text": "/Items/Traits/Trait_Fortification" }
      ],
      "FiveFingeredRing": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on rural Earth",
            "text": "/Items/Trinkets/FiveFingeredRing"
         }
      ],
      "Flautist": [
         { "text": "/Items/Trinkets/Trinket_HeartOfTheWolf" },
         { "text": "/Items/Traits/Trait_Swiftness" }
      ],
      "FlickeringHorror": [
         { "text": "/Items/Mods/RiftWalker" }
      ],
      "FoundersHideout": [
         { "text": "/Items/Armor/Drifter/Armor_Body_Drifter" },
         { "text": "/Items/Armor/Drifter/Armor_Legs_Drifter" }
      ],
      "FrozenLords": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Armor/Scavenger/Armor_Head_Scavenger"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Armor/Scavenger/Armor_Body_Scavenger"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Armor/Scavenger/Armor_Legs_Scavenger"
         }
      ],
      "GalenicCharm": [
         { "text": "/Items/Trinkets/Trinket_GalenicCharm" }
      ],
      "GraveyardElf": [
         { "text": "/Items/Trinkets/GrimCoil" },
         { "text": "/Items/Trinkets/Trinket_RingOfTheUnclean" },
         { "text": "/Items/Traits/Trait_Potency" }
      ],
      "GravityStone": [
         { "text": "/Items/Trinkets/GravityStone" }
      ],
      "Guardian": [
         { "text": "" }
      ],
      "GunslingersCharm": [
         { "text": "/Items/Trinkets/Trinket_GunslingersCharm" }
      ],
      "GunslignersRing": [
         { "text": "/Items/Trinkets/Trinket_GunslingersRing" }
      ],
      "HeartSeeker": [
         { "text": "/Items/Trinkets/HeartSeeker" }
      ],
      "Homestead": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/VanguardRing"
         }
      ],
      "HoundMaster": [
         { "text": "/Items/Mods/HowlersImmunity" }
      ],
      "HuntersBand": [
         { "text": "/Items/Trinkets/HuntersBand" }
      ],
      "HuntersHalo": [
         { "text": "/Items/Trinkets/Trinket_HuntersHalo" }
      ],
      "HuntersHideout": [
         { "text": "/Items/Weapons/Basic/HandGuns/HuntingPistol/Weapon_HuntingPistol" },
         { "text": "/Items/Traits/Trait_ShadowWalker" }
      ],
      "IceSkimmer": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/BandOfDiscord"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/RingOfSynergy"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Weapons/Basic/SawedOffShotgun/Weapon_SawedOffShotgun"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Armor/Warlord/Armor_Head_Warlord"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Armor/Warlord/Armor_Body_Warlord"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Armor/Warlord/Armor_Legs_Warlord"
         }
      ],
      "ImmolatorAndZephyr": [
         { "text": "/Items/Mods/WildfireShot" }
      ],
      "IskalQueen": [
         { "text": "/Items/Weapons/Basic/Melee/Weapon_Swamp_Scythe" },
         { "text": "/Items/Weapons/Basic/LongGuns/Crossbow/Weapon_Swamp_Crossbow" },
         { "text": "/Items/Armor/Slayer/Armor_Head_Slayer" },
         { "text": "/Items/Armor/Slayer/Armor_Body_Slayer" },
         { "text": "/Items/Armor/Slayer/Armor_Legs_Slayer" }
      ],
      "JanitorsWatch": [
         {
            "dlc": "Subject 2923",
            "notes": "Give Janitor's Watch to Clementine",
            "text": "/Items/Trinkets/AmberMoonstone"
         }
      ],
      "KeepersRing": [
         { "text": "/Items/Trinkets/Trinket_KeepersRing" }
      ],
      "KinCaller": [
         { "text": "/Items/Mods/SongOfSwords" }
      ],
      "KrallBaby": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Traits/Trait_Siphoner"
         },
         {
            "dlc": "Subject 2923",
            "notes": "Free Krall Baby then speak to mother at Chillwind Hovel",
            "text": "/Items/Trinkets/BlessedNecklace"
         }
      ],
      "LastWill": [
         { "text": "/Items/Weapons/Basic/LongGuns/AssaultRifle/Weapon_AssaultRifle" },
         { "text": "/Items/Traits/Trait_Spirit" }
      ],
      "LeechEmber": [
         { "text": "/Items/Trinkets/Trinket_LeechEmber" }
      ],
      "LizAndLiz": [
         {
            "altname": "Chicago Typewriter",
            "text": "/Items/Weapons/Basic/LongGuns/MachineGun/Weapon_Machinegun"
         },
         { "text": "/Items/Traits/Trait_Warrior" }
      ],
      "MadMerchant": [
         { "text": "/Items/QuestItems/TwistedMask/Quest_TwistedMask" }
      ],
      "Monolith": [
         {
            "dlc": "Swamps of Corsus",
            "text": "/Items/Armor/Void/Armor_Head_Void"
         },
         {
            "dlc": "Swamps of Corsus",
            "text": "/Items/Armor/Void/Armor_Body_Void"
         },
         {
            "dlc": "Swamps of Corsus",
            "text": "/Items/Armor/Void/Armor_Legs_Void"
         }
      ],
      "MothersRing": [
         { "text": "/Items/Trinkets/Trinket_MothersRing" }
      ],
      "MudTooth": [
         { "text": "/Quests/Quest_OverworldPOI_MudTooth/Quest_BrabusPocketWatch" }
      ],
      "Nexus": [
         { "text": "" }
      ],
      "OldManAndConstruct": [
         { "text": "/Items/Trinkets/JewelOfTheBlackSun" },
         { "text": "/Items/Trinkets/MendersCharm" },
         { "text": "/Items/Armor/Osseous/Armor_Head_Osseous" },
         { "text": "/Items/Armor/Osseous/Armor_Body_Osseous" },
         { "text": "/Items/Armor/Osseous/Armor_Legs_Osseous" },
         { "text": "/Items/Mods/IronSentinel" },
         {
            "notes": "Pet Wud's dog on Rhom",
            "text": "/Items/Mods/VeryGoodBoy"
         }
      ],
      "PearlOfLuminescence": [
         { "text": "/Items/Trinkets/Trinket_PearlOfLuminescence" }
      ],
      "Penitent": [
         { "text": "/Items/Trinkets/Trinket_LetosAmulet" }
      ],
      "PillarOfStone": [
         { "text": "/Items/Trinkets/Trinket_PillarOfStone" }
      ],
      "PolishedWhetstone": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on Reisum",
            "text": "/Items/Trinkets/PolishedWhetstone"
         }
      ],
      "QueensTemple": [
         {
            "dlc": "Swamps of Corsus",
            "text": "/Items/Weapons/Boss/PrideOfTheIskal/Weapon_Swamp_PrideOfTheIskal"
         },
         { "text": "/Items/Traits/Trait_Footwork" },
         { "text": "/Items/Mods/Seeker" }
      ],
      "RadioactiveEmber": [
         {
            "notes": "Random drop on Rhom",
            "text": "/Items/Trinkets/RadioactiveEmber"
         }
      ],
      "RatRider": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Traits/Trait_HardCharger"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Weapons/Boss/Alternator/Weapon_Snow_Alternator"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Weapons/Boss/ChainBlade/Weapon_Snow_ChainBlade"
         }
      ],
      "RazorStone": [
         { "text": "/Items/Trinkets/Razorstone" }
      ],
      "RazorwireNecklace": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on Reisum",
            "text": "/Items/Trinkets/RazorwireNecklace"
         }
      ],
      "ReggiesRing": [
         { "text": "/Items/Traits/Trait_Scavenger" }
      ],
      "RestrictionCord": [
         {
            "notes": "Random drop on Yaesha",
            "text": "/Items/Trinkets/RestrictionCord"
         }
      ],
      "RingOfElusion": [
         { "text": "/Items/Trinkets/RingOfElusion" }
      ],
      "RingOfEvasion": [
         { "text": "/Items/Trinkets/Trinket_RingOfEvasion" }
      ],
      "RockOfAnguish": [
         { "text": "/Items/Trinkets/RockOfAnguish" }
      ],
      "RingOfShadows": [
         { "text": "/Items/Trinkets/Trinket_RingOfShadows" }
      ],
      "RootBrute": [
         { "text": "/Items/Mods/MantleOfThorns" }
      ],
      "RootCultist": [
         { "text": "/Items/Trinkets/BraidedThorns" },
         { "text": "/Items/Trinkets/Trinket_RootCirclet" }
      ],
      "RootDragon": [
         { "text": "/Items/Weapons/Boss/Root_Spitfire/Weapon_Root_Spitfire" },
         { "text": "/Items/Weapons/Boss/Root_Smolder/Weapon_Root_Smolder" },
         { "text": "/Player/Emotes/Emote_Beckon" }
      ],
      "RootMother": [
         { "text": "/Items/Traits/Trait_MothersBlessing" },
         { "text": "/Items/Weapons/Basic/LongGuns/SniperRifle/Weapon_SniperRifle" }
      ],
      "RootTumbleweed": [
         { "text": "/Items/Mods/SeedCaller" }
      ],
      "RootWraith": [
         { "text": "/Items/Mods/Rattleweed" }
      ],
      "RootEnt": [
         { "text": "/Items/Weapons/Boss/Root_SporeLauncher/Weapon_Root_SporeLauncher" },
         { "text": "/Items/Weapons/Boss/Root_PetrifiedMaul/Weapon_Root_PetrifiedMaul" },
         { "text": "/Items/Traits/Trait_QuickHands" },
         { "text": "/Player/Emotes/Emote_Cheer" }
      ],
      "RootShrine": [
         { "text": "/Items/Armor/Twisted/Armor_Head_Twisted" },
         { "text": "/Items/Armor/Twisted/Armor_Body_Twisted" },
         { "text": "/Items/Armor/Twisted/Armor_Legs_Twisted" }
      ],
      "Ruins": [
         { "text": "" }
      ],
      "SageStone": [
         { "text": "/Items/Trinkets/Trinket_Sagestone" }
      ],
      "Sentinel": [
         { "text": "/Items/Mods/Beckon" }
      ],
      "SerpentsFang": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on Reisum",
            "text": "/Items/Trinkets/SerpentsFang"
         }
      ],
      "Settlement": [
         { "text": "" }
      ],
      "ShamanFlames": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/Trinket_PrismaticDiamondRing"
         }
      ],
      "ShieldWarden": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Mods/FrozenMist"
         }
      ],
      "Sketterling": [
         { "text": "/Items/Armor/Carapace/Armor_Head_Carapace" },
         { "text": "/Items/Armor/Carapace/Armor_Body_Carapace" },
         { "text": "/Items/Armor/Carapace/Armor_Legs_Carapace" },
         { "text": "/Items/Trinkets/Trinket_IskalHunterBand" },
         { "text": "/Items/Trinkets/AmuletOfEpicaricacy" },
         { "text": "/Items/Trinkets/RingOfTheMantis" }
      ],
      "SlaveRevolt": [
         { "text": "/Items/Traits/Trait_Triage" }
      ],
      "SlimeHulk": [
         { "text": "/Items/Mods/CorrosiveAura" },
         { "text": "/Items/Traits/Trait_Catalyst" }
      ],
      "SnowRuins": [
         { "text": "" }
      ],
      "SoulLink": [
         { "text": "/Items/Trinkets/SoulLink" }
      ],
      "SpiritStone": [
         {
            "notes": "Random drop on Yaesha",
            "text": "/Items/Trinkets/Trinket_SpiritStone"
         }
      ],
      "Splitter": [
         { "text": "/Items/Armor/Leto/Armor_Head_Leto" },
         { "text": "/Items/Armor/Leto/Armor_Body_Leto" },
         { "text": "/Items/Armor/Leto/Armor_Legs_Leto" },
         { "text": "/Items/Mods/FlickerCloak" }
      ],
      "StalkersBrand": [
         {
            "notes": "Random drop on Yaesha",
            "text": "/Items/Trinkets/Trinket_StalkersBrand"
         }
      ],
      "StockpileCirclet": [
         { "text": "/Items/Trinkets/Trinket_StockpileCirclet" }
      ],
      "StoneOfBalance": [
         { "text": "/Items/Trinkets/Trinket_StoneOfBalance" }
      ],
      "StormAmulet": [
         { "text": "/Items/Trinkets/Trinket_StormAmulet" }
      ],
      "StormCaller": [
         { "text": "/Items/Mods/StormCaller" }
      ],
      "StuckMerchant": [
         { "text": "/Items/Weapons/Basic/Spear/Weapon_Pan_Spear" },
         { "text": "/Items/Armor/Radiant/Armor_Legs_Radiant" },
         { "text": "/Items/Armor/Radiant/Armor_Body_Radiant" },
         { "text": "/Items/Armor/Radiant/Armor_Head_Radiant" },
         { "text": "/Items/Trinkets/Trinket_GuardiansRing" },
         { "text": "/Items/Traits/Trait_GuardiansBlessing" }
      ],
      "SwampGuardian": [
         { "text": "/Items/Weapons/Boss/HiveCannon/Weapon_Swamp_HiveCannon" },
         { "text": "/Items/Weapons/Boss/GuardianAxe/Weapon_Swamp_GuardianAxe" },
         { "text": "/Items/Traits/Trait_Executioner" },
         { "text": "/Player/Emotes/Emote_Confused" }
      ],
      "SwarmMaster": [
         { "text": "/Items/Mods/BreathOfDesert" }
      ],
      "TalismanOfAnimosity": [
         { "text": "/Items/Trinkets/TalismanOfAnimosity" }
      ],
      "TalismanOfPerseverance": [
         {
            "note": "According to devs, can also be a random drop on Yaesha",
            "text": "/Items/Trinkets/TalismanOfPerseverance"
         }
      ],
      "TerrorMargin": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on Rural Earth",
            "text": "/Items/Trinkets/TerrorMargin"
         }
      ],
      "TheCleanRoom": [
         {
            "altname": "Wastelander Flail",
            "text": "/Items/Weapons/Basic/Wasteland_Flail/Weapon_Wasteland_Flail"
         }
      ],
      "TheHarrow": [
         { "text": "/Items/Weapons/Boss/Defiler/Weapon_Wasteland_Defiler" },
         { "text": "/Items/Weapons/Boss/LostHarpoon/Weapon_Wasteland_LostHarpoon" },
         { "text": "/Player/Emotes/Emote_Fail" }
      ],
      "TheJackal": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Mods/ColdSpear"
         }
      ],
      "TheLostGantry": [
         { "text": "/Items/Weapons/Basic/Wasteland_BeamRifle/Weapon_Wasteland_BeamRifle" }
      ],
      "TheRisen": [
         { "text": "/Items/Trinkets/SoulAnchor" }
      ],
      "TotemFather": [
         { "text": "/Items/Traits/Trait_ArcaneStrike" },
         { "text": "/Items/Weapons/Boss/Pan_EyeOfTheStorm/Weapon_Pan_EyeOfTheStorm" },
         { "text": "/Items/Weapons/Boss/Pan_VoiceOfTheTempest/Weapon_Pan_VoiceOfTheTempest" },
         { "text": "/Player/Emotes/Emote_TeaTime" }
      ],
      "Tyrant": [
         { "text": "/Items/Mods/Swarm" },
         { "text": "/Items/Traits/Trait_Catalyst" }
      ],
      "UndyingKing": [
         { "text": "/Items/Weapons/Boss/Ruin/Weapon_Wasteland_Ruin" },
         { "text": "/Items/Traits/Trait_Kingslayer" },
         { "text": "/Items/Weapons/Boss/Riven/Weapon_Wasteland_Riven" },
         { "text": "/Player/Emotes/Emote_Gravedigger" }
      ],
      "UrikkiBlademasters": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Mods/FanOfKnives"
         }
      ],
      "VargylBones": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Weapons/Boss/Frostborne/Weapon_Frostborne"
         }
      ],
      "VengeanceIdol": [
         { "text": "/Items/Trinkets/VengeanceIdol" }
      ],
      "Uncategorized": [
         { "text": "/Items/Traits/Trait_Exploiter" },
         { "text": "/Items/Traits/Trait_Handling" },
         { "text": "/Items/Traits/Trait_KeepersBlessing" },
         { "text": "/Items/Traits/Trait_RapidStrike" },
         { "text": "/Items/Traits/Trait_Revivalist" },
         { "text": "/Items/Traits/Trait_SleightOfHand" },
         { "text": "/Items/Traits/Trait_Suspicion" },
         { "text": "/Items/Traits/Trait_Teamwork" },
         { "text": "/Items/Traits/Trait_TriggerHappy" },
         { "text": "/Items/Traits/Trait_WillToLive" },
         { "text": "/Items/Traits/Trait_WorldWalker" },
         { "text": "/Items/Traits/Trait_Invoker" },
         {
            "notes": "Obtain 25 weapon mods",
            "text": "/Items/Traits/Trait_FlashCaster"
         },
         {
            "notes": "Vault over 50 ledges",
            "text": "/Items/Traits/Trait_Climber"
         },
         {
            "notes": "Deal 5,000 damage to armored points on enemies",
            "text": "/Items/Traits/Trait_ArmorPiercer"
         },
         {
            "notes": "Get 100 kills using explosion damage",
            "text": "/Items/Traits/Trait_Demolitionist"
         },
         {
            "notes": "Inflict 100 status effects on enemies",
            "text": "/Items/Traits/Trait_Tormentor"
         },
         {
            "notes": "Cure 25 full status effects using consumables",
            "text": "/Items/Traits/Trait_Vaccine"
         },
         { "text": "/Player/Emotes/Emote_Wave" },
         {
            "mode": "survival",
            "notes": "Reward for 5 consecutive boss kills",
            "text": "/Items/Armor/Adventurer/Armor_Head_Adventurer"
         },
         {
            "mode": "survival",
            "notes": "Reward for 10 consecutive boss kills",
            "text": "/Items/Weapons/Human/Melee/Sword/Weapon_HerosSword"
         },
         {
            "mode": "survival",
            "notes": "Reward for 25 total boss kills",
            "text": "/Items/Trinkets/Trinket_LoopOfProsperity"
         },
         {
            "mode": "survival",
            "notes": "Reward for 50 total boss kills",
            "text": "/Items/Trinkets/TalismanOfPerseverance"
         },
         {
            "mode": "survival",
            "notes": "Reward for 75 total boss kills",
            "text": "/Items/Trinkets/DaredevilsCharm"
         },
         {
            "mode": "survival",
            "notes": "Reward for 100 total boss kills",
            "text": "/Items/Trinkets/BlackRose"
         },
         {
            "mode": "survival",
            "notes": "Reward for defeating all minibosses twice(?)",
            "text": "/Items/Trinkets/BlackCatBand"
         },
         {
            "mode": "survival",
            "notes": "Reward for defeating all world bosses twice(?)",
            "text": "/Items/Trinkets/BrightSteelRing"
         },
         {
            "mode": "survival",
            "notes": "Reward for defeating all bosses an unknown number of times",
            "text": "/Items/Trinkets/WhiteRose"
         },
         {
            "mode": "survival",
            "notes": "Purchase 100 items",
            "text": "/Items/Trinkets/RingOfFlawlessBeauty"
         },
         {
            "mode": "hardcore",
            "notes": "Reward for defeating Clavinger/Harrow",
            "text": "/Items/Trinkets/AkariWarBand"
         },
         {
            "mode": "hardcore",
            "notes": "Reward for defeating Ixillis",
            "text": "/Items/Trinkets/Trinket_EmpoweringLoop"
         },
         {
            "mode": "hardcore",
            "notes": "Reward for defeating Singe/Ent",
            "text": "/Items/Trinkets/Trinket_ProvisionerRing"
         },
         {
            "mode": "hardcore",
            "notes": "Reward for defeating Totem Father/Ravager",
            "altname": "Ring of Supremacy",
            "text": "/Items/Trinkets/RingOfSumpremacy"
         },
         {
            "mode": "hardcore",
            "notes": "Reward for defeating Dreamer",
            "text": "/Items/Trinkets/Trinket_NightmareSpiral"
         },
         {
            "mode": "hardcore",
            "notes": "Reward for defeating Dreamer",
            "text": "/Player/Emotes/Emote_HighFive"
         },
         {
            "mode": "hardcore",
            "notes": "High five emote another player",
            "text": "/Items/Trinkets/Trinket_BandOfAccord"
         },
         {
            "mode": "hardcore",
            "notes": "Reward for defeating Brudvaak and Vargr",
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/RingOfThePunisher"
         },
         {
            "mode": "hardcore",
            "notes": "Reward for defeating Root Harbinger",
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/ShatteredVertebrae"
         },
         {
            "mode": "hardcore",
            "notes": "Reward for completing both campaigns",
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/OnyxPendulum"
         }
      ],
      "VolatileGem": [
         {
            "dlc": "Subject 2923",
            "notes": "Random drop on Reisum",
            "text": "/Items/Trinkets/VolatileGem"
         }
      ],
      "Vyr": [
         { "text": "/Items/Mods/VeilOfTheBlackTear" }
      ],
      "WailingWood": [
         { "text": "/Items/Trinkets/Trinket_TwistedIdol" },
         { "text": "/Items/Traits/Trait_BarkSkin" }
      ],
      "Ward13": [
         { "text": "/Items/Weapons/Basic/LongGuns/Coachgun/Weapon_Coachgun" },
         { "text": "/Items/Weapons/Human/Melee/Hatchet/Weapon_Hatchet" },
         { "text": "/Items/Armor/Cultist/Armor_Body_Cultist" },
         { "text": "/Items/Armor/Cultist/Armor_Head_Cultist" },
         { "text": "/Items/Armor/Cultist/Armor_Legs_Cultist" },
         { "text": "/Items/Weapons/Basic/LongGuns/HuntingRifle/Weapon_HuntingRifle" },
         { "text": "/Items/Weapons/Human/Melee/Sword/Weapon_Sword" },
         { "text": "/Items/Armor/Hunter/Armor_Body_Hunter" },
         { "text": "/Items/Armor/Hunter/Armor_Head_Hunter" },
         { "text": "/Items/Armor/Hunter/Armor_Legs_Hunter" },
         { "text": "/Items/Weapons/Basic/LongGuns/Shotgun/Weapon_Shotgun" },
         { "text": "/Items/Armor/Scrapper/Armor_Body_Scrapper" },
         { "text": "/Items/Armor/Scrapper/Armor_Head_Scrapper" },
         { "text": "/Items/Armor/Scrapper/Armor_Legs_Scrapper" },
         { "text": "/Items/Weapons/Human/Melee/Hammer/Weapon_Hammer" },
         { "text": "/Items/Traits/Trait_ElderKnowledge" },
         { "text": "/Items/Weapons/Basic/HandGuns/SubMachineGun/Weapon_Submachinegun" },
         { "text": "/Items/Trinkets/RingOfTheAdmiral" }
      ],
      "Ward17": [
         { "text": "/Items/Weapons/Boss/Guns/LongGuns/Repulsor/Weapon_Atoll_Repulsor" },
         { "text": "/Items/Traits/Trait_MindsEye" },
         { "text": "/Player/Emotes/Emote_PraiseTheGun" }
      ],
      "Ward17Root": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Weapons/Boss/FusionRifle/Weapon_Rural_FusionRifle"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Weapons/Boss/WorldsEdge/Weapon_Rural_WorldsEdge"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Traits/Trait_LastResort"
         }
      ],
      "WardPrime": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Weapons/Basic/MachinePistol/Weapon_MachinePistol"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/Trinket_RingOfHonor"
         },
         {
            "dlc": "Subject 2923",
            "text": "/Items/Traits/Trait_Wisdom"
         }
      ],
      "WarningTotems": [
         {
            "dlc": "Subject 2923",
            "text": "/Items/Trinkets/BloodlettersInsignia"
         },
         {
            "dlc": "Subject 2923",
            "note": "Destroy some unactivated and some activated totems",
            "text": "/Items/Trinkets/JuggernautBand"
         },
         {
            "dlc": "Subject 2923",
            "note": "Destroy all totems without activating them",
            "text": "/Items/Trinkets/Trinket_EvokersSeal"
         },
         {
            "dlc": "Subject 2923",
            "note": "Destroy all totems after activating them",
            "text": "/Items/Trinkets/VulcansDetonator"
         }
      ],
      "Wisp": [
         { "text": "/Items/Trinkets/SoulEmber" },
         { "text": "/Items/Traits/Trait_Evocation" }
      ],
      "WastelandGuardian": [
         { "text": "/Items/Weapons/Boss/WorldBreaker/Weapon_Wasteland_WorldBreaker" },
         { "text": "/Items/Weapons/Boss/ParticleAccelerator/Weapon_Wasteland_ParticleAccelerator" },
         { "text": "/Items/Traits/Trait_Recovery" },
         { "text": "/Player/Emotes/Emote_Laugh" }
      ],
      "Wolf": [
         { "text": "/Items/Weapons/Boss/Pan_CurseOfTheJungleGod/Weapon_Pan_CurseOfTheJungleGod" },
         { "text": "/Items/Weapons/Boss/Pan_ScarOfTheJungleGod/Weapon_Pan_ScarOfTheJungleGod" },
         { "text": "/Items/Traits/Trait_ArcaneStrike" },
         { "text": "/Items/Traits/Trait_Swiftness" },
         { "text": "/Player/Emotes/Emote_FreezeFrame" }
      ],
      "WolfShrine": [
         { "text": "/Items/Armor/Elder/Armor_Head_Elder" },
         { "text": "/Items/Armor/Elder/Armor_Body_Elder" },
         { "text": "/Items/Armor/Elder/Armor_Legs_Elder" }
      ]
   }
   ,
   "version": "38"
}