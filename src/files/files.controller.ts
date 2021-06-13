import {ApiBadRequestResponse, ApiBody, ApiConsumes, ApiResponse, ApiTags} from "@nestjs/swagger";
import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {DiskFile} from "./model/disk-file.model";
import {FilesService} from "./files.service";
import {Types} from "mongoose";

@Controller('/attachment/files')
@ApiTags('Attachments')
export class FilesController {
    constructor(private readonly filesService: FilesService) {
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({status:200, description: 'return the file id'})
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: DiskFile,
    ): Promise<any> {
        const createdFile = await this.filesService.writeFile(file);
        return {fileId: createdFile._id};

    }


    @Get(':id')
    @ApiBadRequestResponse()
    async getFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(new Types.ObjectId(id));
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new HttpException(
                'An error occurred while retrieving file',
                HttpStatus.EXPECTATION_FAILED,
            );
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res);
    }
}
