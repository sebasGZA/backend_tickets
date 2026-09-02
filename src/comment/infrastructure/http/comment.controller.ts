import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";

import { CommentService } from "../../application/services/comment.service";
import { CreateCommentDto } from "../dtos/create-comment.dto";

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Get('ticket/:id')
    getByTicketId(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.commentService.getAllByTicket(id)
    }

    @Post()
    postComment(@Body() createDto: CreateCommentDto) {
        return this.commentService.createComment(createDto)
    }
}
