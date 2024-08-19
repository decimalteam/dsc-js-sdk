export type SubgraphMeta = {
    block: {
        number: number;
    };
};
export type SubgraphResponse<T> = {
    meta: SubgraphMeta;
    data: T;
};
