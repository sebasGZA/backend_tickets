import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommentTypeORMEntity } from "./infrastructure/persistence/comment-typeorm.entity";
import { TicketModule } from "../tickets/ticket.module";
import { CommentService } from "./application/services/comment.service";
import { COMMENT_REPOSITORY } from "./domain/ports/repositories/comment-repository.port";
import { CommentTypeORMRepository } from "./infrastructure/adapters/repositories/comment-typeorm.repository";
import { CommentController } from "./infrastructure/http/comment.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentTypeORMEntity]),
        TicketModule,
    ],
    providers: [
        CommentService,
        {
            provide: COMMENT_REPOSITORY, useClass: CommentTypeORMRepository
        }
    ],
    exports: [CommentService],
    controllers: [CommentController]

})
export class CommentModule { }