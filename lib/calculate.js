var formatNumber = {format:"#,###.00", locale:"us"};
var formatNumberNoDecimal = {format:"#,###", locale:"us"};
var $selectedOres = $("#selected-ores");
var $refineResult = $("#refining-result");

var Formulae = {
    "eficciency": function(refining, refineryEfficiency, ore) {
        var result = 0.375
            * (1 + (0.02 * refining))
            * (1 + (0.04 * refineryEfficiency))
            * (1 + (0.05 * ore));
        return Math.round(result * 10000) / 10000
     },
    "stationTax": function(stationStanding) {
        var result = (0.05 * (6.6667 - stationStanding)) / 6.6667
        if (result < 0) {
            result = 0;
        }
        return result
    },
    "mineralYield": function(efficiency) {
        var result = ActualData.baseYield + efficiency;
        if (result > 1) {
            return 1;
        }
        return result;
    },
    "oreRefine": function(ore, mineral, mineralEfficiency, quantity) {
        if (!quantity || quantity==0 || quantity=="0") {
            quantity = ore.unitsToRefine;
        }
        if (quantity < ore.unitsToRefine) {
            return 0;
        }
        var mineralYield = this.mineralYield(mineralEfficiency);
        var units = parseInt(quantity / ore.unitsToRefine);
        var toRefine = units * ore.refining[mineral];
        var refineResult = parseInt(this.round(toRefine * mineralYield));
        var stationTax = parseInt(this.round(refineResult * ActualData.stationTax));
        return refineResult - stationTax;
    },
    "round": function(floatValue) {
        var pointValue = floatValue - parseInt(floatValue);
        if (pointValue > .5) {
            floatValue = floatValue + 1;
        }
        return floatValue
    }
};

var ActualData = {
    "baseYield": 0.5,
    "stationTax": 0.0,
    "stationStandings": 6.67,
    "refining": 0,
    "refineryEfficiency": 0,
    "ore": 0,
    "yield": 0.875,
    "refiningResult": {},
    "updateYield": function() {
        var result = this.baseYield + Formulae.eficciency(this.refining, this.refineryEfficiency, this.ore);
        if (result > 1) {
            result = 1;
        }
        ActualData.yield = result;
        this.setValues();
    },
    "updateStationTax": function() {
        this.stationTax = Formulae.stationTax(this.stationStandings);
        this.setValues();
    },
    "setValues": function() {
        $("#total").val((this.yield * 100).toFixed(2));
        $("#station-tax").val((this.stationTax * 100).toFixed(2));
        $("#base-yield").val((this.baseYield * 100).toFixed(2));
        updateAllOreRefines();
    }
};

function fillSkillLevels($parent, value) {
    for (var i = 1; i <= 5; i++) {
        $parent.find("label").eq(i).removeClass("filled");
    }
    for (var i = 1; i <= value; i++) {
        $parent.find("label").eq(i).addClass("filled");
    }
}

$(".refining").click(function() {
    var $this = $(this);
    ActualData.refining = $this.find("input").val();
    ActualData.updateYield();
    fillSkillLevels($this.parent(), ActualData.refining)
});

$(".refinery").click(function() {
    var $this = $(this);
    ActualData.refineryEfficiency = $this.find("input").val();
    ActualData.updateYield();
    fillSkillLevels($this.parent(), ActualData.refineryEfficiency)
});

function updateBaseYield() {
    var value = $("#base-yield").val();
    ActualData.baseYield = value / 100;
    ActualData.updateYield();
}

var $yield = $(".yield");

$yield.on("change", "#base-yield", function() {
    updateBaseYield();
});


$yield.on("change", "#station-standings", function(e) {
    if (e.keyCode == 13) {
        updateBaseYield();
    }
});

function updateWeTake() {
    ActualData.stationStandings = $("#station-standings").val();
    ActualData.updateStationTax();
}

$yield.on("keypress", "#station-standings", function(e) {
    if (e.keyCode == 13) {
        updateWeTake();
    }
});

$yield.on("change", "#station-standings", function() {
    updateWeTake();
});

for (ore in OreData) {
    var $li = $('<li role="presentation"><a role="menuitem" tabindex="-1" href="#"></a></li>');
    $li.find('a').text(ore);
    $li.appendTo($("#group-list"));
}

$("#group-list").on("click", "li", function() {
    $("#ore-list").empty();
    var group = $(this).find('a').text();
    $(this).parents('.btn-group').eq(0).find(".button-title").text(group);
    $("#ore-list").parents('.btn-group').eq(0).find(".button-title").text("Select an Ore");
    for (ore in Ores) {
        if (Ores[ore].group == group) {
            var $li = $('<li role="presentation"><a role="menuitem" tabindex="-1" href="#"></a></li>');
            $li.find('a').text(ore);
            $li.appendTo($("#ore-list"));
        }
    }
});

$("#ore-list").on("click", "li", function() {
    var oreName = $(this).find('a').text();
    $(this).parents('.btn-group').eq(0).find(".button-title").text(oreName);
    addOre(oreName)
});

function getOreName($element) {
    return $element.parents("tr.ore").data("ore");
}

function addOre(oreName) {
    var selectedOre = Ores[oreName];
    $("#select-ore").val("");
    if ($selectedOres.find("#tr-" + selectedOre.id).length > 0) {
        return false;
    }
    selectedOre.totalVolume = selectedOre.unitsToRefine * selectedOre.volume;

    $selectedOres.append(OreTemplate.render(selectedOre));
    updateOreRefine(oreName);
}

function getOreProcessingSkill(oreId) {
    var $input = $("tr#" + oreId).find(".btn-group .active input");
    var oreProcessing = 0;
    if ($input.length > 0) {
        oreProcessing = $input.val();
    }
    return oreProcessing;
}

function updateRefinedMineral(ore, oreYield, oreUnits) {
    var refiningResult = {};
    for (mineral in ore.refining) {
        var refined = Formulae.oreRefine(ore, mineral, oreYield, oreUnits);
        if (refined > 0) {
            refiningResult[mineral] = refined;
        }
    }
    ActualData.refiningResult[ore.name] = refiningResult;
    updateRefinedResultTable();
}

function updateRefinedResultTable() {
    $refineResult.empty();
    MineralTemplate.addHead($refineResult);
    var refined = {};
    for (ore in ActualData.refiningResult) {
        for (mineral in ActualData.refiningResult[ore]) {
            var actual = refined[mineral] ? refined[mineral] : 0;
            refined[mineral] = ActualData.refiningResult[ore][mineral] + actual;
        }
    }
    var mineralNames = [];
    for (mineral in refined) {
        mineralNames.push(mineral);
    }
    mineralNames.sort();
    for (var i=0; i < mineralNames.length; i++) {
        $refineResult.append(MineralTemplate.render({
            "mineral": mineralNames[i],
            "refined": refined[mineralNames[i]],
            "totalVolume": 0
        }));
    }
}

function updateOreRefine(oreName, oreProcessing) {
    var ore = Ores[oreName];
    if (!oreProcessing) {
        oreProcessing = getOreProcessingSkill(ore.id);
    }
    var oreYield = Formulae.eficciency(ActualData.refining, ActualData.refineryEfficiency, oreProcessing);
    var oreUnits = $.parseNumber($("#" + ore.id + "-quantity").val(), formatNumberNoDecimal);
    var price = $.parseNumber($("#" + ore.id + "-price").val(), formatNumber);
    var units = parseInt(oreUnits / ore.unitsToRefine);
    $("#" + ore.id + "-rest").val(oreUnits - (units * ore.unitsToRefine));
    $("#" + ore.id + "-total").val($.formatNumber((oreUnits * price), formatNumber));
    $("#" + ore.id + "-volume").val($.formatNumber((oreUnits * ore.volume), formatNumber));
    updateRefinedMineral(ore, oreYield, oreUnits);
}

$selectedOres.on("click", ".remove-ore", function() {
    var oreName = getOreName($(this));
    var oreId = getOreId(oreName);
    $("#tr-" + oreId).remove();
    updateAllOreRefines();
});

$selectedOres.on("click", ".processing", function() {
    var oreName = getOreName($(this));
    updateOreRefine(oreName, $(this).find("input").val());
});

$selectedOres.on("keypress", ".ore-quantity", function(e) {
    if (e.keyCode == 13) {
        var oreName = getOreName($(this));
        updateOreRefine(oreName);
    }
});

$selectedOres.on("keypress", ".ore-price", function(e) {
    if (e.keyCode == 13) {
        var oreName = getOreName($(this));
        updateOreRefine(oreName);
    }
});

$selectedOres.on("change", ".ore-quantity", function(e) {
    var oreName = getOreName($(this));
    updateOreRefine(oreName);
});

$selectedOres.on("change", ".ore-price", function(e) {
    var oreName = getOreName($(this));
    updateOreRefine(oreName);
});

$selectedOres.on("focus", ".ore-quantity", function(e) {
    var formated = $(this).val();
    var number = $.parseNumber(formated, formatNumberNoDecimal);
    $(this).val(number)
});

$selectedOres.on("blur", ".ore-quantity", function(e) {
    var number = $(this).val();
    var formated = $.formatNumber(number, formatNumberNoDecimal);
    $(this).val(formated);
});

$selectedOres.on("focus", ".ore-price", function(e) {
    var formated = $(this).val();
    var number = $.parseNumber(formated, formatNumber);
    $(this).val(number)
});

$selectedOres.on("blur", ".ore-price", function(e) {
    var number = $(this).val();
    var formated = $.formatNumber(number, formatNumber);
    $(this).val(formated);
});

function updateAllOreRefines() {
    ActualData.refiningResult = {};
    $("#selected-ores").find("tr.ore").each(function() {
        var oreName = $(this).data("ore");
        updateOreRefine(oreName)
    });
}

function updateMineralTotal($input) {
    var $quantity = $("#" + $input.attr("id").replace("price", "quantity"));
    var $total = $("#" + $input.attr("id").replace("price", "total"));
    var total = $quantity.val() * $input.val();
    $total.val($.formatNumber(total, formatNumber));
}

function updateMineralsTotal() {

}

$selectedOres.on("change", ".mineral-price", function() {
    var $this = $(this);
    updateMineralTotal($this);
    updateMineralsTotal();
});