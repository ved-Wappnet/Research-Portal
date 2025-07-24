import { api } from './api';

export interface GetProfileRequest {
  id: string;
}

export interface UpdateProfileRequest {
  id: string;
  name?: string;
  institution?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  orcid?: string;
  researchInterests?: string[];
  position?: string;
  education?: { degree: string; institution: string; year: string }[];
}

export interface ProfileResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: number;
    institution?: string;
    avatar?: string;
    bio?: string;
    website?: string;
    orcid?: string;
    researchInterests?: string[];
    position?: string;
    education?: { degree: string; institution: string; year: string }[];
    createdAt?: string;
    updatedAt?: string;
  };
}

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<ProfileResponse, GetProfileRequest>({
      query: ({ id }) => ({
        url: `profile/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Profile', id: arg.id }],
    }),
    updateProfile: build.mutation<ProfileResponse, UpdateProfileRequest>({
      query: (body) => {
        const { id, ...updateData } = body;
        return {
          url: `profile/${id}`,
          method: 'PUT',
          body: updateData,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Profile', id: arg.id }]
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
