
interface Maybe<T> { }
class Some<T> implements Maybe<T> {
  value: T;
}
class None<T> implements Maybe<T> {
  constructor() {
    return;
  }
}

export interface Filterable {
  filter: string;
}

export interface ListItem<T> {
  index: number;
  data: T;
}

export class LeftRightList<T extends Filterable> {
  private _items: ListItem<T>[];
  private _filtered: number[];
  private _left: (number | null)[];
  private _right: number[];

  init(items: T[]) {
    this._items = [];
    this._filtered = [];
    this._left = [];
    this._right = [];

    for (let i = 0; i < items.length; i++) {
      this._items.push({ data: items[i], index: i });
      this._filtered.push(i);
      this._left.push(i);
    }
  }

  toRight(item?: ListItem<T>) {
    if (item) {
      this._right.push(item.index);
      this._left[item.index] = null;
    } else {
      let aa = this._left.filter(l => typeof l === 'number');

      this._right = this._right.concat(this._left.filter(l => typeof l === 'number'));
      this._left = new Array(this._items.length);
    }
  }

  toLeft(item?: ListItem<T>) {
    if (item) {
      if (this._filtered.indexOf(item.index) > -1) {
        this._left[item.index] = item.index;
      }
      this._right.splice(this._right.indexOf(item.index), 1);
    } else {
      this._right.filter(r => this._filtered.indexOf(r) > -1).forEach(f => this._left[f] = f);
      this._right = [];
    }
  }

  get left(): ListItem<T>[] {
    return this._left ? this._left.filter(index => index !== null).map(index => this._items[index]) : [];
  }

  get right(): ListItem<T>[] {
    return this._right ? this._right.map(e => this._items[e]) : [];
  }

  filter(term: string): void {
    const getItems = () => {
      return (term.trim() === '')
        ? this._items
        : this._items.filter(item => item.data.filter.trim().toLowerCase().includes(term.trim().toLowerCase()));
    };
    this._filtered = getItems().map(item => item.index);

    for (let i = 0; i < this._left.length; i++) {
      this._left[i] = (this._filtered.indexOf(i) !== -1 && this._right.indexOf(i) === -1) ? i : undefined;
    }
  }
}