// Service contract for DB service
export interface IDbService<T> {
    getAllRecords(): Promise<T[]>;
    getRecordById(recordId: number): Promise<T | null>;
    insertRecord(record : T): Promise<boolean>;
    updateRecordById(recordId: number, updatedRecord: T): Promise<boolean>;
    deleteRecordById(recordId: number): Promise<boolean>;
}
