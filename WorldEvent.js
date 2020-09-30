class WorldEvent
{
    eventKey;
    mItems;
    location;
    type;
    name;

    get MissingItems()
    {
        return this.mItems.join('\n');
    }

    get PossibleItems()
    {
        return this.getPossibleItems().join('\n');
    }

    static ProcessMode = 
    {
        Campaign: "Campaingn",
        Adventure: "Adventure",
        Subject2923: "Subject2923"
    };


    constructor() {
        this.eventKey = "";
        this.mItems = [];
        this.location = "";
        this.type = "";
        this.name = "";
    }

    getPossibleItems()
    {
        var items = [];
        if (GameInfo.EventItem.hasOwnProperty(this.eventKey))
        {
            items = GameInfo.EventItem[this.eventKey];
            if(items.length == 1 && items[0].GetKey() == "") items = [];
        }
        return items;
    }

    setMissingItems(charData)
    {
        var missingItems = [];
        var possibleItems = this.getPossibleItems();

        possibleItems.forEach( item => {
            if(!charData.Inventory.includes(item.GetKey())) missingItems.push(item);
        });

        this.mItems = missingItems;

        if(possibleItems.length == 0 && !GameInfo.Events.hasOwnProperty(this.eventKey) && !this.eventKey === "TraitBook" && !this.eventKey === "Simulacrum")
        {
            ri = new Item("/UnknownPotentialLoot");
            this.mItems.push(ri);
        }
    }

    ToString()
    {
        return this.name;
    }

    static UpdateMissingItems(character)
    {
        character.CampaignEvents.forEach(event => {
            event.setMissingItems(character);
        });
        character.AdventureEvents.forEach(event => {
            event.setMissingItems(character);
        });
    }

    //credit to /u/hzla00 for original javascript implementation
    static ProcessEvents(character, eventsText, mode)
    {
        var zones = {};
        var zoneEvents = {};
        var churchEvents = [];

        GameInfo.Zones.forEach(z => {
            zones[z] = {};
            zoneEvents[z] = [];
        })

        var zone = null;
        var currentMainLocation = "Fairview";
        var currentSublocation = null;

        var eventName = null;
        var matches = eventsText.match(/(?:\/[a-zA-Z0-9_]+){3}\/(([a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+)|Quest_Church)/g);
        
        if(matches !== null)
        {
            matches.forEach( match => {
                var eventType = null;
                var lastEventname = eventName;
                eventName = null;
                var textLine = match;

                //try
                //{
                    if (currentSublocation !== null)
                    {
                        //Some world bosses don't have a preceding dungeon; subsequent items therefore spawn in the overworld
                        if (currentSublocation === "TheRavager'sHaunt" || currentSublocation === "TheTempestCourt") currentSublocation = null;
                    }

                    zone = this.getZone(textLine);
                    eventType = this.getEventType(textLine);
                    
                    if (textLine.includes("Overworld_Zone") || textLine.includes("_Overworld_"))
                    {
                        //process overworld zone marker
                        currentMainLocation = textLine.split('/')[4].split('_')[1] + " " + textLine.split('/')[4].split('_')[2] + " " + textLine.split('/')[4].split('_')[3];
                        if (GameInfo.MainLocations.hasOwnProperty(currentMainLocation))
                        {
                            currentMainLocation = GameInfo.MainLocations[currentMainLocation];
                        } else
                        {
                            currentMainLocation = null;
                        }
                        return;
                    }
                    else if (textLine.includes("Quest_Church"))
                    {
                        //process Root Mother event
                        currentMainLocation = "Chapel Station";
                        eventName = "RootMother";
                        currentSublocation = "Church of the Harbinger";
                    }
                    else if (eventType != null)
                    {
                        //process other events, if they're recognized by getEventType
                        eventName = textLine.split('/')[4].split('_')[2];
                        if (textLine.includes("OverworldPOI"))
                        {
                            currentSublocation = null;
                        }
                        else if (!textLine.includes("Quest_Event"))
                        {
                            if (GameInfo.SubLocations.hasOwnProperty(eventName))
                            {
                                currentSublocation = GameInfo.SubLocations[eventName];
                            }
                            else
                            {
                                currentSublocation = null;
                            }
                        }
                        if (currentMainLocation === "Chapel Station")
                        {
                            if (textLine.includes("Quest_Boss"))
                            {
                                currentMainLocation = "Westcourt";
                            } else
                            {
                                currentSublocation = null;
                            }
                        }
                    }

                    if (mode === this.ProcessMode.Adventure) currentMainLocation = null;

                    if (eventName !== lastEventname)
                    {
                        var se = new WorldEvent();
                        // Replacements
                        if (eventName !== null)
                        {
                            se.eventKey = eventName;
                            if (GameInfo.Events.hasOwnProperty(eventName)) {
                                se.name = GameInfo.Events[eventName];
                            } else
                            {
                                se.name = eventName;
                            }
                            se.name = se.name.replace(/([a-z])([A-Z])/g, '$1 $2');
                        }

                        if (zone !== null && eventType !== null && eventName !== null)
                        {
                            if (!zones[zone].hasOwnProperty(eventType))
                            {
                                zones[zone][eventType] = "";
                            }
                            if (!zones[zone][eventType].includes(eventName))
                            {
                                zones[zone][eventType] += ", " + eventName;
                                var locationList = [];
                                locationList.push(zone);
                                if (currentMainLocation !== null) locationList.push(currentMainLocation.replace(/([a-z])([A-Z])/g, '$1 $2'));
                                if (currentSublocation !== null) locationList.push(currentSublocation.replace(/([a-z])([A-Z])/g, '$1 $2'));
                                se.location = locationList.join(': ');
                                se.type = eventType;
                                se.setMissingItems(character);

                                if (currentMainLocation !== "Chapel Station") {
                                    zoneEvents[zone].push(se);
                                }
                                else
                                {
                                    churchEvents.splice(0, 0, se) // insert se at index 0
                                }

                                // rings drop with the Cryptolith on Rhom
                                if (eventName === "Cryptolith" && zone === "Rhom")
                                {
                                    var ringdrop = new WorldEvent();
                                    ringdrop.location = zone;
                                    ringdrop.eventKey = "SoulLink";
                                    ringdrop.name = "Soul Link";
                                    ringdrop.type = "Item Drop";
                                    ringdrop.setMissingItems(character);
                                    zoneEvents[zone].push(ringdrop);
                                }
                                // beetle always spawns in Strange Pass
                                else if (eventName === "BrainBug")
                                {
                                    var beetle = new WorldEvent();
                                    beetle.location = se.location;
                                    beetle.eventKey = "Sketterling";
                                    beetle.name = "Sketterling";
                                    beetle.type = "Loot Beetle";
                                    beetle.setMissingItems(character);
                                    zoneEvents[zone].push(beetle);
                                }
                                else if (eventName === "BarnSiege")
                                {
                                    var wardPrime = new WorldEvent();
                                    wardPrime.eventKey = "WardPrime";
                                    wardPrime.name = "Ward Prime";
                                    wardPrime.location = "Earth: Ward Prime";
                                    wardPrime.type = "Quest Event";
                                    wardPrime.setMissingItems(character);
                                    zoneEvents[zone].push(wardPrime);
                                }
                            }
                        }

                    }
                //}
                /*catch (err)
                {
                    console.log("Error parsing save event:");
                    console.log("\tLine: " + textLine);
                    console.log("\tError: " + err.message);
                } */
            });
        }

        var orderedEvents = [];
        var churchAdded = false;
        var queenAdded = false;
        var navunAdded = false;
        var ward13 = new WorldEvent();
        var hideout = new WorldEvent();
        var undying = new WorldEvent();
        var queen = new WorldEvent();
        var navun = new WorldEvent();
        var ward17 = new WorldEvent();

        if (mode === this.ProcessMode.Campaign)
        {
            ward13.eventKey = "Ward13";
            ward13.name = "Ward 13";
            ward13.location = "Earth: Ward 13";
            ward13.type = "Home";
            ward13.setMissingItems(character);
            if (ward13.MissingItems.length > 0) orderedEvents.push(ward13);

            hideout.eventKey = "FoundersHideout";
            hideout.name = "Founder's Hideout";
            hideout.location = "Earth: Fairview";
            hideout.type = "Point of Interest";
            hideout.setMissingItems(character);
            if (hideout.MissingItems.length > 0) orderedEvents.push(hideout);

            undying.eventKey = "UndyingKing";
            undying.name = "Undying King";
            undying.location = "Rhom: Undying Throne";
            undying.type = "World Boss";
            undying.setMissingItems(character);

            queen.name = "Iskal Queen";
            queen.eventKey = "IskalQueen";
            queen.location = "Corsus: The Mist Fen";
            queen.type = "Point of Interest";
            queen.setMissingItems(character);

            navun.name = "Fight With The Rebels";
            navun.eventKey = "SlaveRevolt";
            navun.location = "Yaesha: Shrine of the Immortals";
            navun.type = "Siege";
            navun.setMissingItems(character);

            ward17.eventKey = "Ward17";
            ward17.name = "The Dreamer";
            ward17.location = "Earth: Ward 17";
            ward17.type = "World Boss";
            ward17.setMissingItems(character);
        }

        for (var i = 0; i < zoneEvents["Earth"].length; i++)
        {
            //if (mode == this.ProcessMode.Subject2923) Console.WriteLine(zoneEvents["Earth"][i].eventKey);
            if (mode === this.ProcessMode.Campaign && !churchAdded && zoneEvents["Earth"][i].location.includes("Westcourt"))
            {
                churchEvents.forEach( rwe => {
                    orderedEvents.push(rwe);
                });
                churchAdded = true;
            }
            orderedEvents.push(zoneEvents["Earth"][i]);
        }

        for (var i = 0; i < zoneEvents["Rhom"].length; i++)
        {
            orderedEvents.push(zoneEvents["Rhom"][i]);
        }

        if (mode === this.ProcessMode.Campaign && undying.MissingItems.length > 0) orderedEvents.push(undying);
        
        for (var i = 0; i < zoneEvents["Corsus"].length; i++)
        {
            if (mode === this.ProcessMode.Campaign && !queenAdded && zoneEvents["Corsus"][i].location.includes("The Mist Fen"))
            {
                if (queen.MissingItems.length > 0) orderedEvents.push(queen);
                queenAdded = true;
            }
            orderedEvents.push(zoneEvents["Corsus"][i]);
        }
        for (var i = 0; i < zoneEvents["Yaesha"].length; i++)
        {
            if (mode === this.ProcessMode.Campaign && !navunAdded && zoneEvents["Yaesha"][i].location.includes("The Scalding Glade"))
            {
                if (navun.MissingItems.length > 0) orderedEvents.push(navun);
                navunAdded = true;
            }
            orderedEvents.push(zoneEvents["Yaesha"][i]);
        }
        for (var i = 0; i < zoneEvents["Reisum"].length; i++)
        {
            /*if (mode == this.ProcessMode.Campaign && !navunAdded && zoneEvents["Yaesha"][i].location.Contains("The Scalding Glade"))
            {
                if (navun.MissingItems.length > 0) orderedEvents.Add(navun);
                navunAdded = true;
            }*/
            orderedEvents.push(zoneEvents["Reisum"][i]);
        }

        if (mode === this.ProcessMode.Campaign)
        {
            if (ward17.MissingItems.length > 0) orderedEvents.push(ward17);
        }

        for (var i = 0; i < orderedEvents.length; i++)
        {
            if (mode === this.ProcessMode.Campaign || mode === this.ProcessMode.Subject2923)
            {
                character.CampaignEvents.push(orderedEvents[i]);
            }
            else
            {
                character.AdventureEvents.push(orderedEvents[i]);
            }
        }

        if (mode === this.ProcessMode.Subject2923)
        {
            ward17.eventKey = "Ward17Root";
            ward17.name = "Harsgaard";
            ward17.location = "Earth: Ward 17 (Root Dimension)";
            ward17.type = "World Boss";
            ward17.setMissingItems(character);
            character.CampaignEvents.push(ward17);
        }
    }



    static getZone(textLine)
    {
        var zone = null;

        if (textLine.includes("World_City") || textLine.includes("Quest_Church") || textLine.includes("World_Rural"))
        {
            zone = "Earth";
        }
        else if (textLine.includes("World_Wasteland"))
        {
            zone = "Rhom";
        }
        else if (textLine.includes("World_Jungle"))
        {
            zone = "Yaesha";
        }
        else if (textLine.includes("World_Swamp"))
        {
            zone = "Corsus";
        }
        else if (textLine.includes("World_Snow") || textLine.includes("Campaign_Clementine"))
        {
            zone = "Reisum";
        }
        return zone;
    }

    static getEventType(textLine)
    {
        var eventType = null;

        if (textLine.includes("SmallD"))
        {
            eventType = "Side Dungeon";
        }
        else if (textLine.includes("Quest_Boss"))
        {
            eventType = "World Boss";
        }
        else if (textLine.includes("Siege") || textLine.includes("Quest_Church"))
        {
            eventType = "Siege";
        }
        else if (textLine.includes("Mini"))
        {
            eventType = "Miniboss";
        }
        else if (textLine.includes("Quest_Event"))
        {
            if (textLine.includes("Nexus"))
            {
                eventType = "Siege";
            }
            else if (textLine.includes("Sketterling"))
            {
                eventType = "Loot Beetle";
            }
            else
            {
                eventType = "Item Drop";
            }
        }
        else if (textLine.includes("OverworldPOI") || textLine.includes("OverWorldPOI") || textLine.includes("OverworlPOI"))
        {
            eventType = "Point of Interest";
        }
        return eventType;
    }
}