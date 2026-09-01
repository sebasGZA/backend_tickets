import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfiguration = (app: INestApplication) => {
    const swaggerTitle = process.env.SWAGGER_TITLE ?? 'Backend API';
    const swaggerDescription = process.env.SWAGGER_DESCRIPTION ?? 'Backend endpoints';
    const config = new DocumentBuilder()
        .setTitle(swaggerTitle)
        .setDescription(swaggerDescription)
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory, {
        jsonDocumentUrl: 'swagger/json',
    });
};