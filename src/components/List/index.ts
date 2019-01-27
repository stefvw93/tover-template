export interface IListProps<T> {
  items: T[];
  template: (item: T, index?: number) => React.ReactNode;
  useAsKey?: keyof T;
}

export interface IListState {}

export { List } from "./List.component";
