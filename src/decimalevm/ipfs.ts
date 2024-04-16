
import FormData from 'form-data'
import {Blob} from 'buffer';

import {
    NETWORKS,
    getIpfsEndpoints
} from "../endpoints";

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
            "file_cid_media": "" //TODO rename file_cid_media -> image
        }
    }
    
    public async upload(form: any){
        const result = await fetch(`${getIpfsEndpoints(this.network)}upload`, {
            method: 'POST',
            body: form
        })
        return await result.json()
    }

    // for node js
    public async uploadFromBuffer(buffer:Buffer, fileName:string, name:string, description:string) {
        const form: any = new FormData();
        const metadata = this.getMetadata(name, description)

        form.append('uploading_files', buffer, { filename: fileName });
        form.append('uploading_files', JSON.stringify(metadata), { filename: "metadata.json" });

        return await this.upload(form)
    }

    // for browser
    public getBlobMetadata(name:string, description:string): Blob {
        const metadata = this.getMetadata(name, description)
        return new Blob([JSON.stringify(metadata, null, 0)], { type: "application/json" });
    }

    public getUrlFromCid(cid:string) {
        return `${getIpfsEndpoints(this.network)}ipfs/${cid}`
    }
    
}
