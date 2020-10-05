var saveProfile = {}; // instance of SaveFile that contains player profile
var saveFiles = {}; // collection of SaveFile that contains saveX.sav parsed file
var saveChars = {}; // collection of Characters obtained with the uploaded save files
var currentCharNum; // currently selected char number
var currentTabId; // currently select tab id
var shownTableId; // id of the the displayed table
var searchedTables = {}; // tracks previous searches on tables to call the searchTable function only when necessary

function searchTable(searchStr) {
    if (searchStr !== "") {
        $(shownTableId).find('tbody > tr').each(function () {
            var tr = $(this);
            tr.toggle(tr.text().toLowerCase().includes(searchStr));
        });
    } else {
        // theoretically useless but maybe faster than above selector since it selects fewer rows (despite the expensive :hidden selector)
        $(shownTableId).find('tr:hidden').show();
    }
}


function handleSearch(searchStr) {
    searchStr = searchStr.toLowerCase();
    let wasSearched = searchedTables.hasOwnProperty(shownTableId);
    if ((!wasSearched && searchStr !== "") || (wasSearched && searchedTables[shownTableId] !== searchStr)) {
        searchTable(searchStr);
        searchedTables[shownTableId] = searchStr;
    }
}

function loadFile(file, modified) {
    return new Promise((resolve, reject) => {
        var fr = new FileReader();
        fr.onload = function (e) {
            path = file.name;
            text = e.target.result;
            var save = new SaveFile(path, text);
            if (save.saveType === SaveFile.SaveType.Profile) {
                saveProfile = save;
                modified.all = true;
                //resolve();
            } else if (save.saveType === SaveFile.SaveType.Save) {
                var saveNum = save.saveNumber
                saveFiles[saveNum] = save;
                modified[saveNum] = true;
                //resolve();
            } else {
                // we don't want to prevent other files from loading by immediately rejecting loadFiles global promise
                //reject(new Error(`Invalid save file for ${path}`));
                console.log(`Invalid save file for ${path}`);
            }
            resolve();
        };
        fr.readAsText(file);
    });
}

function loadFiles(o) {
    var modified = {};
    Promise.all([...o.files].map(file => {
        return loadFile(file, modified);
    }))
        /*.catch(error => {
            console.log(error);
        })*/
        .finally(() => {
            updateModified(modified);
        });
}

function updateModified(modified) {
    updateSaveChars();
    var charSelect = 0;
    if (!$.isEmptyObject(modified)) {
        if (modified.all) {
            updateAllTables();
        } else {
            var charNums = Object.keys(modified);
            charSelect = charNums[charNums.length - 1]
            charNums.forEach(charNum => {
                updateTable(charNum);
            });
        }
        populateSelect(charSelect);
        if ($('.tab-links.active').length == 0) {
            $('.tab-links').first().click();
        }
    }
}

function genAdventureTable(charIndex) {
    var events = saveChars[charIndex].AdventureEvents;
    if (!events.length == 0) {
        var id = "tab-adventure-char" + charIndex;
        $(id).remove();
        var table = $('<table id="' + id + '" class="piece-table adventure-mode"><thead><tr class="header-row"><th class="headerSort" role="columnheader button">Location</th><th class="headerSort" role="columnheader button">Event Type</th><th class="headerSort" role="columnheader button">Event Name</th><th class="headerSort" role="columnheader button">Missing Items</th></tr></thead><tbody></tbody><tfoot></tfoot></table>');
        var tbody = table.children('tbody');
        events.forEach(event => {
            html = "<tr><td>" + event.location + "</td><td>" + event.type + "</td><td>" + event.name + "</td><td>" + event.MissingItems + "</td></tr>";
            tbody.append(html);
        });
        $('#tab-adventure').children('.hidden-tables').append(table);
    }
}

function genCampaignTable(charIndex) {
    var events = saveChars[charIndex].CampaignEvents;
    if (!events.length == 0) {
        var id = "tab-campaign-char" + charIndex;
        $(id).remove();
        var table = $('<table id="' + id + '" class="piece-table campaign-mode"><thead><tr class="header-row"><th class="headerSort" role="columnheader button">Location</th><th class="headerSort" role="columnheader button">Event Type</th><th class="headerSort" role="columnheader button">Event Name</th><th class="headerSort" role="columnheader button">Missing Items</th></tr></thead><tbody></tbody><tfoot></tfoot></table>');
        var tbody = table.children('tbody');
        events.forEach(event => {
            html = "<tr><td>" + event.location + "</td><td>" + event.type + "</td><td>" + event.name + "</td><td>" + event.MissingItems + "</td></tr>";
            tbody.append(html);
        });
        $('#tab-campaign').children('.hidden-tables').append(table);
    }
}

function genMissingItemsTable(charIndex) {
    var mItems = saveChars[charIndex].GetMissingItems();
    if (!mItems.length == 0) {
        var id = "tab-missing-items-char" + charIndex;
        $(id).remove();
        var table = $('<table id="' + id + '" class="piece-table missing-items"><thead><tr class="header-row"><th class="headerSort" role="columnheader button">Name</th><th class="headerSort" role="columnheader button">Type</th><th class="headerSort" role="columnheader button">Mode</th><th class="headerSort" role="columnheader button">Notes</th></tr></thead><tbody></tbody><tfoot></tfoot></table>');
        var tbody = table.children('tbody');
        mItems.forEach(item => {
            html = "<tr><td>" + item.ItemName + "</td><td>" + item.ItemType + "</td><td>" + item.ItemMode + "</td><td>" + item.ItemNotes + "</td></tr>";
            tbody.append(html);
        });
        $('#tab-missing-items').children('.hidden-tables').append(table);
    }
}

function updateTable(charIndex) {
    genAdventureTable(charIndex);
    genCampaignTable(charIndex);
    genMissingItemsTable(charIndex);
}

function updateAllTables() {
    for (const charIndex in saveChars) {
        updateTable(charIndex);
    }
}

function populateSelect(indexSelect) {
    $('.custom-options').empty();
    for (var charNumber in saveChars) {
        var ch = saveChars[charNumber];
        var strCharNum = parseInt(charNumber) + 1;
        var charStr = ch.Archetype == "" ? "Character " + strCharNum : ch.ToString();
        var span = $('<span class="custom-option" data-value="' + charNumber + '">' + charStr + '</span>');
        span.click(function () {
            node = $(this);
            if (!node.hasClass('selected')) {
                node.parent().children('.custom-option.selected').removeClass('selected');
                node.addClass('selected');
                node.closest('.custom-select').find('.custom-select__trigger span').text(node.text());
                displayTables(node.data("value"));
            }
        });

        if (charNumber == indexSelect) {
            $('.custom-select__trigger span').text(charStr);
            span.addClass("selected");
        }
        $('.custom-options').append(span);
    }
    // display relevant tables on each tab
    displayTables(indexSelect);
}

function displayTables(charIndex) {
    currentCharNum = charIndex;
    if (typeof currentTabId !== 'undefined') {
        shownTableId = currentTabId + "-char" + currentCharNum;
        handleSearch($("#search-input").val()); // TODO change selector to cached var
    }
    // hide non selected char tables
    $(".shown-tables").children().each(function () {
        $(this).appendTo($(this).closest('.tab-content').children('.hidden-tables'));
    });
    // show selected char tables
    campId = $('#tab-campaign-char' + charIndex);
    advId = $('#tab-adventure-char' + charIndex);
    mItemsId = $('#tab-missing-items-char' + charIndex);

    if (campId.length == 0) {
        $('#tab-campaign > .error-message').show();
    } else {
        $('#tab-campaign > .error-message').hide();
        campId.appendTo('#tab-campaign > .shown-tables');
    }
    if (advId.length == 0) {
        $('#tab-adventure > .error-message').show();
    } else {
        $('#tab-adventure > .error-message').hide();
        advId.appendTo('#tab-adventure > .shown-tables');
    }

    if (mItemsId.length == 0) {
        $('#tab-missing-items > .error-message').show();
    } else {
        $('#tab-missing-items > .error-message').hide();
        mItemsId.appendTo('#tab-missing-items > .shown-tables');
    }

    // supposed to be faster than this ?
    //$('#tab-adventure > :not(#campChar'+charIndex+')').hide();
    //$('#tab-adventure > :not(#advChar'+charIndex+')').hide();
    //$('#tab-adventure > :not(#mitemsChar'+charIndex+')').hide();
}

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
    //console.log(saveChars);
}

function initDrop() {
    var $dropArea = $('#drop-area');
    $dropArea.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
    })
        .on('dragover dragenter', function () {
            $dropArea.addClass('is-dragover');
        })
        .on('dragleave dragend drop', function () {
            $dropArea.removeClass('is-dragover');
        })
        .on('drop', function (e) {
            files = e.originalEvent.dataTransfer.files;
            o = { files: files }
            loadFiles(o);
        });
}

function initTabs() {
    $('.tab-links').click((evt) => {
        target = $(evt.currentTarget);
        currentTabId = target.data("value");
        selectedTab = $(currentTabId);
        if (currentTabId === "#tab-credits" || selectedTab.children(".error-message").css('display') == 'block') { // :visible can't work here unless we check after selectedTab.show();
            $('.search-container').hide();
        } else if (typeof currentCharNum !== 'undefined') {
            shownTableId = currentTabId + "-char" + currentCharNum;
            handleSearch($("#search-input").val());
            $('.search-container').show();
        }
        $(".tab-content").hide();
        $(".tab-links").removeClass("active");
        selectedTab.show();
        target.addClass("active");
    });
}

function initSearchInput() {
    $('#search-input').keyup(function (e) {
        var text = e.target.value;
        handleSearch(text);
    })
}

function initSelect() {
    $('.custom-select-wrapper').click(function () {
        $('.custom-select').toggleClass('open');
    });

    window.addEventListener('click', function (e) {
        const select = document.querySelector('.custom-select')
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    });
}

$(document).ready(function () {
    initSelect();
    initDrop();
    initTabs()
    initSearchInput();
});


/* updateFilters = function (checked) {
    $('.filter').each((i, f) => {
        try {
            f.checked = checked
        }
        catch { }
    })

    if (checked) {
        document.getElementById('f-name').value = ""
    }
} */

/*
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
    filter = input.value.toLowerCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}*/