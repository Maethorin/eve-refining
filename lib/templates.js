var MineralTemplate = {
    "render": function(data) {
        return this.html.join('')
                .replace(/\$\(mineral\)/g, data.mineral)
                .replace(/\$\(quantity\)/g, $.formatNumber(data.refined, formatNumberNoDecimal))
                .replace(/\$\(price\)/g, $.formatNumber(data.price, formatNumber))
                .replace(/\$\(totalVolume\)/g, data.totalVolume)
                .replace(/\$\(total\)/g, $.formatNumber(data.total, formatNumber))
                .replace(/\$\(id\)/g, data.mineral.toLowerCase());
    },
    "addHead": function($container) {
        $container.append(this.headHtml.join(''));
    },
    "headHtml": [
        '<tr>',
            '<th>Name</th>',
            '<th>Quantity</th>',
            '<th>Price</th>',
            '<th>Total</th>',
            '<th>Volume</th>',
            '<th>&nbsp;</th>',
        '</tr>'
    ],
    "html": [
        '<tr id="tr-$(id)" class="mineral" data-mineral="$(mineral)">',
            '<td>$(mineral)</td>',
            '<td>',
                '<input type="text" class="mineral-quantity text-right" id="$(id)-quantity" value="$(quantity)" disabled />',
            '</td>',
            '<td>',
                '<input type="text" class="mineral-price text-right" id="$(id)-price" value="$(price)" />',
            '</td>',
            '<td>',
                '<input type="text" class="mineral-total text-right" id="$(id)-total" value="$(total)" disabled />',
            '</td>',
            '<td>',
                '<input type="text" class="mineral-volume text-right" id="$(id)-volume" value="$(totalVolume)" disabled />',
            '</td>',
            '<td><span class="icon icon-info"></span></td>',
        '</tr>'
    ]
};

var ProcessingSkillTemplate = {
    "render": function(data) {
        return this.html.join('')
        .replace(/\$\(name\)/g, data.group)
        .replace(/\$\(id\)/g, data.groupId);
    },
    "html": [
        '<div>',
            '<div class="col-6">$(name)</div>',
            '<div class="btn-group col-6 text-right" data-group="$(name)" data-toggle="buttons" id="$(id)-processing">',
                '<label class="btn processing">',
                    '<input type="radio" value="0"><span class="icon-remove"></span>',
                '</label>',
                '<label class="btn processing"">',
                    '<input type="radio" value="1">&nbsp;',
                '</label>',
                '<label class="btn processing"">',
                    '<input type="radio" value="2">&nbsp;',
                '</label>',
                '<label class="btn processing"">',
                    '<input type="radio" value="3">&nbsp;',
                '</label>',
                '<label class="btn processing"">',
                    '<input type="radio" value="4">&nbsp;',
                '</label>',
                '<label class="btn processing"">',
                    '<input type="radio" value="5">&nbsp;',
                '</label>',
            '</div>',
        '</div>'
    ]
};

var OreTemplate = {
    "render": function(data) {
        return this.html.join('')
        .replace(/\$\(volume\)/g, data.volume)
        .replace(/\$\(unitsToRefine\)/g, data.unitsToRefine)
        .replace(/\$\(id\)/g, data.id)
        .replace(/\$\(name\)/g, data.name)
        .replace(/\$\(price\)/g, $.formatNumber(Prices[data.name], formatNumber))
        .replace(/\$\(totalVolume\)/g, $.formatNumber(data.totalVolume, formatNumberNoDecimal));
    },
    "html": [
        '<tr id="tr-$(id)" class="ore" data-ore="$(name)" data-processing="0">',
            '<td><span class="icon icon-remove remove-ore"></span></td>',
            '<td>$(name)</td>',
            '<td>',
                '<input type="text" class="ore-quantity text-right" id="$(id)-quantity" value="$(unitsToRefine)" />',
            '</td>',
            '<td>',
                '<input type="text" class="ore-price text-right" id="$(id)-price" value="$(price)" />',
            '</td>',
            '<td>',
                '<input type="text" class="ore-total text-right" id="$(id)-total" value="0.00" disabled />',
            '</td>',
            '<td>',
                '<input type="text" class="ore-volume text-right" id="$(id)-volume" value="$(totalVolume)" disabled />',
            '</td>',
            '<td>',
                '<input type="text" class="ore-rest text-right" id="$(id)-rest" value="0" disabled />',
            '</td>',
            '<td><span class="icon icon-info"></span></td>',
        '</tr>'
    ]
};