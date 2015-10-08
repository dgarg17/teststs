var Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('equal', function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if (lvalue != rvalue) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

Handlebars.registerHelper('removeSpecial', function (value) {
    var value = value.replace(/<\/?[^>]+(>|$)/g, "");
    return value.replace(/[^a-zA-Z0-9 ]/g, "");
});

/*Handlebars.registerHelper('hasMenu', function (menu, cssClass) {
    if (menu !== null && menu.length > 0) {
        return cssClass;
    } else {
        return "";
    }
});

Handlebars.registerHelper('grouped_each', function (every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});*/

Handlebars.registerHelper('group_column', function (columns, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        var every = Math.ceil(context.length / columns);
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});

/* Typeahead */
Handlebars.registerHelper("boldKeyword", function (name) {
    var keyword = $('#main-search').val().trim(),
        pattern = new RegExp(keyword, "i"),
        highlighted = name.replace(pattern, keyword),
        boldedName = name;

    if (name.match(pattern)) {
        var index = name.search(pattern);

        boldedName = name.substring(0, index) + "<b>" + name.substring(index, keyword.length + index) + "</b>" + name.substring(keyword.length + index, name.length);
    }
    return boldedName
});