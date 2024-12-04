import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard'; // Adjust the path if necessary
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Categories')
@Controller('categories')
// @UseGuards(JwtAuthGuard) // Apply AuthGuard to all endpoints in this controller
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category successfully created.' })
  @ApiResponse({
    status: 409,
    description: 'Category with this name already exists.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.create(createCategoryDto);
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'List of categories retrieved.' })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({ status: 200, description: 'Category found.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async findOne(@Param('id') id: number) {
    try {
      return await this.categoryService.findOne(Number(id));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiResponse({ status: 200, description: 'Category successfully updated.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoryService.update(Number(id), updateCategoryDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({ status: 200, description: 'Category successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async remove(@Param('id') id: number) {
    try {
      return await this.categoryService.remove(Number(id));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
