import './src/style.css';
import {otpdesigner} from "./src/otpdesigner";

(function ($) {
    $.fn.otpdesigner = otpdesigner;
})(jQuery);

export { otpdesigner };