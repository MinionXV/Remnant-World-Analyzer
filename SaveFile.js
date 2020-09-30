class SaveFile
{
    saveName;
    saveType;
    saveNumber;
    saveChars;

    static SaveType = 
    {
       Profile: "Profile",
       Save: "Save",
       Unknown: "Unknown"
    };

    constructor(savePath, text)
    {
        this.saveChars = [];
        this.saveName = savePath.split('\\').pop().split('/').pop();
        this.detectFileType(savePath);
        if(this.saveType === SaveFile.SaveType.Save)
        {
            var ch = new Character();
            ch.LoadWorldData(text);
            this.saveChars.push(ch);
        } else if(this.saveType === SaveFile.SaveType.Profile){
            this.saveChars = Character.GetCharactersFromSave(text);
        } else{
            // throw error
        }
    }

    detectFileType(path) {
        var match = path.match(/save_([0-9])/);
        if(match !== null) {
            this.saveNumber = match[1]; // capturing group
            this.saveType = SaveFile.SaveType.Save;
            //console.log("Save detected");
        }
        else{
            if(path.includes("profile")){
                this.saveType = SaveFile.SaveType.Profile;
                //console.log("Profile detected");
            } else {
                this.saveType = SaveFile.SaveType.Unknown;
                console.log("Unknow file type");
            }
        }
    }
}