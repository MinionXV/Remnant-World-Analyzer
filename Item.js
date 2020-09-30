class Item
{
    static ItemMode = 
    {
        Normal: "Normal",
        Hardcore: "Hardcore",
        Survival: "Survival"
    };

    itemMode;
    itemKey;
    itemType;
    itemName;
    itemAltName;
    itemNotes;

    set ItemKey(value)
    {
        try
        {
            this.itemKey = value;
            this.itemType = "Uncategorized";
            this.itemName = this.itemKey.substring(this.itemKey.lastIndexOf('/') + 1);
            if (this.itemKey.includes("/Weapons/"))
            {
                this.itemType = "Weapon";
                if (this.itemName.includes("Mod_")) this.itemName = this.itemName.replace("/Weapons/", "/Mods/"); 
            }
            if (this.itemKey.includes("/Armor/") || this.itemKey.includes("TwistedMask"))
            {
                this.itemType = "Armor";
                if (this.itemKey.includes("TwistedMask")) this.itemName = "TwistedMask (Head)";
                else
                {
                    var parts = this.itemName.split('_');
                    this.itemName = parts[2] + " (" + parts[1] + ")";
                }
            }
            if (this.itemKey.includes("/Trinkets/") || this.itemKey.includes("BrabusPocketWatch")) this.itemType = "Trinket";
            if (this.itemKey.includes("/Mods/")) this.itemType = "Mod";
            if (this.itemKey.includes("/Traits/")) this.itemType = "Trait";
            if (this.itemKey.includes("/Emotes/")) this.itemType = "Emote";

            this.itemName = this.itemName.replace("Weapon_", "").replace("Root_", "").replace("Wasteland_", "").replace("Swamp_", "").replace("Pan_", "").replace("Atoll_", "").replace("Mod_", "").replace("Trinket_", "").replace("Trait_", "").replace("Quest_", "").replace("Emote_", "").replace("Rural_", "").replace("Snow_", "");
            if (!this.itemType === "Armor") this.itemName = Regex.replace(this.itemName, "([a-z])([A-Z])", "$1 $2");
        }
        catch (err)
        {
            this.itemName = value;
            console.log("Error processing item name "+ this.itemName +" : " + err.message);
        }

    }

    get ItemName()
    {
        if (typeof this.itemAltName !== 'undefined') return this.itemAltName;
        else if (typeof this.itemName !== 'undefined') return this.itemName;
        return ""; 
    }

    get ItemType()
    {
        if (typeof this.itemType !== 'undefined') return this.itemType;
        return "";
    }

    get ItemMode()
    {
        if (typeof this.itemMode !== 'undefined') return this.itemMode;
        return "";
    }

    get ItemNotes()
    {
        if (typeof this.itemNotes !== 'undefined') return this.itemNotes;
        return "";
    }

    constructor(key, mode) 
    {
        this.ItemKey = key;
        this.itemNotes = "";
        if (typeof mode !== 'undefined') this.itemMode = mode;
        else this.itemMode = Item.ItemMode.Normal;
    }

    GetKey(){
        return this.itemKey;
    }

    toString()
    {
        return this.itemType + ": " + this.itemName;
    }

    // equals ??? => voir implementation avec heritage, p-t pas utile
    // idem pour gethashcode
    // idem pour compareto
    
    

    
}