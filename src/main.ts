import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import 'reflect-metadata'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
import { ErrorsFilter } from './errors/errors.filter'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'ngrok-skip-browser-warning',
    ],
    credentials: true,
  })

  app.use((req, res, next) => {
    console.log(`Requisição recebida: ${req.method} ${req.url}`)
    next()
  })

  const port = process.env.PORT || 3000
  app.useGlobalFilters(new ErrorsFilter())
  dotenv.config()

  const options = new DocumentBuilder()
    .setTitle('API Rental Store')
    .setDescription('Roseanne Dias rental store documentation')
    .setVersion('3.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
}
bootstrap()
