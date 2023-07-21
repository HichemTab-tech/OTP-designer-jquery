export const otpdesigner = function (options = {}, ...args) {

    const optInputId = "opt_input_";
    let results = [];

    // noinspection JSUnusedGlobalSymbols
    const methods = {
        code: function (results, data) {
            console.log(data);
            let code = $('#otp_hidden_' + data.idSuffix).val();
            if (isDefined(code)) code = code.trim();
            else code = "";
            results.push({
                done: code.length === data.settings.length,
                code: code
            });
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
                    inputClasses: '',
                    inputsParentClasses: '',
                    typingDone : function () {}
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
            if (isDefined($(this).attr('data-input-classes'))) {
                settings.inputClasses = $(this).attr('data-input-classes');
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
            $hiddenInput.appendTo($parent);

            for (let i = 0; i < settings.length; i++) {
                let $input = $('<input class="m-2 text-center form-control rounded otp-input" maxlength="1" />');
                $input.attr('id', optInputId + (i) + "_" + idSuffix);
                let type = "text";
                if (settings.type === 'numeric') {
                    type = "number";
                }
                if (settings.inputClasses !== "") {
                    $input.addClass(settings.inputClasses);
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
                    } else {
                        if (event.keyCode > 95 && event.keyCode < 106) {
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
            if ( typeof options == 'string') {
                results = methods[options](results, data, [...args]);
            }
        }
    });
    return results.length > 1 ? results : results[0];
}

let isDefined = (variable, notEmpty = true) => {
    return typeof variable !== 'undefined' && variable !== null && (typeof variable !== 'string' || !notEmpty || variable !== "");
}

let stringToBool = function (s) {
    return ['true', 'TRUE', '1'].includes(s.toString());
}

let collectOtpCode = (data) => {
    let $inputs = $('#otp_' + data.idSuffix).find('.otp-input');
    let code = '';
    $inputs.each(function (i, e) {
        code += $(e).val().trim();
    });
    $('#otp_hidden_' + data.idSuffix).val(code);
    if (code.length === $inputs.length) data.settings.typingDone(code);
}