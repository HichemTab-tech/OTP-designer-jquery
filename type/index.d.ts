// noinspection JSUnusedGlobalSymbols

declare module "otpdesigner-jquery" {

    interface OTPDesignerSettings {
        length: number,
        onlyNumbers: boolean,
        inputsClasses: string|string[],
        inputsParentClasses: string|string[],
        enterClicked?: () => void;
        typingDone?: (code: string) => void;
        onchange?: (code: string) => void;
    }
    type OTPDesignerOptions = Partial<OTPDesignerSettings>;

    interface OTPDesignerResults {
        done: boolean;
        code: string;
    }

    type OTPDesignerResult = OTPDesignerResults|OTPDesignerResults[];

    interface OTPDesignerMethods {
        code(results: OTPDesignerResult, data: OTPDesignerData): OTPDesignerResult;
        set(results: OTPDesignerResult, data: OTPDesignerData, args: [string, boolean?]): OTPDesignerResult;
        clear(results: OTPDesignerResult, data: OTPDesignerData): OTPDesignerResult;
        focus(results: OTPDesignerResult, data: OTPDesignerData): OTPDesignerResult;
        option(results: OTPDesignerResult, data: OTPDesignerData, args: string[]): OTPDesignerResult;
        addClass(results: OTPDesignerResult, data: OTPDesignerData, args: string[]): OTPDesignerResult;
        removeClass(results: OTPDesignerResult, data: OTPDesignerData, args: string[]): OTPDesignerResult;
        hiddenInput(results: OTPDesignerResult, data: OTPDesignerData): OTPDesignerResult;
    }

    interface OTPDesignerData {
        idSuffix: number;
        settings: OTPDesignerSettings;
    }

    interface OTPDesignerStatic {
        (options?: OTPDesignerOptions): OTPDesignerResult;
        (method: "code"): OTPDesignerResult;
        (method: "set", args: string): OTPDesignerResult;
        (method: "clear"): OTPDesignerResult;
        (method: "focus"): OTPDesignerResult;
        (method: "option", optionName: keyof OTPDesignerSettings, args: OTPDesignerSettings[keyof OTPDesignerSettings]): OTPDesignerResult;
        (method: "addClass", args: string[]|string): OTPDesignerResult;
        (method: "removeClass", args: string[]|string): OTPDesignerResult;
        (method: "hiddenInput"): OTPDesignerResult;
    }

    export const otpdesigner: OTPDesignerStatic;

    export type { OTPDesignerOptions, OTPDesignerSettings, OTPDesignerResult, OTPDesignerMethods, OTPDesignerData };
}