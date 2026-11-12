import { NETWORKS } from "../endpoints";
/**
 * Upload of NFT/token images and metadata to the Decimal IPFS service.
 * Uses the global `fetch`, `FormData` and `Blob` (browsers and Node.js >= 18).
 */
export default class IPFS {
    private readonly network;
    constructor(network: NETWORKS);
    private getMetadata;
    upload(form: FormData, nft: boolean): Promise<any>;
    uploadNFTBufferToIPFS(buffer: Uint8Array, fileName: string, name: string, description: string): Promise<any>;
    uploadNFTBlobToIPFS(blob: Blob, fileName: string, name: string, description: string): Promise<any>;
    getBlobMetadata(name: string, description: string): Blob;
    uploadTokenBufferToIPFS(buffer: Uint8Array, fileName: string): Promise<{
        image: string;
    }>;
    getUrlFromCid(cid: string): string;
}
