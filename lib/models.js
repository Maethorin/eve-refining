var getOreId = function(oreName) {
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

function createOre(name, group, variantionIndex) {
    var multiplier = 1;
    if (variantionIndex !== undefined) {
        multiplier = variationMultiplier[variantionIndex];
    }

    if (name != group) {
        var klassNames = group.split(' ');
        name = name + " " + klassNames[klassNames.length - 1];
    }

    return {
        "group": group,
        "name": name,
        "id": getOreId(name),
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
