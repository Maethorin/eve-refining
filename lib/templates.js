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
            '<td><span class="icon icon-info-sign"></span></td>',
        '</tr>'
    ]
};

var OreTemplate = {
    "render": function(data) {
        return this.html.join('')
        .replace(/\$\(volume\)/g, data.volume)
        .replace(/\$\(unitsToRefine\)/g, data.unitsToRefine)
        .replace(/\$\(id\)/g, data.id)
        .replace(/\$\(name\)/g, data.name)
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
                '<input type="text" class="ore-price text-right" id="$(id)-price" value="0.00" />',
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
            '<td><span class="icon icon-info-sign"></span></td>',
        '</tr>'
//        '<div id="$(id)-info">',
//            '<div class="col-lg-3"><span class="well well-sm">Volume: <span>$(volume)</span></div>',
//            '<div class="col-lg-3"><span class="well well-sm">Units to refine: <span>$(unitsToRefine)</span></div>',
//        '</div> ',

//        '<fieldset id="$(id)" class="ore" data-ore="$(name)" data-processing="0">',
//            '<legend>$(name)</legend>',
//            '<div class="row">',
//                '<div class="col-lg-11">',
//                    '<div class="col-lg-3"><span class="well well-sm">Volume: <span>$(volume)</span></div>',
//                    '<div class="col-lg-3"><span class="well well-sm">Units to refine: <span>$(unitsToRefine)</span></div>',
//                '</div>',
//                '<div class="close col-lg-1">',
//                    'X',
//                '</div>',
//            '</div>',
//            '<div class="row">',
//                '<div class="col-lg-3">',
//                    '<label class="control-label">$(name) Processing Skill</label>',
//                '</div>',
//                '<div class="col-lg-2">',
//                    '<label for="$(id)-quantity" class="control-label">Quantity</label>',
//                '</div>',
//                '<div class="col-lg-2">',
//                    '<label for="$(id)-price" class="control-label">Price</label>',
//                '</div>',
//                '<div class="col-lg-3">',
//                    '<label for="$(id)-total" class="control-label">Total</label>',
//                '</div>',
//                '<div class="col-lg-2">',
//                    '<label for="$(id)-rest" class="control-label">Not refined</label>',
//                '</div>',
//            '</div>',
//            '<div class="row">',
//                '<div class="col-lg-3">',
//                    '<div class="btn-group" data-toggle="buttons">',
//                        '<label class="btn btn-primary processing">',
//                            '<input type="radio" value="0">0',
//                        '</label>',
//                        '<label class="btn btn-primary processing"">',
//                            '<input type="radio" value="1">1',
//                        '</label>',
//                        '<label class="btn btn-primary processing"">',
//                            '<input type="radio" value="2">2',
//                        '</label>',
//                        '<label class="btn btn-primary processing"">',
//                            '<input type="radio" value="3">3',
//                        '</label>',
//                        '<label class="btn btn-primary processing"">',
//                            '<input type="radio" value="4">4',
//                        '</label>',
//                        '<label class="btn btn-primary processing"">',
//                            '<input type="radio" value="5">5',
//                        '</label>',
//                    '</div>',
//                '</div>',
//
//                '<div class="col-lg-2">',
//                    '<input type="text" class="form-control ore-quantity text-right" id="$(id)-quantity" value="$(unitsToRefine)" />',
//                '</div>',
//                '<div class="col-lg-2">',
//                    '<input type="text" class="form-control ore-price text-right" id="$(id)-price" value="0.0" />',
//                '</div>',
//                '<div class="col-lg-3">',
//                    '<input type="text" class="form-control text-right" id="$(id)-total" disabled />',
//                '</div>',
//                '<div class="col-lg-2">',
//                    '<input type="text" class="form-control ore-rest text-right" id="$(id)-rest" value="0" disabled />',
//                '</div>',
//            '</div>',
//            '<div id="$(id)-refine-result" class="row">',
//            '</div>',
//        '</fieldset>'
    ]
}