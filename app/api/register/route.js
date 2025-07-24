import db from '@/lib/database';
import { generateToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password, role, institution } = await req.json();

    // Validate required fields with specific error messages
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (role === undefined || role === '') missingFields.push('role');
    
    if (missingFields.length > 0) {
      return Response.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}`,
          missingFields
        },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Validate password strength
    if (password.length < 8) {
      return Response.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Validate and normalize role
    const validRoles = [0, 1, 2]; // 0 = author, 1 = reviewer, 2 = editor
    
    // Convert role to number if it's a string
    const roleNumber = typeof role === 'string' ? parseInt(role, 10) : Number(role);
    
    console.log('Received role:', { original: role, type: typeof role, parsed: roleNumber });
    
    // Check if the role is a valid number and within the allowed range
    if (isNaN(roleNumber) || !validRoles.includes(roleNumber)) {
      return Response.json(
        { 
          success: false, 
          message: 'Invalid role. Must be one of: 0 (author), 1 (reviewer), 2 (editor)',
          receivedRole: role,
          type: typeof role
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return Response.json(
        { success: false, message: 'Email already registered' },
        { status: 409 }
      );
    }

    try {
      // Create user - password will be hashed by the model's beforeCreate hook
      const user = await db.User.create({
        name,
        email,
        password, // Will be hashed by the model's beforeCreate hook
        role: roleNumber, // Store as number (0, 1, or 2)
        institution,
      });

      console.log('User created successfully:', {
        id: user.id,
        email: user.email,
        role: user.role,
        roleType: typeof user.role
      });

      // Generate JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Set HTTP-only cookie
      cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      // Return success response without sensitive data
      return Response.json(
        {
          success: true,
          message: 'Registration successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            institution: user.institution,
          },
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Registration error details:', {
        name: error.name,
        message: error.message,
        errors: error.errors?.map(e => ({
          message: e.message,
          type: e.type,
          path: e.path,
          value: e.value,
          validatorKey: e.validatorKey,
        })),
        stack: error.stack
      });
      
      // Provide more specific error messages based on the error type
      let errorMessage = 'Registration failed. Please try again.';
      if (error.name === 'SequelizeUniqueConstraintError') {
        errorMessage = 'This email is already registered.';
      } else if (error.name === 'SequelizeValidationError') {
        errorMessage = 'Validation error. Please check your input.';
      }
      
      return Response.json(
        { success: false, message: errorMessage },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { success: false, message: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
