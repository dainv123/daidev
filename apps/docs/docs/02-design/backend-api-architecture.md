# daidev Backend Application Design

The **daidev** backend is built with **Nest.js**, providing a scalable and modular API layer for the multi-tenant portfolio platform. It handles CRUD operations, image uploads, email sending, and authentication, ensuring data isolation via `tenantId`. The backend integrates with MongoDB, Cloudinary, and Resend, and is designed for deployment on Railway with MongoDB Atlas.

## Tech Stack
- **Framework**: Nest.js (TypeScript)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Auth.js (NextAuth.js adapter for Node.js)
- **Image Storage**: Cloudinary SDK
- **Email Service**: Resend SDK
- **API**: REST (with GraphQL as a future option)
- **Deployment**: Railway with MongoDB Atlas

## Project Structure
```plaintext
daidev-backend/
├── src/
│   ├── auth/                     # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── strategies/          # JWT or OAuth strategies
│   ├── users/                    # User management module
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── users.controller.ts
│   │   ├── users.schema.ts
│   ├── themes/                   # Themes management module
│   │   ├── themes.module.ts
│   │   ├── themes.service.ts
│   │   ├── themes.controller.ts
│   │   ├── themes.schema.ts
│   ├── blogs/                    # Blogs management module
│   ├── certificates/             # Certificates management module
│   ├── tags/                     # Tags management module
│   ├── images/                   # Image upload/management module
│   ├── contact-messages/         # Contact form submissions module
│   ├── site-settings/            # Site settings (header/menu/footer) module
│   ├── shared/                   # Shared utilities, middleware, DTOs
│   │   ├── middlewares/         # Tenant isolation middleware
│   │   ├── dtos/                # Data Transfer Objects
│   │   ├── interfaces/          # TypeScript interfaces
│   ├── main.ts                  # Application entry point
│   ├── app.module.ts            # Root module
├── .env                          # Environment variables
├── package.json
├── tsconfig.json
├── README.md
```

## Key Modules and Functionality
### 1. **Auth Module**
Handles user authentication and role-based access using Auth.js.
- **Features**:
  - Login/signup with email/password or OAuth (e.g., GitHub).
  - JWT-based session management.
  - Role-based access (admin, viewer).
- **Endpoints**:
  - `POST /auth/login`: Authenticate user and return JWT.
  - `POST /auth/signup`: Register a new user.
  - `GET /auth/session`: Get current user session.

### 2. **Users Module**
Manages user profiles and roles.
- **Features**:
  - CRUD operations for user data (name, bio, avatar, social links).
  - Multi-tenant isolation with `tenantId`.
- **Endpoints**:
  - `GET /users/:id`: Get user profile (public data only).
  - `PUT /users/:id`: Update user profile (admin only).
  - `DELETE /users/:id`: Delete user (admin only).

### 3. **Themes Module**
Manages portfolio themes with tags and previews.
- **Features**:
  - CRUD operations for themes.
  - Filter themes by tags.
  - Support i18n for titles/descriptions (English, Vietnamese).
- **Endpoints**:
  - `GET /themes`: List themes (filtered by `tenantId`, tags).
  - `POST /themes`: Create a new theme (admin only).
  - `PUT /themes/:id`: Update a theme (admin only).
  - `DELETE /themes/:id`: Delete a theme (admin only).

### 4. **Blogs Module**
Manages blog posts with tags and content.
- **Features**:
  - CRUD operations for blogs.
  - Filter blogs by tags.
  - Support i18n for titles/content.
- **Endpoints**:
  - `GET /blogs`: List blogs (filtered by `tenantId`, tags).
  - `POST /blogs`: Create a new blog (admin only).
  - `PUT /blogs/:id`: Update a blog (admin only).
  - `DELETE /blogs/:id`: Delete a blog (admin only).

### 5. **Certificates Module**
Manages user certificates.
- **Features**:
  - CRUD operations for certificates.
  - Store issuer, issue date, and certificate URL.
- **Endpoints**:
  - `GET /certificates`: List certificates (filtered by `tenantId`).
  - `POST /certificates`: Create a new certificate (admin only).
  - `PUT /certificates/:id`: Update a certificate (admin only).
  - `DELETE /certificates/:id`: Delete a certificate (admin only).

### 6. **Tags Module**
Manages tags for categorizing themes and blogs.
- **Features**:
  - CRUD operations for tags.
  - Support i18n for tag names.
- **Endpoints**:
  - `GET /tags`: List tags (filtered by `tenantId`).
  - `POST /tags`: Create a new tag (admin only).
  - `PUT /tags/:id`: Update a tag (admin only).
  - `DELETE /tags/:id`: Delete a tag (admin only).

### 7. **Images Module**
Handles image uploads to Cloudinary and stores metadata in MongoDB.
- **Features**:
  - Upload images for themes, blogs, certificates, or avatars.
  - Store Cloudinary URLs and metadata.
- **Endpoints**:
  - `POST /images/upload`: Upload image to Cloudinary (admin only).
  - `GET /images`: List images (filtered by `tenantId`, type).
  - `DELETE /images/:id`: Delete image (admin only).

### 8. **ContactMessages Module**
Manages contact form submissions and email sending via Resend.
- **Features**:
  - Store form submissions in MongoDB.
  - Send emails via Resend with reCAPTCHA validation.
- **Endpoints**:
  - `POST /contact`: Submit contact form (public, with reCAPTCHA).
  - `GET /contact-messages`: List messages (admin only, filtered by `tenantId`).
  - `PUT /contact-messages/:id`: Mark message as processed (admin only).

### 9. **SiteSettings Module**
Manages customizable site settings (header, menu, footer).
- **Features**:
  - CRUD operations for site settings.
  - Support i18n for text fields.
- **Endpoints**:
  - `GET /site-settings`: Get site settings (filtered by `tenantId`).
  - `PUT /site-settings`: Update site settings (admin only).

## Multi-Tenancy Implementation
- **tenantId**: Included in all MongoDB collections and API queries to ensure data isolation.
- **Middleware**: A custom Nest.js middleware extracts `tenantId` from the authenticated user’s JWT or session and applies it to all database queries.
- **Example**:
  ```typescript
  @Injectable()
  export class TenantMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      const user = req.user as { tenantId: string };
      if (user) {
        req['tenantId'] = user.tenantId;
      }
      next();
    }
  }
  ```

## Sample Code
### MongoDB Schema (Users)
```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  tenantId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['admin', 'viewer'], default: 'viewer' })
  role: string;

  @Prop({
    type: {
      name: String,
      bio: { en: String, vi: String },
      avatar: String,
      socialLinks: { github: String, linkedin: String, twitter: String },
    },
  })
  profile: {
    name: string;
    bio: { en: string; vi: string };
    avatar: string;
    socialLinks: { github: string; linkedin: string; twitter: string };
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ tenantId: 1 }, { unique: true });
```

### Themes Controller
```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, Request } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  async findAll(@Request() req) {
    return this.themesService.findAll(req.tenantId);
  }

  @Post()
  async create(@Body() createThemeDto: CreateThemeDto, @Request() req) {
    return this.themesService.create(createThemeDto, req.tenantId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto, @Request() req) {
    return this.themesService.update(id, updateThemeDto, req.tenantId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.themesService.remove(id, req.tenantId);
  }
}
```

### Themes Service
```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Theme } from './themes.schema';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

@Injectable()
export class ThemesService {
  constructor(@InjectModel(Theme.name) private themeModel: Model<Theme>) {}

  async findAll(tenantId: string): Promise<Theme[]> {
    return this.themeModel.find({ tenantId, isPublished: true }).exec();
  }

  async create(createThemeDto: CreateThemeDto, tenantId: string): Promise<Theme> {
    const theme = new this.themeModel({ ...createThemeDto, tenantId });
    return theme.save();
  }

  async update(id: string, updateThemeDto: UpdateThemeDto, tenantId: string): Promise<Theme> {
    return this.themeModel.findOneAndUpdate({ _id: id, tenantId }, updateThemeDto, { new: true }).exec();
  }

  async remove(id: string, tenantId: string): Promise<void> {
    await this.themeModel.deleteOne({ _id: id, tenantId }).exec();
  }
}
```

### ContactMessages Service (with Resend)
```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactMessage } from './contact-messages.schema';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { Resend } from 'resend';

@Injectable()
export class ContactMessagesService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  constructor(@InjectModel(ContactMessage.name) private contactMessageModel: Model<ContactMessage>) {}

  async create(createContactMessageDto: CreateContactMessageDto, tenantId: string): Promise<ContactMessage> {
    const message = new this.contactMessageModel({
      ...createContactMessageDto,
      tenantId,
      sentAt: new Date(),
      isProcessed: false,
    });
    await message.save();

    // Send email via Resend
    await this.resend.emails.send({
      from: 'contact@daidev.com',
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${createContactMessageDto.name}`,
      html: `<p>${createContactMessageDto.message}</p><p>From: ${createContactMessageDto.email}</p>`,
    });

    return message;
  }
}
```

## Environment Variables
```plaintext
# .env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/daidev
RESEND_API_KEY=<resend-api-key>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
JWT_SECRET=<jwt-secret>
```

## Deployment
- **Railway**: Host the Nest.js app and connect to MongoDB Atlas.
- **MongoDB Atlas**: Configure a cluster with indexes for `tenantId`, tags, and text search.
- **CI/CD**: Use GitHub Actions to automate testing and deployment.
  - Example workflow: Lint, test, build, and deploy to Railway on push to `main`.

## Security
- **Authentication**: Use Auth.js with JWT for secure sessions.
- **reCAPTCHA**: Validate contact form submissions to prevent spam.
- **Role-Based Access**: Restrict CRUD operations to `admin` role in the Admin Dashboard.
- **Data Isolation**: Enforce `tenantId` filtering in all services and queries.

## Future Considerations
- **GraphQL**: Add a GraphQL module for flexible querying (e.g., `themes` with nested `tags`).
- **Rate Limiting**: Implement rate limiting for public endpoints (e.g., contact form).
- **Logging**: Add Winston or similar for logging API requests and errors.
- **Marketplace**: Extend the `Themes` module with `price` and `isForSale` fields, and add an `Orders` module.

## Conclusion
The **daidev** backend is a modular, secure, and scalable Nest.js application that supports multi-tenancy, i18n, and integrations with Cloudinary and Resend. It provides a robust API for the public web app and admin dashboard, with a clear path for future extensions like a theme marketplace.