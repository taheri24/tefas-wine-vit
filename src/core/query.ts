import { reactive } from 'vue';
import { CrudAPI } from './crud';
interface IQueryResult<T> {
    pagedData?: Readonly<T[]>;
    pageSize?: number;
    totalRecords?: number;
    isLoading?: boolean;
    fetchData?: CrudAPI['searchByCriteria'];
    storedCriteriaJSON?: string;
}
interface IQueryOptions {
    defaultPageSize: number;
    seperatedRequestForCounting: boolean;
    pagingParams: string | Function;

}
export function useQueryByCRUD<T>(api: CrudAPI<T>, options?: IQueryOptions): IQueryResult<T> {
    const opts: IQueryOptions = Object.assign({}, options, useQueryByCRUD.defaultOptions);
    const defaultData = { pagedData: [], isLoading: false } as IQueryResult<T>;
    const state = reactive(defaultData);
    state.fetchData = function (criteria) {
        this.isLoading = true;
        return api.searchByCriteria(criteria).then(resp => {
            const [rowsByServer] = [resp.data, ...Object.values(resp.data)].filter(Array.isArray);

            if (rowsByServer) {
                this.pagedData = rowsByServer;
            }
            const [totalRecords] = [parseInt(resp.headers['X-TOTAL-COUNT']), resp.data.count, resp.data.total, resp.data.totalRecords
                , ...Object.values(resp.data)].filter(Number.isInteger);
            if (typeof totalRecords == 'number') {
                this.totalRecords = totalRecords;
            }
            else if (opts.seperatedRequestForCounting) {
                if (this.storedCriteriaJSON != JSON.stringify(criteria)) {
                    this.storedCriteriaJSON = JSON.stringify(criteria);
                    api.countByCriteria(criteria).then(resp => {
                        const [totalRecords] = [parseInt(resp.data)
                            , ...Object.values(resp.data as any)].filter(Number.isInteger);
                        this.totalRecords = totalRecords as any;
                    });
                }
            } 
            else if (rowsByServer instanceof Array) {
                this.totalRecords = rowsByServer.length;
            }

            return resp;
        });

    }

    return state as any;     
}
useQueryByCRUD.defaultOptions = {
    defaultPageSize: 10,
    seperatedRequestForCounting: true
} as IQueryOptions

