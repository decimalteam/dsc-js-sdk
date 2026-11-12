import {
    NETWORKS,
    getIpfsEndpoints
} from "../endpoints";

const MAX_FILE_SIZE = 100000000; // 100 MB

/**
 * Upload of NFT/token images and metadata to the Decimal IPFS service.
 * Uses the global `fetch`, `FormData` and `Blob` (browsers and Node.js >= 18).
 */
export default class IPFS {

    private readonly network: NETWORKS;

    public constructor(
        network: NETWORKS,
    ) {
        this.network = network;
    }

    private getMetadata(name:string, description:string) {
        return {
            "name": name,
            "description": description,
            "image": ""
        }
    }

    public async upload(form: FormData, nft: boolean){
        const result = await fetch(`${getIpfsEndpoints(this.network)}${nft ? 'upload' : 'upload-image'}`, {
            method: 'POST',
            body: form
        })
        return await result.json()
    }

    public async uploadNFTBufferToIPFS(buffer: Uint8Array, fileName:string, name:string, description:string) {
        return await this.uploadNFTBlobToIPFS(new Blob([buffer as BlobPart]), fileName, name, description)
    }

    public async uploadNFTBlobToIPFS(blob: Blob, fileName:string, name:string, description:string) {
        if (blob.size > MAX_FILE_SIZE) throw new Error('File size should not exceed 100 MB.');
        const form = new FormData();
        form.append('uploading_files', blob, fileName);
        form.append('uploading_files', this.getBlobMetadata(name, description), "metadata.json");

        return await this.upload(form, true)
    }

    public getBlobMetadata(name:string, description:string): Blob {
        const metadata = this.getMetadata(name, description)
        return new Blob([JSON.stringify(metadata, null, 0)], { type: "application/json" });
    }

    public async uploadTokenBufferToIPFS(buffer: Uint8Array, fileName: string): Promise<{ image: string }> {
        if (buffer.byteLength > MAX_FILE_SIZE) throw new Error('File size should not exceed 100 MB.');

        const form = new FormData();
        form.append('uploading_files', new Blob([buffer as BlobPart]), fileName);

        return await this.upload(form, false)
    }

    public getUrlFromCid(cid:string) {
        return `${getIpfsEndpoints(this.network)}ipfs/${cid}`
    }

}
