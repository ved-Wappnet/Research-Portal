import { NextResponse } from 'next/server';
import db from '@/lib/database';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Find user by ID
    const user = await db.User.findByPk(id, {
      attributes: { 
        exclude: ['password'] // Exclude password from the response
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution,
        avatar: user.avatar,
        bio: user.bio,
        website: user.website,
        orcid: user.orcid,
        researchInterests: user.researchInterests || [],
        position: user.position,
        education: user.education || [],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Prevent updating certain fields
    const { id: _, email, role, ...updateData } = data;

    // Find user by ID
    const user = await db.User.findByPk(id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user
    await user.update(updateData);

    // Get updated user data (excluding password)
    const updatedUser = await db.User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update profile',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
