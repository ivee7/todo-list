import type { TTodoListItem } from './todo-list.dto';


class TodoListDB {
    private db: IDBDatabase | null = null;

    constructor() {
        this.open();
    }

    private open() {
        const req = indexedDB.open('TodoList');

        req.onerror = (err) => console.warn(err);
        req.onsuccess = () => {
            this.db = req.result;
        }
        req.onupgradeneeded = () => {
            const db = req.result;

            if (!db.objectStoreNames.contains('todoListStore')) {
                db.createObjectStore('todoListStore', { keyPath: 'id', autoIncrement: true });
            }
        }
    }

    private makeTX(storeName: string, mode: IDBTransactionMode) {
        const tx = this.db!.transaction(storeName, mode);
        tx.onerror = (err) => console.warn(err);
        return tx;
    }

    public createItem(text: string): Promise<boolean> {
        return new Promise(resolve => {
            if(!this.db){
                return resolve(false);
            }

            const newItem: TTodoListItem = {
                text,
                done: false,
                id: `id${new Date().getTime()}`
            };

            const req = this.makeTX('todoListStore', 'readwrite')
                    .objectStore('todoListStore')
                    .add(newItem);

            req.onsuccess = () => {
                return resolve(true);
            };

            req.onerror = (e) => {
                console.warn(e);
                return resolve(false);
            }
        })
    }

    public getItems(): Promise<TTodoListItem[]> {
        return new Promise(resolve => {
            if(!this.db){
                return resolve([]);
            }
            const req = this.makeTX('todoListStore', 'readonly')
                            .objectStore('todoListStore')
                            .getAll();

            req.onerror = (e) => {
                console.warn(e);
                return resolve([]);
            };

            req.onsuccess = () => {
                if (req.result) return resolve(req.result);
                return resolve([]);
            };
        })
    }

    public deleteItem(id: string): Promise<boolean> {
        return new Promise(resolve=>{
            if(!this.db){
              return resolve(false);
            }

            const req = this.makeTX('todoListStore', 'readwrite')
                        .objectStore('todoListStore')
                        .delete(id);

            req.onsuccess = () => {
              return resolve(true);
            };

            req.onerror = (e) => {
              console.warn(e);
              return resolve(false);
            }
          })
    }

    public toggleStatus(id: TTodoListItem['id']): Promise<boolean> {
        return new Promise((resolve) => {
            const keyRange = IDBKeyRange.only(id);
            const req = this.makeTX('todoListStore', 'readwrite')
                            .objectStore('todoListStore')
                            .openCursor(keyRange);

            req.onsuccess = (event) => {
              const cursor = event.target.result;

              if (cursor) {
                const updateData = cursor.value;

                updateData.done = !updateData.done;
                const update = cursor.update(updateData);

                update.onsuccess = async () => {
                    resolve(true);
                  }

                update.onerror = (e: Event) => {
                    console.warn(e);
                    resolve(false);
                };
              }
            };

            req.onerror = (e) => {
                console.warn(e);
            };
          });
    }

    public clearCompleted(): Promise<boolean> {
        return new Promise((resolve) => {
            const req = this.makeTX('todoListStore', 'readwrite')
                            .objectStore('todoListStore')
                            .openCursor();

            req.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor?.value.done) {
                    const request = cursor.delete();
                    request.onsuccess = () => {};
                    cursor.continue();
                } else {
                    resolve(true);
                }
            };

            req.onerror = (e) => {
                console.warn(e);
                resolve(false);
            };
          });
    }
}

export default new TodoListDB();
