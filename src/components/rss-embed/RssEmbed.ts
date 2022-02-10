// Lit imports
import {LitElement} from 'lit';
import {html, unsafeStatic} from 'lit/static-html.js';
import {customElement, property, state} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';
import {guard} from 'lit/directives/guard.js';

// Imports for functionality
import {parse} from 'rss-to-json';

// Imports from related files
import {styles, variables} from './styles.css'
import {
  formatStyle, FormatStyleConverter,
  target, TargetConverter,
  tag, TagConverter,
} from './converters'

// Import from utils
import {BooleanConverter, NumberArrayConverter} from '../../utils/converters'
import unescape from '../../utils/unescape'
import {responsiveStyles} from '../../utils/styles.css'

interface formatOptions {dateStyle: formatStyle; timeStyle: formatStyle}
interface feed {
  title: any;
  description: any;
  link: any;
  image: any;
  category: any;
  items: any[];
}

// Makes it possible for packages that import this to use "rss-embed" as a html element tag
declare global {
  interface HTMLElementCategoryNameMap {
    "rss-embed": RssEmbed,
  }
}

@customElement('rss-embed')
export class RssEmbed extends LitElement {
  // Static styles
  static styles = styles();

  // PROPERTIES
  @property()
  source: string;

  @property({ attribute: 'max-items' })
  maxItems: number = 0;

  @property({attribute: 'title-tag', converter: TagConverter('h2')})
  titleTag: tag = 'h2'

  @property({ attribute: 'date-style', converter: FormatStyleConverter('medium')})
  dateStyle: formatStyle = 'medium';

  @property({ attribute: 'time-style', converter: FormatStyleConverter('short')})
  timeStyle: formatStyle = 'short';

  @property({ attribute: 'target', converter: TargetConverter('_blank')})
  target: target = '_blank';

  @property({ attribute: 'hide-description', converter: BooleanConverter})
  hideDescription: boolean = false;

  @property({ attribute: 'hide-categories', converter: BooleanConverter})
  hideCategories: boolean = false;

  @property({attribute: 'breakpoints', converter: NumberArrayConverter})
  breakpoints: number[] = []

  @state()
  private _feed: feed = <feed><unknown>{items: []};

  @state()
  private _loading: boolean = true;

  // Refresh the feed if the source changed
  willUpdate(changedProperties: any) {
    if (!changedProperties.has('source') || !this.source) return;

    parse(this.source, {}).then(val => {
      this._loading = true
      this._feed = val
      this._loading = false
    });
  }

  private _formatOptions(): formatOptions {
    let options: formatOptions = <formatOptions>{}
    if (this.dateStyle !== undefined) options.dateStyle = <formatStyle>this.dateStyle
    if (this.timeStyle !== undefined) options.timeStyle = <formatStyle>this.timeStyle
    return options
  }

  private _published(item: any) {
    if (!this.dateStyle && !this.timeStyle) return;

    const pubDate = new Date(item.published)
    const formatted = new Intl.
      DateTimeFormat(navigator.language, this._formatOptions()).
      format(pubDate)

    return html`<p class="published">
                  <time datetime="${pubDate.toISOString()}">${formatted}</time>
                </p>`
  }

  private _title(item: any) {
    const category = unsafeStatic(this.titleTag)
    return html`<${category} class="title">${item.title}</${category}>`
  }

  private _description(item: any) {
    if (this.hideDescription) return;
    return html`<p class="description">
                  ${unescape(item.description)}
                </p>`
  }

  private _categories(item: any) {
    if (this.hideCategories) return;
    return html`<div class="categories">
      ${map(item.category, (item) => {
        return html`<span class="category">${item}</span>`
      })}
    </div>`
  }

  // Render the UI as a function of component state
  render() {
    if (!this.source) {
      console.log('no source specified for rss-embed element');
      return;
    }

    return this._loading
      ? html`<div class="loader"></div>`
      : html`
        <style>
          ${guard([this.breakpoints], () => responsiveStyles(this.breakpoints, variables))}
        </style>
        <div class="items">
          ${map(this._feed.items, (item, index) => {
            if (this.maxItems > 0 && index >= this.maxItems) return;

            return html`
              <a href="${item.link}" rel="noopener" class="item" target="${this.target}">
                ${this._published(item)}
                ${this._title(item)}
                ${this._description(item)}
                ${this._categories(item)}
              </a>
            `})}
        </div>`;
  }
}
