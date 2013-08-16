var getIdByName = function(oreName) {
    return oreName.toLowerCase().replace(" ", "-");
}

var variationMultiplier = [1.05, 1.1];

var perfectRefiningValues = function(values, percentual) {
    var result = {};
    for (value in values) {
        var floatValue = values[value] * percentual;
        var pointValue = floatValue - parseInt(floatValue);
        if (pointValue >= .5) {
            floatValue = floatValue + 1;
        }
        result[value] = parseInt(floatValue);
    }
    return result;
};

var OreData = {
    "Veldspar": {
        "variations": ["Concentrated", "Dense"],
        "volume": 0.1,
        "unitsToRefine": 333,
        "typeId": 1230,
        "variationsTypeId": [17470, 17471],
        "refine": {
            "Isogen": 0, "Megacyte": 0, "Mexallon": 0, "Morphite": 0, "Nocxium": 0, "Pyerite": 0, "Tritanium": 1000, "Zydrine": 0
        }
    },
    "Scordite": {
        "variations": ["Condensed", "Massive"],
        "volume": 0.15,
        "unitsToRefine": 333,
        "refine": {
            "Isogen": 0, "Megacyte": 0, "Mexallon": 0, "Morphite": 0, "Nocxium": 0, "Pyerite": 416, "Tritanium": 833, "Zydrine": 0
        }
    },
    "Pyroxeres": {
        "variations": ["Solid", "Viscous"],
        "volume": 0.3,
        "unitsToRefine": 333,
        "refine": {
            "Isogen": 0, "Megacyte": 0, "Mexallon": 120, "Morphite": 0, "Nocxium": 11, "Pyerite": 59, "Tritanium": 844, "Zydrine": 0
        }
    },
    "Plagioclase": {
        "variations": ["Azure", "Rich"],
        "volume": 0.35,
        "unitsToRefine": 333,
        "refine": {
            "Isogen": 0, "Megacyte": 0, "Mexallon": 256, "Morphite": 0, "Nocxium": 0, "Pyerite": 512, "Tritanium": 256, "Zydrine": 0
        }
    },
    "Omber": {
        "variations": ["Silvery", "Golden"],
        "volume": 0.6,
        "unitsToRefine": 500,
        "refine": {
            "Isogen": 307, "Megacyte": 0, "Mexallon": 0, "Morphite": 0, "Nocxium": 0, "Pyerite": 123, "Tritanium": 307, "Zydrine": 0
        }
    },
    "Kernite": {
        "variations": ["Luminous", "Fiery"],
        "volume": 1.2,
        "unitsToRefine": 400,
        "refine": {
            "Isogen": 386, "Megacyte": 0, "Mexallon": 773, "Morphite": 0, "Nocxium": 0, "Pyerite": 0, "Tritanium": 386, "Zydrine": 0
        }
    },
    "Jaspet": {
        "variations": ["Pure", "Pristine"],
        "volume": 2.0,
        "unitsToRefine": 500,
        "refine": {
            "Isogen": 0, "Megacyte": 0, "Mexallon": 518, "Morphite": 0, "Nocxium": 259, "Pyerite": 437, "Tritanium": 259, "Zydrine": 8
        }
    },
    "Hemorphite": {
        "variations": ["Vivid", "Radiant"],
        "volume": 3.0,
        "unitsToRefine": 500,
        "refine": {
            "Isogen": 212, "Megacyte": 0, "Mexallon": 60, "Morphite": 0, "Nocxium": 424, "Pyerite": 260, "Tritanium": 650, "Zydrine": 28
        }
    },
    "Hedbergite": {
        "variations": ["Vitric", "Glazed"],
        "volume": 3.0,
        "unitsToRefine": 500,
        "refine": {
            "Isogen": 708, "Megacyte": 0, "Mexallon": 0, "Morphite": 0, "Nocxium": 354, "Pyerite": 290, "Tritanium": 0, "Zydrine": 32
        }
    },
    "Gneiss": {
        "variations": ["Iridescent", "Prismatic"],
        "volume": 5.0,
        "unitsToRefine": 400,
        "refine": {
            "Isogen": 700, "Megacyte": 0, "Mexallon": 3700, "Morphite": 0, "Nocxium": 0, "Pyerite": 0, "Tritanium": 3700, "Zydrine": 171
        }
    },
    "Dark Ochre": {
        "variations": ["Onyx", "Obisidian"],
        "volume": 8.0,
        "unitsToRefine": 400,
        "refine": {
            "Isogen": 0, "Megacyte": 0, "Mexallon": 0, "Morphite": 0, "Nocxium": 500, "Pyerite": 0, "Tritanium": 25500, "Zydrine": 250
        }
    },
    "Spodumain": {
        "variations": ["Bright", "Gleaming"],
        "volume": 16.0,
        "unitsToRefine": 250,
        "refine": {
            "Isogen": 0, "Megacyte": 140, "Mexallon": 0, "Morphite": 0, "Nocxium": 0, "Pyerite": 9000, "Tritanium": 71000, "Zydrine": 0
        }
    },
    "Crokite": {
        "variations": ["Sharp", "Crystaline"],
        "volume": 16.0,
        "unitsToRefine": 250,
        "refine": {
            "Isogen": 0, "Megacyte": 0, "Mexallon": 0, "Morphite": 0, "Nocxium": 331, "Pyerite": 0, "Tritanium": 38000, "Zydrine": 663
        }
    },
    "Bistot": {
        "variations": ["Triclinic", "Monoclinic"],
        "volume": 16.0,
        "unitsToRefine": 200,
        "refine": {
            "Isogen": 0, "Megacyte": 170, "Mexallon": 0, "Morphite": 0, "Nocxium": 0, "Pyerite": 12000, "Tritanium": 0, "Zydrine": 341
        }
    },
    "Arkonor": {
        "variations": ["Crimson", "Prime"],
        "volume": 16.0,
        "unitsToRefine": 200,
        "refine": {
            "Isogen": 0, "Megacyte": 333, "Mexallon": 0, "Morphite": 0, "Nocxium": 0, "Pyerite": 0, "Tritanium": 10000, "Zydrine": 166
        }
    },
    "Mercoxit": {
        "variations": ["Magma", "Vitreous"],
        "volume": 40.0,
        "unitsToRefine": 250,
        "refine": {
            "Isogen": 0, "Megacyte": 0, "Mexallon": 0, "Morphite": 530, "Nocxium": 0, "Pyerite": 0, "Tritanium": 0, "Zydrine": 0
        }
    }

};

function assembleOreName(name, group) {
    if (name != group) {
        var groupNames = group.split(' ');
        name = name + " " + groupNames[groupNames.length - 1];
    }
    return name
}

function createOre(name, group, variantionIndex) {
    var multiplier = 1;
    if (variantionIndex !== undefined) {
        multiplier = variationMultiplier[variantionIndex];
    }

    name = assembleOreName(name, group);

    return {
        "group": group,
        "groupId": getIdByName(group),
        "name": name,
        "id": getIdByName(name),
        "unitsToRefine": OreData[group].unitsToRefine,
        "volume": OreData[group].volume,
        "refining": perfectRefiningValues(OreData[group].refine, multiplier)
    };
}

function createOres(group) {
    var ores = [];
    ores.push(createOre(group, group));

    for (var i = 0; i < OreData[group].variations.length; i++) {
        var variation = OreData[group].variations[i];
        ores.push(createOre(variation, group, i));
    }
    return ores;
}

var Ores = function createAllOres() {
    var ores = {};
    for (ore in OreData) {
        var results = createOres(ore);
        for (var i = 0; i < results.length; i++) {
            ores[results[i].name] = results[i];
        }
    }

    return ores;
}();

var TypesIds = {
    "Isogen": 37,
    "Megacyte": 40,
    "Mexallon": 36,
    "Morphite": 11399,
    "Nocxium": 38,
    "Pyerite": 35,
    "Tritanium": 34,
    "Zydrine": 39,


    "Veldspar": 1230,
    "Concentrated Veldspar": 17470,
    "Dense Veldspar": 17471,

    "Scordite": 1228,
    "Condensed Scordite": 17463,
    "Massive Scordite": 17464,

    "Pyroxeres": 1224,
    "Solid Pyroxeres": 17459,
    "Viscous Pyroxeres": 17460,

    "Plagioclase": 18,
    "Azure Plagioclase": 17455,
    "Rich Plagioclase": 17456,

    "Omber": 1227,
    "Silvery Omber": 17867,
    "Golden Omber": 17868,

    "Kernite": 20,
    "Luminous Kernite": 17452,
    "Fiery Kernite": 17453,

    "Jaspet": 1226,
    "Pure Jaspet": 17448,
    "Pristine Jaspet": 17449,

    "Hemorphite": 1231,
    "Vivid Hemorphite": 17444,
    "Radiant Hemorphite": 17445,

    "Hedbergite": 21,
    "Vitric Hedbergite": 17440,
    "Glazed Hedbergite": 17441,

    "Gneiss": 1229,
    "Iridescent Gneiss": 17865,
    "Prismatic Gneiss": 17866,

    "Dark Ochre": 1232,
    "Onyx Ochre": 17436,
    "Obsidian Ochre": 17437,

    "Spodumain": 19,
    "Bright Spodumain": 17466,
    "Gleaming Spodumain": 17467,

    "Crokite": 1225,
    "Sharp Crokite": 17432,
    "Crystalline Crokite": 17433,

    "Bistot": 1223,
    "Triclinic Bistot": 17428,
    "Monoclinic Bistot": 17429,

    "Arkonor": 22,
    "Crimson Arkonor": 17425,
    "Prime Arkonor": 17426,

    "Mercoxit": 11396,
    "Magma Mercoxit": 17869,
    "Vitreous Mercoxit": 17870
};

var Prices = function() {
    var queryString = "";
    for (item in TypesIds) {
        queryString += "&typeid=" + TypesIds[item];
    }
    queryString = queryString.replace("&", "?");
    var url = "http://api.eve-central.com/api/marketstat" + queryString;
}();