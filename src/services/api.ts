export interface ApiPort<TItem, TCreate, TUpdate> {

  list(): Promise<TItem[]>;
  getById(id: string): Promise<TItem | null>;
  create(payload: TCreate): Promise<TItem>;
  update(id: string, payload: TUpdate): Promise<TItem>;
  remove(id: string): Promise<void>;
}

