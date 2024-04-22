/// <reference types="node" />
import { Blob } from 'buffer';
import { NETWORKS } from "../endpoints";
export default class IPFS {
    private readonly network;
    constructor(network: NETWORKS);
    private getMetadata;
    upload(form: any): Promise<any>;
    uploadFromBuffer(buffer: Buffer, fileName: string, name: string, description: string): Promise<any>;
    getBlobMetadata(name: string, description: string): Blob;
    getUrlFromCid(cid: string): string;
}
