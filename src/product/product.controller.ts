import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/guards/auth.guard'; // Adjust the path if necessary
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('products')
@Controller('products')
// @UseGuards(JwtAuthGuard) // Apply AuthGuard to all endpoints in this controller
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product with an image' })
  @ApiConsumes('multipart/form-data') // Swagger UI support for file upload
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Folder for saving uploaded images
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtName}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      createProductDto.imageUrl = `/uploads/${image.filename}`; // Add image URL to DTO
    }
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all products.',
  })
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the product.',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtName}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      updateProductDto.imageUrl = `/uploads/${image.filename}`; // Update image URL if provided
    }
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
