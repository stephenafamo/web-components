import {css, CSSResultGroup} from 'lit';
import {variable} from '../../utils/styles.css'

const defaultColumns = css`1`
const defaultMargin = css`0.5rem`
const defaultPadding = css`0.5rem`
const defaultGap = css`1rem`

export const styles = (): CSSResultGroup => {
  return css`
    :host {
      /* base styles */
    }

    *, :before, :after {
      border: 0 solid;
      box-sizing: border-box;
    }

    .slot {
      display: none;
    }

    .items {
      display: grid;
      row-gap: var(--grid-row-gap, ${defaultGap});
      column-gap: var(--grid-column-gap, ${defaultGap});
      grid-template-columns: repeat(var(--grid-columns, ${defaultColumns}), 1fr);
    }

    .item {
      display: block;
      height: 100%;
      overflow: hidden;
      border: var(--item-border, 1px solid #ccc);
      border-radius: var(--item-border-radius, 0.5rem);
      padding: var(--item-padding, ${defaultPadding});
      text-decoration: none;
      color: var(--text-color, inherit);
    }

    .categories {
      display: flex;
      flex-wrap: wrap;
    }

    .category {
      padding: calc(var(--item-padding, ${defaultPadding})/2) var(--item-padding, ${defaultPadding});
      margin-right: var(--item-margin, ${defaultMargin});
      margin-bottom: var(--item-margin, ${defaultMargin});
      background: var(--category-background-color, rgba(0, 0, 0, 0.25));
      border-radius: 9999px;
    }

    .loader {
      width: 120px; 
      padding: 15px;
      background: var(--loader-color, black);

      aspect-ratio: 1;
      border-radius: 50%;
      -webkit-mask:
      conic-gradient(#0000,#000),
        linear-gradient(#000 0 0) content-box;
      mask:
      conic-gradient(#0000,#000),
        linear-gradient(#000 0 0) content-box;
      -webkit-mask-composite: source-out;
      mask-composite: subtract;
      box-sizing: border-box;
      animation:r 1s linear infinite;
    }

  @keyframes r {to{transform:rotate(1turn)}}
  `
}

export const variables: variable[] = [
  {
    name: 'grid-columns',
    basedOn: 'columns',
    defaultValue: defaultColumns.toString(),
  },
  {
    name: 'grid-row-gap',
    basedOn: 'row-gap',
    defaultValue: defaultGap.toString(),
  },
  {
    name: 'grid-column-gap',
    basedOn: 'column-gap',
    defaultValue: defaultGap.toString(),
  },
  {
    name: 'item-padding',
    basedOn: 'padding',
    defaultValue: defaultPadding.toString(),
  },
  {
    name: 'item-margin',
    basedOn: 'margin',
    defaultValue: defaultMargin.toString(),
  },
]
