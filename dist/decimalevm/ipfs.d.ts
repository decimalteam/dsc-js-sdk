/// <reference types="node" />
import { Blob } from 'buffer';
import { NETWORKS } from "../endpoints";
export default class IPFS {
    private readonly network;
    constructor(network: NETWORKS);
    private getMetadata;
    upload(form: any, nft: boolean): Promise<any>;
    uploadNFTBufferToIPFS(buffer: Buffer, fileName: string, name: string, description: string): Promise<any>;
    uploadNFTBlobToIPFS(blob: any, fileName: string, name: string, description: string): Promise<any>;
    getBlobMetadata(name: string, description: string): Blob;
    uploadTokenBufferToIPFS(buffer: Buffer, fileName: string): Promise<{
        image: string;
    }>;
    getUrlFromCid(cid: string): string;
}
