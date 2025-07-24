import db from '@/lib/database';
import { generateToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email with detailed logging
    console.log('Login attempt for email:', email);
    const user = await db.User.findOne({ where: { email } });
    
    if (!user) {
      console.log('No user found with email:', email);
      return Response.json(
        { 
          success: false, 
          message: 'No account found with this email. Please register first.',
          error: 'user_not_found'
        },
        { status: 401 }
      );
    }

    // Debug: Log stored password hash and input password
    console.log('Stored password hash:', user.password ? '[HASH PRESENT]' : '[NO PASSWORD HASH]');
    console.log('Password length in DB:', user.password ? user.password.length : 0);
    
    // Check password
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
      console.log('Password comparison result:', isMatch);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return Response.json(
        { 
          success: false, 
          message: 'Authentication error',
          error: 'password_compare_error'
        },
        { status: 500 }
      );
    }
    
    if (!isMatch) {
      return Response.json(
        { 
          success: false, 
          message: 'Incorrect password',
          error: 'invalid_password'
        },
        { status: 401 }
      );
    }

    // Generate JWT token with numeric role
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role, // This is now a number (0, 1, or 2)
    });
    
    console.log('Generated token for user:', { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });

    // Set HTTP-only cookie
    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    
    return Response.json({
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
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
