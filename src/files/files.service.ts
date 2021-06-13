import {Injectable} from "@nestjs/common";
import {IGridFSWriteOption, MongoGridFS} from "mongo-gridfs";
import {InjectConnection} from "@nestjs/mongoose";
import {Connection, Types} from "mongoose";
import {GridFSBucketReadStream} from "mongodb";

@Injectable()
export class FilesService {
    private fileModel: MongoGridFS;

    constructor(@InjectConnection() private readonly connection: Connection) {
        this.fileModel = new MongoGridFS(this.connection.db, 'images');
    }

    async readStream(id: string): Promise<GridFSBucketReadStream> {
        return this.fileModel.readFileStream(id);
    }

    // async writeStream(stream, options?: IGridFSWriteOption): Promise<FileInfo> {
    async writeStream(stream, options?: IGridFSWriteOption): Promise<any> {
        return await this.fileModel
            .writeFileStream(stream, options);
            // .then(FilesService.convertToFileInfo);
    }

    // async findInfo(id: Types.ObjectId): Promise<FileInfo> {
    async findInfo(id: Types.ObjectId): Promise<any> {
        return await this.fileModel
            .findById(id.toHexString());
            // .then(FilesService.convertToFileInfo);
    }

    public async writeFile(
        // file: DiskFile,
        file: any,
        // metadata?: Metadata,
        metadata?: any,
    // ): Promise<FileInfo> {
    ): Promise<any> {
        return await this.fileModel
            .uploadFile(
                file.path,
                {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    metadata,
                },
                true,
            );
            // .then(FilesService.convertToFileInfo);
    }
}
