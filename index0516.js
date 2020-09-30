var saveProfile = {};
var saveFiles = {};
var saveChars = {};

function loadFile(o) {
    console.log(o);

    var fr = new FileReader();
    fr.onload = function (e) {
        path = o.files[0].name;
        text = e.target.result;
        var save = new SaveFile(path, text);
        var charSelect = 0;
        if (save.saveType === SaveFile.SaveType.Profile) {
            saveProfile = save;
            updateSaveChars();
            updateAllTables();
        } else if (save.saveType === SaveFile.SaveType.Save) {
            saveFiles[save.saveNumber] = save;
            charSelect = save.saveNumber
            updateSaveChars();
            updateTables(charSelect);
        }

        populateSelect(charSelect);
    };
    fr.readAsText(o.files[0]);
}

/*function generateTable(tableType, charIndex){
    if(tableType ==)
} */

function genAdventureTable(charIndex){
    var events = saveChars[charIndex].AdventureEvents;
    if (!events.length == 0){
        var id = "advChar"+charIndex;
        $("#"+id).remove();
        var table = $('<table id="'+ id +'" class="piece-table adventure-mode"><thead><tr class="header-row"><th class="headerSort" role="columnheader button">Location</th><th class="headerSort" role="columnheader button">Event Type</th><th class="headerSort" role="columnheader button">Event Name</th><th class="headerSort" role="columnheader button">Missing Items</th></tr></thead><tbody></tbody><tfoot></tfoot></table>');
        var tbody = table.children('tbody');
        events.forEach(event => {
            html = "<tr><td>" + event.location + "</td><td>" + event.type + "</td><td>" + event.name + "</td><td>" + event.MissingItems + "</td></tr>";
            tbody.append(html);
        });
        $('#tabAdventure > .hiddenTables').append(table);
    }
}

function genCampaignTable(charIndex){
    var events = saveChars[charIndex].CampaignEvents;
    if (!events.length == 0){
        var id = "campChar"+charIndex;
        $("#"+id).remove();
        var table = $('<table id="'+ id +'" class="piece-table campaign-mode"><thead><tr class="header-row"><th class="headerSort" role="columnheader button">Location</th><th class="headerSort" role="columnheader button">Event Type</th><th class="headerSort" role="columnheader button">Event Name</th><th class="headerSort" role="columnheader button">Missing Items</th></tr></thead><tbody></tbody><tfoot></tfoot></table>');
        var tbody = table.children('tbody');
        
        events.forEach(event => {
            html = "<tr><td>" + event.location + "</td><td>" + event.type + "</td><td>" + event.name + "</td><td>" + event.MissingItems + "</td></tr>";
            tbody.append(html);
        });
        $('#tabCampaign > .hiddenTables').append(table);
    }
}

function genMissingItemsTable(charIndex){
    var mItems = saveChars[charIndex].GetMissingItems();
    if (!mItems.length == 0){
        var id = "mitemsChar"+charIndex;
        $("#"+id).remove();
        var table = $('<table id="'+ id +'" class="piece-table missing-items"><thead><tr class="header-row"><th class="headerSort" role="columnheader button">Name</th><th class="headerSort" role="columnheader button">Type</th><th class="headerSort" role="columnheader button">Mode</th><th class="headerSort" role="columnheader button">Notes</th></tr></thead><tbody></tbody><tfoot></tfoot></table>');
        var tbody = table.children('tbody');
        mItems.forEach( item => {
            html = "<tr><td>" + item.ItemName + "</td><td>" + item.ItemType + "</td><td>" + item.ItemMode + "</td><td>" + item.ItemNotes + "</td></tr>";
            tbody.append(html);
        });
        $('#tabMissingItems > .hiddenTables').append(table);
    }
}

function updateTables(charIndex){
    genAdventureTable(charIndex);
    genCampaignTable(charIndex);
    genMissingItemsTable(charIndex);
}

function updateAllTables(){
    for(const charIndex in saveChars){
        updateTables(charIndex);
    }
}


function populateSelect(indexSelect) {
    $('.custom-options').empty();
    for(var charNumber in saveChars){
        var ch = saveChars[charNumber];
        var strCharNum = parseInt(charNumber) + 1;
        var charStr = ch.Archetype == "" ? "Character "+strCharNum : ch.ToString();
        var span = $('<span class="custom-option" data-value="'+charNumber+'">'+charStr+'</span>');
        span.click( function() {
            node = $(this);
            if (!node.hasClass('selected')) {
                node.parent().children('.custom-option.selected').removeClass('selected');
                node.addClass('selected');
                node.closest('.custom-select').find('.custom-select__trigger span').text(node.text());
                displayTables(node.data("value"));
            }
        });

        if(charNumber == indexSelect){
            $('.custom-select__trigger span').text(charStr);
            span.addClass( "selected" );
        }
        $('.custom-options').append(span);
    }
    // display relevant tables on each tab
    displayTables(indexSelect);
}

function displayTables(charIndex){
    // hide non selected char tables
    $(".shownTables").children().each(function(){
        $(this).appendTo($(this).closest('.tabcontent').children('.hiddenTables'));
    });
    // show selected char tables
    // if there is no corresponding id, the selector doesn't append anything

    campId = $('#campChar'+charIndex);
    advId = $('#advChar'+charIndex);
    mItemsId = $('#mitemsChar'+charIndex);

    if(campId.length == 0) {
        $('#tabCampaign > .errorMessage').show();
    } else {
        $('#tabCampaign > .errorMessage').hide();
        campId.appendTo('#tabCampaign > .shownTables');
    }
    if(advId.length == 0){
        $('#tabAdventure > .errorMessage').show();
    } else {
        $('#tabAdventure > .errorMessage').hide();
        advId.appendTo('#tabAdventure > .shownTables');
    }

    if(mItemsId.length == 0){
        $('#tabMissingItems > .errorMessage').show();
    } else {
        $('#tabMissingItems > .errorMessage').hide();
        mItemsId.appendTo('#tabMissingItems > .shownTables');
    }

    // supposed to be faster than this ?
    //$('#tabAdventure > :not(#campChar'+charIndex+')').hide();
    //$('#tabAdventure > :not(#advChar'+charIndex+')').hide();
    //$('#tabAdventure > :not(#mitemsChar'+charIndex+')').hide();
}

function initSelect() {
    $('.custom-select-wrapper').click(function () {
        $('.custom-select').toggleClass('open');
    });

    for (const option of $(".custom-option")) {
        $(option).click(function () {
            node = $(this);
            if (!node.hasClass('selected')) {
                node.parent().children('.custom-option.selected').removeClass('selected');
                node.addClass('selected');
                node.closest('.custom-select').find('.custom-select__trigger span').text(node.text());
                displayTables(node.data("value"));
            }
        });
        /*option.addEventListener('click', function () {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent; 
            }
        }); */
    }

    window.addEventListener('click', function (e) {
        const select = document.querySelector('.custom-select')
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    });
}

/*
function populateTable(worldMode, selectedChar) {
    $(worldMode).empty();
    events = worldMode === "#adventure" ? saveChars[selectedChar].AdventureEvents : saveChars[selectedChar].CampaignEvents;

    //This populates the table for data to be pulled

    events.forEach(event => {
        html = "<tr><td>" + event.location + "</td><td>" + event.type + "</td><td>" + event.name + "</td><td>" + event.MissingItems + "</td></tr>"
        $(worldMode).append(html);
    });

    /*if (zone != undefined && eventType != undefined && eventName != undefined) {

        if (zones[zone][eventType] != undefined) {
            if (zones[zone][eventType].search(eventName) == -1) {
                zones[zone][eventType] += ", " + eventName

                if (worldMode == "#adventure") {
                    mainLocationText = ''
                } else {
                    mainLocationText = currentMainLocation.split(/(?=[A-Z])/).join(' ') + ": "
                }
                html = "<tr><td>" + zone + ": " + mainLocationText + currentSublocation.split(/(?=[A-Z])/).join(' ') +  "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"
            }
        } else {
            zones[zone][eventType] = eventName

                if (worldMode == "#adventure") {
                    mainLocationText = ''
                } else {
                    mainLocationText = currentMainLocation.split(/(?=[A-Z])/).join(' ') + ": "
                }

                html = "<tr><td>" + zone + ": " + mainLocationText + currentSublocation.split(/(?=[A-Z])/).join(' ') +  "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"
        }
        $(worldMode).append(html)
    } */
 /*   $('#filters').show();
    $('.adventure-mode').show();
    $('.campaign-mode').show();
} */

function updateSaveChars() {
    if (!$.isEmptyObject(saveProfile)) {
        for (var i = 0; i < saveProfile.saveChars.length; i++) {
            saveChars[i] = saveProfile.saveChars[i];
        }
        //saveChars = saveProfile.saveChars;
        if (!$.isEmptyObject(saveFiles)) {
            for (var saveNumber in saveFiles) {
                ch = saveFiles[saveNumber].saveChars[0];
                saveChars[saveNumber].SetAllEvents(ch.CampaignEvents, ch.AdventureEvents);
            }
        }
    } else if (!$.isEmptyObject(saveFiles)) {
        saveChars = [];
        for (var saveNumber in saveFiles) {
            saveChars[saveNumber] = saveFiles[saveNumber].saveChars[0]
        }
    }
    console.log(saveChars);
}

function clearElement(el){
    while (el.firstChild) {
        el.firstChild.remove();
    }
}

updateFilters = function (checked) {
    $('.filter').each((i, f) => {
        try {
            f.checked = checked
        }
        catch { }
    })

    if (checked) {
        document.getElementById('f-name').value = ""
    }
}

function showDataFile(e, o) {
    $('tr:not(.header-row)').remove()

    updateFilters(true)
    text = e.target.result

    filesLoaded++;
    if (filesLoaded == 1) {
        saveChars = Character.GetCharactersFromSave(text);
        console.log(saveChars);
    } else {
        saveChars[0].LoadWorldData(text);
        console.log(saveChars[0]);
    }



    /*text = text.split("/Game/Campaign_Main/Quest_Campaign_Ward13.Quest_Campaign_Ward13")[0]
    text = text.split("/Game/Campaign_Main/Quest_Campaign_City.Quest_Campaign_City")[0].replace(/Game/g,"\n") // modified 0 => 1

    textArray = text.split("\n")

   adText = e.target.result

   adText = adText.split("\n")
   tempList = []
   for(i = 0; i < adText.length; i++)
   {
     if (String(adText[i]).includes('Adventure') === true)
     {
       tempList.push(adText[i])
     }
   }
   adText = tempList[1]
    if (adText != undefined) {
        adventureMode = true
        adText = adText.replace(/Game/g,"\n")
        adTextArray = adText.split("\n")
    } else {
        adventureMode = false
    }

    if (adventureMode) {
        getWorldData(adTextArray, "#adventure")
    }
    getWorldData(textArray, "#main")

    $('.main-mode').show()
    $('.adventure-mode').hide()
    $('#toggle-adv').text("Show Adventure Mode") */
}

updateTable = function () {
    $('tr:not(.header-row)').hide()

    //Type
    if (document.getElementById('f-items').checked) {
        $('td').each(function () {
            if ($(this).text().search('Item Drop') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-sidedgs').checked) {
        $('td').each(function () {
            if ($(this).text().search('Side Dungeon') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-sieges').checked) {
        $('td').each(function () {
            if ($(this).text().search('Siege') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-poi').checked) {
        $('td').each(function () {
            if ($(this).text().search('Point of Interest') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-minibosses').checked) {
        $('td').each(function () {
            if ($(this).text().search('Miniboss') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-bosses').checked) {
        $('td').each(function () {
            if ($(this).text().search('World Boss') != -1) {
                $(this).parent().show()
            }
        })
    }

    //Regions
    earth = document.getElementById('f-earth').checked
    rhom = document.getElementById('f-rhom').checked
    corsus = document.getElementById('f-corsus').checked
    yaesha = document.getElementById('f-yaesha').checked
    $('td').each(function () {
        if (
            ($(this).text().search('Earth') != -1 && !earth) ||
            ($(this).text().search('Rhom') != -1 && !rhom) ||
            ($(this).text().search('Corsus') != -1 && !corsus) ||
            ($(this).text().search('Yaesha') != -1 && !yaesha)) {
            $(this).parent().hide()
        }
    })

    //Name filter
    name = document.getElementById('f-name').value
    if (name.length > 0) {
        jQuery('tr:not(.header-row)').each(function () {
            if ($(this).find('td:eq(2)').text().toLowerCase().search(name.toLowerCase()) == -1) {
                $(this).hide()
            }
        })
    }
}

function searchTable() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function openTab(evt, tabName) {
    $(".tabcontent").hide();
    $(".tablinks").removeClass("active");
    $(tabName).show();
    $(evt.currentTarget).addClass("active");
}

function initDrop(){
    var $dropArea = $('#drop-area');
    $dropArea.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    })
    .on('dragover dragenter', function() {
        $dropArea.addClass('is-dragover');
    })
    .on('dragleave dragend drop', function() {
        $dropArea.removeClass('is-dragover');
    })
    .on('drop', function(e) {
        console.log(e);
        files = e.originalEvent.dataTransfer.files;
        o = { files: files }
        loadFile(o);
    });
}

$(document).ready(function () {
    initSelect();
    initDrop();
    
    /*$('#apply').on('click', updateTable);


    $('#toggle-adv').on('click', function () {
        $('.main-mode, .adventure-mode').toggle()
        if ($(this).text() == "Show Adventure Mode") {
            $(this).text("Show Campaign Mode")
        } else {
            $(this).text("Show Adventure Mode")
        }
    }) */

    /* dropArea = document.getElementById('drop-area');
    dropArea.addEventListener('dragenter', preventDefaults, false);
    dropArea.addEventListener('dragenter', highlight, false);
    dropArea.addEventListener('dragover', preventDefaults, false);
    dropArea.addEventListener('dragover', highlight, false);
    dropArea.addEventListener('dragleave', preventDefaults, false);
    dropArea.addEventListener('dragleave', unhighlight, false);
    dropArea.addEventListener('drop', preventDefaults, false);
    dropArea.addEventListener('drop', unhighlight, false);
    dropArea.addEventListener('drop', handleDrop, false); */

});
