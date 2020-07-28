import * as fs from 'fs-extra';
import { FileListService, Files } from "../common/file-list-protocol";
import { FileUri } from "@theia/core/lib/node/file-uri";
import { injectable, inject } from "inversify";
import URI from '@theia/core/lib/common/uri';
import { MessageService } from '@theia/core';
// import { FileListViewContribution } from "../browser/file-list-view-contribution";

@injectable()
export class NodeFileListService implements FileListService {

    // BONUS: show info message when `getFiles` is called
    // check that each window does not receive a notification from another window
    @inject(MessageService)
    protected readonly messageService: MessageService;

    async getFiles(uri: string): Promise<Files> {
        // TODO: implement fetching files info for the given uri
        // use `fs-extra` module to check whether a path points to the directory with `stat(fsPath)`
        // use `fs-extra` module to read child directories with `readdir(fsPath)`
        // use `FileUri.fsPath` to read os-specific path from an URI
        // use `new URI(uri).resolve(dir).toString()` to construct a child uri
        // remember that only URIs can be passed between frontend and backend, never paths
        // see https://github.com/eclipse-theia/theia/wiki/Coding-Guidelines#uripath
        const currentUri = new URI(uri);
        const fsPath = FileUri.fsPath(uri);
        const stat = await fs.stat(fsPath);
        if (!stat.isDirectory()) {
            return {
                isDirectory: false
            };
        }
        const files = await fs.readdir(fsPath);
        return {
            isDirectory: true,
            children: files.map(file => currentUri.withPath(currentUri.path.join(file)).toString())
        };
        
        throw new Error('not implemented');
    }

}