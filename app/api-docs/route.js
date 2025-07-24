import swaggerJSDoc from 'swagger-jsdoc';
import { NextResponse } from 'next/server';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Research Portal API',
      version: '1.3.0',
      description: 'API documentation for Research Portal',
      contact: {
        name: 'API Support',
        email: 'support@researchportal.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in format: Bearer <token>'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: '7f415d8b-ab30-473a-8384-08bc36a24351' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            role: { type: 'integer', enum: [0, 1, 2], description: '0=Author, 1=Reviewer, 2=Editor', example: 0 },
            institution: { type: 'string', example: 'Research University' },
            avatar: { type: 'string', format: 'uri', example: 'https://example.com/avatar.jpg' },
            bio: { type: 'string', example: 'Researcher in Computer Science' },
            website: { type: 'string', format: 'uri', example: 'https://example.com' },
            orcid: { type: 'string', example: '0000-0002-1825-0097' },
            researchInterests: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['Machine Learning', 'Artificial Intelligence']
            },
            position: { type: 'string', example: 'Senior Researcher' },
            education: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  degree: { type: 'string', example: 'PhD in Computer Science' },
                  institution: { type: 'string', example: 'MIT' },
                  year: { type: 'string', example: '2020' }
                }
              }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Error message' },
            details: { type: 'string', example: 'Detailed error information' }
          }
        }
      }
    },
    paths: {
      '/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password', 'role'],
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', format: 'password' },
                    role: { type: 'integer', enum: [0, 1, 2], description: '0=Author, 1=Reviewer, 2=Editor' },
                    institution: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            201: { 
              description: 'User registered successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      user: { $ref: '#/components/schemas/User' },
                      message: { type: 'string', example: 'Registration successful!' }
                    }
                  }
                }
              }
            },
            400: { $ref: '#/components/responses/BadRequest' },
            409: { $ref: '#/components/responses/Conflict' },
            500: { $ref: '#/components/responses/ServerError' }
          }
        }
      },
      '/login': {
        post: {
          tags: ['Auth'],
          summary: 'User login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', format: 'password' }
                  }
                }
              }
            }
          },
          responses: {
            200: { 
              description: 'Login successful',
              headers: {
                'Set-Cookie': {
                  schema: { type: 'string' },
                  description: 'Sets an HTTP-only cookie with the JWT token'
                }
              },
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      user: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            },
            400: { $ref: '#/components/responses/BadRequest' },
            401: { $ref: '#/components/responses/Unauthorized' },
            500: { $ref: '#/components/responses/ServerError' }
          }
        }
      },
      '/profile/{id}': {
        get: {
          tags: ['Profile'],
          summary: 'Get user profile by ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
              description: 'User ID',
              example: '7f415d8b-ab30-473a-8384-08bc36a24351'
            }
          ],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { 
              description: 'Profile retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      user: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    error: 'Authentication required',
                    details: 'No token provided or token expired'
                  }
                }
              }
            },
            404: {
              description: 'Not Found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    error: 'User not found',
                    details: 'No user found with the specified ID'
                  }
                }
              }
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    error: 'Internal server error',
                    details: 'An unexpected error occurred'
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Profile'],
          summary: 'Update user profile',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
              description: 'User ID',
              example: '7f415d8b-ab30-473a-8384-08bc36a24351'
            }
          ],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                  readOnly: ['id', 'email', 'role', 'createdAt', 'updatedAt']
                }
              }
            }
          },
          responses: {
            200: { 
              description: 'Profile updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Profile updated successfully' },
                      user: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Bad Request',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    error: 'Invalid input data',
                    details: 'Detailed validation errors...'
                  }
                }
              }
            },
            401: {
              description: 'Unauthorized',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    error: 'Authentication required',
                    details: 'No token provided or token expired'
                  }
                }
              }
            },
            403: {
              description: 'Forbidden',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    error: 'Insufficient permissions',
                    details: 'You do not have permission to perform this action'
                  }
                }
              }
            },
            404: {
              description: 'Not Found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    error: 'User not found',
                    details: 'No user found with the specified ID'
                  }
                }
              }
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: {
                    success: false,
                    error: 'Internal server error',
                    details: 'An unexpected error occurred'
                  }
                }
              }
            }
          }
        }
      },
      '/health': {
        get: {
          tags: ['System'],
          summary: 'Health check',
          description: 'Check if the API is running',
          responses: {
            200: {
              description: 'API is healthy',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', example: 'ok' },
                      timestamp: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // Common response schemas are now inlined in each endpoint
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  // Paths to files containing OpenAPI definitions (for automatic documentation)
  apis: [
    './app/api/register/route.js',
    './app/api/login/route.js',
    './app/api/profile/[id]/route.js',
    './app/api/health/route.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

// Create a simple HTML page with Swagger UI
const getSwaggerHtml = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Research Portal API Docs</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"></script>
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            spec: ${JSON.stringify(swaggerSpec, null, 2)},
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
          });
        };
      </script>
    </body>
    </html>
  `;
};

export async function GET() {
  return new NextResponse(getSwaggerHtml(), {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
