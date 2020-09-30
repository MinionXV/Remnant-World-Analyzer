class GameInfo
{
    static zones = [];
    static events = {};
    static eventItem = {};
    static subLocations = {};
    static mainLocations = {};
    
    static get Events()
    {
        if ($.isEmptyObject(this.events))
        {
            this.RefreshGameInfo();
        }
        return this.events;
    }

    static get EventItem()
    {
        if ($.isEmptyObject(this.eventItem))
        {
            this.RefreshGameInfo();
        }
        return this.eventItem;
    }

    static get Zones()
    {
        if (this.zones.length == 0)
        {
            this.RefreshGameInfo();
        }
        return this.zones;
    }

    static get SubLocations()
    {
        if ($.isEmptyObject(this.subLocations))
        {
            this.RefreshGameInfo();
        }
        return this.subLocations;
    }

    static get MainLocations()
    {
        if ($.isEmptyObject(this.mainLocations))
        {
            this.RefreshGameInfo();
        }
        return this.mainLocations;
    }

    constructor()
    {
        this.zones = [];
        this.events = {};
        this.eventItem = {};
        this.subLocations = {};
        this.mainLocations = {};
    }

    static RefreshGameInfo()
    {
        /*this.zones = [];
        this.events = [];
        this.eventItem = [];
        this.subLocations = [];
        this.mainLocations = [];
        eventName;
        altEventName;
        itemMode;
        itemNotes;
        itemAltName;
        eventItems; */
        
        this.zones = db.Zones;
        this.events = db.Events;
        this.subLocations = db.SubLocations;
        this.mainLocations = db.MainLocations

        for (const event in db.EventItems){
            var dbItems = db.EventItems[event];
            var items = dbItems.map( dbItem => {
                var item = new Item(dbItem.text, dbItem.mode);
                item.itemNotes = dbItem.notes;
                item.itemAltName = dbItem.altname;
                return item;
            });
            this.eventItem[event] = items;
        };
    }

}