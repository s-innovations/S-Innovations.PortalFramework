interface ClassieStatic {
    has(el, cls: string): boolean;
    add(el, cls: string): void;
    remove(el, cls: string);
    toggle(el, cls: string);
}

declare module "classie" {
    export = ClassieStatic;
}