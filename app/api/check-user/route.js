import db from '@/lib/database';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await db.User.findByPk(userId);

    if (!user) {
      return NextResponse.json(
        { exists: false, message: 'User not found' },
        { status: 200 }
      );
    }

    return NextResponse.json({
      exists: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (err) {
    console.error('Error checking user:', err);
    return NextResponse.json(
      { error: 'Failed to check user', details: err.message },
      { status: 500 }
    );
  }
}
