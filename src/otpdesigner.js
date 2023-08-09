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
                    $('#'+optInputId + (i) + "_" + data.idSuffix).val(code[i]);
                }
                collectOtpCode(data);
            }
            return results;
        },
        focus: function (results, data) {
            $('#'+optInputId + (data.settings.length - 1) + "_" + data.idSuffix).focus();
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

            let $inputsParent = $('<div class="inputs d-flex flex-row justify-content-center mt-2">');
            $inputsParent.attr('id', 'otp_' + idSuffix);
            if (settings.inputsParentClasses !== "") {
                $inputsParent.addClass(settings.inputsParentClasses);
            }

            let $hiddenInput = $('<input type="hidden">');
            $hiddenInput.attr('id', 'otp_hidden_' + idSuffix);
            $hiddenInput.attr('name', 'otp_hidden_' + idSuffix);
            $hiddenInput.appendTo($parent);

            for (let i = 0; i < settings.length; i++) {
                let $input = $('<input class="m-2 text-center form-control rounded otp-input" maxlength="1" />');
                $input.attr('id', optInputId + (i) + "_" + idSuffix);
                let type = "text";
                if (settings.type === 'numeric') {
                    type = "number";
                }
                if (settings.inputsClasses !== "") {
                    $input.addClass(settings.inputsClasses);
                }
                $input.appendTo($inputsParent);
            }
            $inputsParent.appendTo($parent);
            let $inputs = $inputsParent.find('.otp-input');
            $inputs.each(function (i) {
                $inputs[i].addEventListener("keydown", function (event) {
                    if (event.key === "Backspace") {
                        $inputs[i].value = "";
                        if (i !== 0) $inputs[i - 1].focus();
                    } else if (event.key === "Enter" && i === $inputs.length - 1 && $inputs[i].value !== "") {
                        event.preventDefault();
                        collectOtpCode(data, false);
                        if (settings.enterClicked != null) {
                            settings.enterClicked();
                        }
                        loseFocus(data);
                        return;
                    } else {
                          if ((event.keyCode > 95 && event.keyCode < 106) || (event.keyCode > 47 && event.keyCode < 58)) {
                            $inputs[i].value = event.key;
                            if (i !== $inputs.length - 1) $inputs[i + 1].focus();
                            event.preventDefault();
                        } else if (!settings.onlyNumbers && event.keyCode > 64 && event.keyCode < 91) {
                            $inputs[i].value = String.fromCharCode(event.keyCode);
                            if (i !== $inputs.length - 1) $inputs[i + 1].focus();
                            event.preventDefault();
                        }
                        else{
                            event.preventDefault();
                        }
                    }
                    collectOtpCode(data);
                });
                $inputs[i].addEventListener("focus", function () {
                    if (!!$($inputs[i]).data('f')) return;
                    for (let j = 0; j < i; j++) {
                        if ($inputs[j].value === "") {
                            $($inputs[j]).data('f', "1");
                            $($inputs[j]).focus();
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
    let $inputs = $('#otp_' + data.idSuffix).find('.otp-input');
    let code = '';
    $inputs.each(function (i, e) {
        code += $(e).val().trim();
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
    $('.otp-input:focus').blur();
};