import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// GET /api/profile - get current user profile
export async function GET(req) {
  try {
    // Replace this with your own session/user extraction logic
    // Example: get user id from headers, cookies, or session
    // For now, we'll use a query param (?id=...)
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    await connectToDatabase();
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // Ensure all relevant fields are returned
    const {
      _id, name, email, role, institution, avatar, bio, website, orcid, researchInterests, position, education, createdAt, updatedAt
    } = user;
    return NextResponse.json({
      user: {
        id: _id,
        name,
        email,
        role,
        institution: institution || '',
        avatar: avatar || '',
        bio: bio || '',
        website: website || '',
        orcid: orcid || '',
        researchInterests: researchInterests || [],
        position: position || '',
        education: education || [],
        createdAt,
        updatedAt,
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

// PUT /api/profile - update current user profile
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, institution, avatar, bio, website, orcid, researchInterests, position, education } = body;
    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    await connectToDatabase();
    console.log('PUT /api/profile payload:', body);
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { name, institution, avatar, bio, website, orcid, researchInterests, position, education } },
      { new: true, runValidators: true, select: '-password' }
    );
    console.log('Updated user:', user);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
