class Character
{
    Archetype;
    Inventory;
    CampaignEvents;
    AdventureEvents;
    missingItems;

    static ProcessMode = 
    {
        Campaign: "Campaingn",
        Adventure: "Adventure"
    };

    static CharacterProcessingMode = 
    { 
        All: "All",
        NoEvents: "Noevents" 
    };

    get Progression()
    {
        return this.Inventory.length;
    }

    ToString()
    {
        return this.Archetype + " (" + this.Progression + " items )";
    }

    ToFullString()
    {
        str = "CharacterData{ Archetype: " + this.Archetype + ", Inventory: [" + this.Inventory.join(", ") + "], CampaignEvents: [" + this.CampaignEvents.join(", ") + "], AdventureEvents: [" + this.AdventureEvents.join(", ") + "] }";
        return str;
    }

    constructor()
    {
        this.Archetype = "";
        this.CampaignEvents = [];
        this.AdventureEvents = [];
        this.Inventory = [];
        this.missingItems = [];
    }

    processSaveData(saveText)
    {       
        //get campaign info
        var strCampaignEnd = "/Game/Campaign_Main/Quest_Campaign_Main.Quest_Campaign_Main_C";
        var strCampaignStart = "/Game/Campaign_Main/Quest_Campaign_City.Quest_Campaign_City";
        var campaignEnd = saveText.indexOf(strCampaignEnd);
        var campaignStart = saveText.indexOf(strCampaignStart);

        if (campaignStart !== -1 && campaignEnd !== -1)
        {
            var campaigntext = saveText.substring(0, campaignEnd);
            campaignStart = campaigntext.lastIndexOf(strCampaignStart);
            campaigntext = campaigntext.substring(campaignStart);
            WorldEvent.ProcessEvents(this, campaigntext, WorldEvent.ProcessMode.Campaign);
        }
        else
        {
            var strCampaignEnd = "/Game/Campaign_Clementine/Quest_Campaign_Clementine.Quest_Campaign_Clementine_C";
            var strCampaignStart = "/Game/World_Rural/Templates/Template_Rural_Overworld_0";
            campaignEnd = saveText.indexOf(strCampaignEnd);
            campaignStart = saveText.indexOf(strCampaignStart);
            if (campaignStart !== -1 && campaignEnd !== -1)
            {
                var campaigntext = saveText.substring(0, campaignEnd);
                campaignStart = campaigntext.lastIndexOf(strCampaignStart);
                campaigntext = campaigntext.substring(campaignStart);
                WorldEvent.ProcessEvents(this, campaigntext, WorldEvent.ProcessMode.Subject2923);
            } else
            {
                console.log("Campaign not found; likely in tutorial mission.");
            }
        }

        //get adventure info
        if (saveText.includes("Quest_AdventureMode_"))
        {
            var adventureZone;
            if (saveText.includes("Quest_AdventureMode_City_C")) adventureZone = "City";
            if (saveText.includes("Quest_AdventureMode_Wasteland_C")) adventureZone = "Wasteland";
            if (saveText.includes("Quest_AdventureMode_Swamp_C")) adventureZone = "Swamp";
            if (saveText.includes("Quest_AdventureMode_Jungle_C")) adventureZone = "Jungle";
            if (saveText.includes("Quest_AdventureMode_Snow_C")) adventureZone = "Snow";
            // error detection if undefinied ? + add else to speed up ?
            var strAdventureEnd = `/Game/World_${adventureZone}/Quests/Quest_AdventureMode/Quest_AdventureMode_${adventureZone}.Quest_AdventureMode_${adventureZone}_C`;
            var adventureEnd = saveText.indexOf(strAdventureEnd) + strAdventureEnd.length;
            var advtext = saveText.substring(0, adventureEnd);
            var strAdventureStart = `/Game/World_${adventureZone}/Quests/Quest_AdventureMode/Quest_AdventureMode_${adventureZone}_0`;
            var adventureStart = advtext.lastIndexOf(strAdventureStart) + strAdventureStart.length;
            advtext = advtext.substring(adventureStart);
            WorldEvent.ProcessEvents(this, advtext, WorldEvent.ProcessMode.Adventure);
        }

        //this.SetMissingItems();
    }

    static GetCharactersFromSave(profileText, mode)
    {
        if (typeof mode === 'undefined') mode = this.CharacterProcessingMode.All;
        
        var charData = [];
        var profileData = profileText;
        var characters = profileData.split("/Game/Characters/Player/Base/Character_Master_Player.Character_Master_Player_C").filter( el => {
            return el !== "";
        });

        for (var i = 1; i < characters.length; i++)
        {
            var cd = new Character();
            cd.Archetype = "Undefined";
            var archetypeMatch = characters[i-1].match(/\/Game\/_Core\/Archetypes\/([a-zA-Z_]+)/);
            if (archetypeMatch !== null)
            {
                archetypeMatch = archetypeMatch[1]; // capturing group
                cd.Archetype = archetypeMatch.split('_')[1];
            }
            var saveItems = [];
            var charEnd = "Character_Master_Player_C";
            var inventory = characters[i].substring(0, characters[i].indexOf(charEnd));

            var regexList = [
                /\/Items\/Weapons(\/[a-zA-Z0-9_]+)+\/[a-zA-Z0-9_]+/g,
                /\/Items\/Armor\/([a-zA-Z0-9_]+\/)?[a-zA-Z0-9_]+/g,
                /\/Items\/Trinkets\/(BandsOfCastorAndPollux\/)?[a-zA-Z0-9_]+/g,
                /\/Items\/Mods\/[a-zA-Z0-9_]+/g,
                /\/Items\/Traits\/[a-zA-Z0-9_]+/g,
                /\/Items\/QuestItems(\/[a-zA-Z0-9_]+)+\/[a-zA-Z0-9_]+/g,
                /\/Quests\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/g,
                /\/Player\/Emotes\/Emote_[a-zA-Z0-9]+/g
            ];

            regexList.forEach(regex => {
                var matches = inventory.match(regex);
                if(matches !== null)
                {
                    saveItems = saveItems.concat(matches);
                }
            });

            cd.Inventory = saveItems;
            cd.SetMissingItems();
            charData.push(cd);
        }

        return charData;
    }

    SetAllEvents(camEvents, advEvents)
    {
        this.CampaignEvents = camEvents;
        this.AdventureEvents = advEvents;
        this.UpdateMissingItems();
    }

    // updates events missing items and char missing items
    UpdateMissingItems()
    {
        WorldEvent.UpdateMissingItems(this);
        this.SetMissingItems();
    }

    // sets char missing items
    SetMissingItems()
    {
        var mItems = [];
        // TODO modify getter gameinfo ?
        for(const event in GameInfo.EventItem)
        {
            GameInfo.eventItem[event].forEach(item => {
                var itemKey = item.GetKey();
                if (!this.Inventory.includes(itemKey) && itemKey !== "")
                {
                    if (!mItems.some( i => i.itemKey === itemKey))
                    {
                        mItems.push(item);
                    }
                }
            });
        };

        mItems.sort( (a, b) => {
            var nameA = a.itemKey.toUpperCase(); // ignore upper and lowercase
            var nameB = b.itemKey.toUpperCase(); 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
        });

        this.missingItems = mItems;
    }

    LoadWorldData(saveText)
    {
        if (this.CampaignEvents.length == 0)
        {
            //try
            //{
                this.processSaveData(saveText);
           /* }
            catch (err)
            {
                console.log("Error loading world Data: ");
                console.log("\tCharacterData.LoadWorldData");
                console.log("\t"+err.message);

                if (err.message.includes("being used by another process"))
                {
                    console.log("Save file in use; waiting 0.5 seconds and retrying.");
                    setTimeout(function(){ 
                        this.LoadWorldData(saveText);
                    }, 500);
                }
            } */
        }
    }

    GetMissingItems()
    {
        return this.missingItems;
    }
}