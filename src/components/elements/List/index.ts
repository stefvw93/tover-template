export interface IListProps<T> {
  items: T[];
  template(item: T, index?: number, array?: T[]): React.ReactNode;
}

export interface IListState {}

export { List } from './List.element';
