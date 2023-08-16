export const otpdesigner = function (options = {}, ...args) {

    const optInputId = "opt_input_";
    let results = [];

    // noinspection JSUnusedGlobalSymbols
    const methods = {
        code: function (results, data) {
            let code = $('#otp_hidden_' + data.idSuffix).val();
            if (isDefined(code)) code = code.trim();
            else code = "";
            results.push({
                done: code.length === data.settings.length,
                code: code
            });
            return results;
        },
        set: function (results, data, args) {
            let code = args[0];
            if (isDefined(code)) code = code.trim();
            else code = "";
            if (code.length === data.settings.length) {
                for (let i = 0; i < code.length; i++) {
                    $('#'+optInputId + (i) + "_" + data.idSuffix).trigger('otp-written', [code[i]]);
                }
                collectOtpCode(data);
            }
            return results;
        },
        focus: function (results, data) {
            $('#'+optInputId + (data.settings.length - 1) + "_" + data.idSuffix).otpdesigner__toggleFocus__(true);
            return results;
        },
        hiddenInput: function (results, data) {
            results.push($('#otp_hidden_' + data.idSuffix));
            return results;
        }
    };

    $(this).each(function() {
        let data = $(this).data('otpdesigner');
        let idSuffix = Math.floor((Math.random() * 1000) + 100);
        if (!data) {
            let settings = $.extend(
                {
                    length: 6,
                    onlyNumbers: false,
                    inputsClasses: '',
                    inputsParentClasses: '',
                    enterClicked: null,
                    typingDone : null
                },
                options
            );
            let $parent = $(this);
            if (isDefined($(this).attr('data-otp-length'))) {
                settings.length = parseInt($(this).attr('data-otp-length'));
            }
            if (isDefined($(this).attr('data-otp-onlynumbers'))) {
                settings.onlyNumbers = stringToBool($(this).attr('data-otp-onlynumbers'));
            }
            if (isDefined($(this).attr('data-inputs-classes'))) {
                settings.inputsClasses = $(this).attr('data-inputs-classes');
            }
            if (isDefined($(this).attr('data-inputs-parent-classes'))) {
                settings.inputsParentClasses = $(this).attr('data-inputs-parent-classes');
            }

            data = {
                idSuffix: idSuffix,
                settings: settings
            };
            //save the settings of the element
            $(this).data('otpdesigner', data);
            $(this).attr('data-otpdesigner-id', idSuffix);

            let $fakeInputsParent = $('<div class="fake-inputs d-flex flex-row justify-content-center mt-2">');
            $fakeInputsParent.attr('id', 'otp_' + idSuffix);
            if (settings.inputsParentClasses !== "") {
                $fakeInputsParent.addClass(settings.inputsParentClasses);
            }

            let $hiddenInput = $('<input type="hidden">');
            $hiddenInput.attr('id', 'otp_hidden_' + idSuffix);
            $hiddenInput.attr('name', 'otp_hidden_' + idSuffix);
            $hiddenInput.appendTo($parent);

            let $realInput = $('<textarea class="realInput" maxlength="2" tabindex="-1">-</textarea>');
            $realInput.attr('id', 'otp_real_' + idSuffix);
            $realInput.attr('name', 'otp_real_' + idSuffix);
            $realInput.appendTo($fakeInputsParent);
            $realInput.on('input', function () {
                let a = getRealInputValue(data);
                resetRealInput(data);
                getFocusedFakeInput(data).trigger('otp-written', [a]);
            });
            $realInput.on('keydown', function (e) {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Tab") {
                    e.preventDefault();
                    let focusedInp = getFocusedFakeInput(data);
                    let $inputs = $fakeInputsParent.find('.otp-fake-input');
                    let index = $inputs.index(focusedInp);
                    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        if (index > 0) $($inputs[index - 1]).otpdesigner__toggleFocus__(true);
                    }
                    else {
                        if (index < $inputs.length - 1) $($inputs[index + 1]).otpdesigner__toggleFocus__(true);
                    }
                }
            });
            $realInput.on('paste', (event) => {
                let pastedText = event.originalEvent.clipboardData.getData('text');
                event.preventDefault();
                let pastedTextParts = pastedText.split('');
                pastedTextParts = pastedTextParts.filter(function (value) {
                    return isAcceptedCharacter(value, settings.onlyNumbers);
                });
                pastedText = pastedTextParts.join('');
                if (pastedText.length >= settings.length) {
                    pastedText = pastedText.substring(0, settings.length);
                    $('[data-otpdesigner-id="' + data.idSuffix + '"]').otpdesigner('set', pastedText);
                }
            });

            for (let i = 0; i < settings.length; i++) {
                let $fakeInput = $('<div class="m-2 text-center form-control rounded otp-fake-input"><span class="otp-content"></span></div>');
                $fakeInput.attr('id', optInputId + (i) + "_" + idSuffix);
                $fakeInput[0].addEventListener('click', function () {
                    if (!$(this).otpdesigner__isFocused__()) {
                        $(this).otpdesigner__toggleFocus__(true);
                    }
                    else{
                        toggleRealInputFocus(this, true);
                    }
                });

                let type = "text";
                if (settings.type === 'numeric') {
                    type = "number";
                }
                if (settings.inputsClasses !== "") {
                    $fakeInput.addClass(settings.inputsClasses);
                }
                $fakeInput.appendTo($fakeInputsParent);
            }
            $fakeInputsParent.appendTo($parent);
            let $inputs = $fakeInputsParent.find('.otp-fake-input');
            $inputs.each(function (i) {
                $($inputs[i]).off('otp-written');
                $($inputs[i]).on("otp-written", function (event, value) {
                    if (value === "Backspace") {
                        $($inputs[i]).otpdesigner__fakeInputVal__("");
                        if (i !== 0) $($inputs[i - 1]).otpdesigner__toggleFocus__(true);
                    } else if (value === "Enter" && i === $inputs.length - 1 && $($inputs[i]).otpdesigner__fakeInputVal__() !== "") {
                        collectOtpCode(data, false);
                        if (settings.enterClicked != null) {
                            settings.enterClicked();
                        }
                        loseFocus(data);
                        return;
                    } else {
                        if (isAcceptedCharacter(value, settings.onlyNumbers)) {
                            value = value.toLowerCase();
                            $($inputs[i]).otpdesigner__fakeInputVal__(value);
                            if (i !== $inputs.length - 1) $($inputs[i + 1]).otpdesigner__toggleFocus__(true);
                        }
                    }
                    collectOtpCode(data, (i === $inputs.length - 1));
                });
                $($inputs[i]).off("focused");
                $($inputs[i]).on("focused", function () {
                    if (!!$($inputs[i]).data('f')) return;
                    for (let j = 0; j < i; j++) {
                        if ($($inputs[j]).otpdesigner__fakeInputVal__() === "") {
                            $($inputs[j]).data('f', "1");
                            $($inputs[j]).otpdesigner__toggleFocus__(true);
                            $($inputs[j]).removeData('f');
                            break;
                        }
                    }
                });
            });
        }
        else{
            if (typeof options === 'string' && typeof methods[options] !== 'undefined') {
                results = methods[options](results, data, [...args]);
            }
        }
    });
    return results.length > 1 ? results : (results.length === 0 ? null : results[0]);
}

let isDefined = (variable, notEmpty = true) => {
    return typeof variable !== 'undefined' && variable !== null && (typeof variable !== 'string' || !notEmpty || variable !== "");
}

let stringToBool = function (s) {
    return ['true', 'TRUE', '1'].includes(s.toString());
}

let collectOtpCode = (data, typingDone = true) => {
    let $inputs = $('#otp_' + data.idSuffix).find('.otp-fake-input');
    let code = '';
    $inputs.each(function (i, e) {
        code += $(e).otpdesigner__fakeInputVal__().trim();
    });
    $('#otp_hidden_' + data.idSuffix).val(code);
    if (code.length === $inputs.length && typingDone) {
        if (data.settings.typingDone != null) {
            data.settings.typingDone(code);
        }
        loseFocus(data);
    }
}

let loseFocus = (data) => {
    if (data.settings.enterClicked != null) return;
    $('.otpdesigner__focus__').otpdesigner__toggleFocus__(false);
};

$(document)[0].addEventListener('click', function(event) {
    let $target = $(event.target);
    let focused = $('.otp-fake-input');
    if(
        !$target.closest('.otp-fake-input').length &&
        focused.length !== 0 &&
        focused.is(":visible")
    ) {
        focused.otpdesigner__toggleFocus__(false)
    }
});

function onFakeInputFocused(ele) {
    toggleRealInputFocus(ele, true);
    $(ele).trigger('focused');
}

$.fn.otpdesigner__toggleFocus__ = function (toFocus = null) {
    $(this).each(function () {
        if (toFocus !== null) {
            if (toFocus === true) {
                $('.otpdesigner__focus__').removeClass('otpdesigner__focus__');
                $(this).addClass('otpdesigner__focus__');
                onFakeInputFocused(this);
            }
            else {
                $(this).removeClass('otpdesigner__focus__');
            }
            return;
        }
        if ($(this).hasClass('otpdesigner__focus__')) {
            $(this).removeClass('otpdesigner__focus__');
        }
        else {
            $('.otpdesigner__focus__').removeClass('otpdesigner__focus__');
            $(this).addClass('otpdesigner__focus__');
            onFakeInputFocused(this);
        }
    });
}

function getFocusedFakeInput(data) {
    return $('#otp_' + data.idSuffix).find('.otp-fake-input.otpdesigner__focus__');
}

$.fn.otpdesigner__isFocused__ = function () {
    return $(this).hasClass('otpdesigner__focus__');
}

$.fn.otpdesigner__fakeInputVal__ = function (val = "RETURN_REQUESTED") {
    if (val === "RETURN_REQUESTED") {
        return $(this).find('.otp-content').html();
    }
    $(this).find('.otp-content').html(val);
}

function toggleRealInputFocus(fakeInput, toFocus) {
    // noinspection JSCheckFunctionSignatures
    let $realInput = $(fakeInput).parents('.fake-inputs').find('.realInput');
    if (toFocus) {
        $realInput.focus();
        $realInput[0].setSelectionRange($realInput.val().length, $realInput.val().length);
    }
    else {
        $realInput.blur();
    }
}

function resetRealInput(data) {
    let $realInput = $('#otp_' + data.idSuffix).find('.realInput');
    $realInput.val("-");
    $realInput[0].setSelectionRange($realInput.val().length, $realInput.val().length);
}

function getRealInputValue(data) {
    let $realInput = $('#otp_' + data.idSuffix).find('.realInput');
    if ($realInput.val() === "") return "Backspace";
    else if ($realInput.val() === "-\n") return "Enter";
    return $realInput.val().substring(1);
}

const isAcceptedCharacter = (char, onlyNumbers) => {
    return (otpdesigner__alphabets__.includes(char) && !onlyNumbers) || otpdesigner__numbers__.includes(char);
};

const otpdesigner__alphabets__ = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
const otpdesigner__numbers__ = '0123456789'.split("");