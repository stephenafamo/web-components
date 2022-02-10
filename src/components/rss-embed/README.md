# RssEmbed Web Component

This component can be used to embed entries from an RSS feed.

> NOTE: Since the feed is loaded from the browser, CORS must be handled correctly.

## Usage

```html
    <script src="https://web-components.pages.dev/rss-embed.js"></script>
    <rss-embed source="https://example.com/feed.xml"></rss-embed>
```

### Configuration

The component can be configured using the following attributes.

* `source`: A link to the rss feed to load.
* `max-items`: Maximum items to display. A value less than `1` means no limit. Default: `0`.
* `title-tag`: The type of html tag to use for the title of the entry. Valid values are `h1` to `h6` and `p`. Default `h2`.
* `date-style` and `time-style`: The published timestamp is formatted with the [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) using the language set in the browser.  
    You can customize the date and time style with the `date-style` and `time-style` attributes which match the camel case versions in the [Intl.DateTimeFormat() constructor options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat).  
    Allowed values are `full`, `long`, `medium`, `short` **and** `hidden`(for when you want to hide either the date or the time.
* `target`: Set the anchor target for the links to the entires. Correponds to the target attribute of the [anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a). Default `_blank`.
* `hide-description`: Hide descriptions for the entires.
* `hide-categories`: Hide categories for the entires.
* `breakpoints`: Comma separated list of breakpoints for responsive styling. See more in the section on [styling][styling].

**Example**

```html
    <script src="https://web-components.pages.dev/rss-embed.js"></script>
    <rss-embed
      source="https://example.com/feed.xml"
      max-items="12"
      title-tag="h3"
      date-style="full"
      time-style="hidden"
      target="_self"
      hide-description
      hide-categories
      breakpoints="640,1024"
    ></rss-embed>
```

### Styling

The component are styled using [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*). Reasonable defaults are already set.

#### Non-responsive properties

* `--text-color`: The color of the text. Default `inherit`.
* `--item-border`: The border styling for each entry. Default `1px solid #ccc`.
* `--item-border-radius`: The border radius for individual entires. Default `0.5rem`.
* `--category-background-color`: The background color of the category chips. Default `rgba(0, 0, 0, 0.25)`.
* `--loader-color`: The color of the loading spinner which shows when the feed is being fetched. Default `black`.


#### Responsive properties

* `--columns`: The number of columns for the entries grid: Default `1`.
* `--row-gap`: The grid gap between rows. Default `0.5rem`.
* `--column-gap`: The grid gap between columns. Default `0.5rem`.
* `--padding`: The padding to use for each feed entry. Default `1rem`.
* `--margin`: The margin to use for each feed entry. Default `1rem`.

Responsive properties can be modified using breakpoints.  
Breakpoints are set on the web component in a list of comma-separated numbers. For example:

```html
<rss-embed breakpoints="640,1024" source="https://example.com/feed.xml"></rss-embed>
```

Once breakpoints are set, additional properties such as `--property-{breakpoint}` are available that change the value of the property at that breakpoint.

For example, the `--columns` property would **also** have `--columns-640` and `--columns-1024`.  
Note: It is not necessary to set the value at every breakpoint, the property falls back to the value at the previous breakpoint if none is set.

**Example**

```html
    <script src="https://web-components.pages.dev/rss-embed.js"></script>
    <rss-embed
      source="https://example.com/feed.xml"
      breakpoints="640,1024"
      style="
        --loader-color: blue;
        --columns: 1;
        --columns-640: 2;
        --columns-1024: 4;
        --padding: 1rem;
        --padding-1024: 2rem;
      "
    ></rss-embed>
```

[styling]: #styling
