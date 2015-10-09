var $ = require('jquery');

function isCriticalKey(e) {
    return ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39))
}

export function maxLength($el, max) {
    if (max && !isNaN(max) && max > 0) {
        $el.keydown(function (e) {
            if (isCriticalKey(e)) { return; }

            if ($el.val().length >= max) {
                return false;
            }
        });
    }else {
        console.log("Max value not set: strict-input.js: maxLength()");
    }
}

export function minimumValue($el, min) {
    var isValid = true;

    clearError($el);

    if (Number($el.val()) < Number(min) || $el.val() === "") { 
        showError($el, "Value must be at least " + min);
        isValid = false;
    }

    return isValid;
}

export function numbersOnly($el) {
    $el.keydown(function (e) {
        if (isCriticalKey(e)) { return; }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}

export function clearError($input) { 
    $input.removeClass('invalid');
    $input.next('.error-message').remove();
}

export function clearErrors($form) {
    $form.find('.invalid').removeClass('invalid');
    $form.find('.error-message').remove();
}

function showError($el, msg) { 
    $el.addClass('invalid').after('<div class="error-message">' + msg + '</div>');
}

export function showErrors($form, data) {
    clearErrors($form);

    var errors = $.parseJSON(data).Error.Errors;

    for (var e = 0; e < errors.length; e++) {
        var name = errors[e].Key.replace('model.', '');

        if ($form.find('[name="' + name + '"]').length > 0) {
            showError($form.find('[name="' + name + '"]'), errors[e].Message);
        }else {
            $form.prepend('<div class="error-message">'+errors[e].Message+'</div>');
        }
    }
}