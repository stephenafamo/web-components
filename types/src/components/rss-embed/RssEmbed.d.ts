import { LitElement } from 'lit';
import { formatStyle, target, tag } from './converters';
declare global {
    interface HTMLElementCategoryNameMap {
        "rss-embed": RssEmbed;
    }
}
export declare class RssEmbed extends LitElement {
    static styles: import("lit").CSSResultGroup;
    source: string;
    maxItems: number;
    titleTag: tag;
    dateStyle: formatStyle;
    timeStyle: formatStyle;
    target: target;
    hideDescription: boolean;
    hideCategories: boolean;
    breakpoints: number[];
    private _feed;
    private _loading;
    willUpdate(changedProperties: any): void;
    private _formatOptions;
    private _published;
    private _title;
    private _description;
    private _categories;
    render(): import("lit-html").TemplateResult<2 | 1> | undefined;
}
