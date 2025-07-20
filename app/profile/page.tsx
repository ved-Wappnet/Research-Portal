"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/services/profileService";
import { skipToken } from "@reduxjs/toolkit/query";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Upload,
  User,
  Building,
  FileText,
  Award,
  Calendar,
  Loader,
} from "lucide-react";
import { RegisterRoleEnum } from "@/data/constant";
import AddInterestInput from "./AddInterestInput";

export default function ProfilePage() {
  const { user } = useAuth();
  type Education = { degree: string; institution: string; year: string };
  type EducationEntry = { degree: string; institution: string; year: string };
  type ProfileData = {
    name: string;
    email: string;
    institution: string;
    avatar: string;
    bio: string;
    website: string;
    orcid: string;
    researchInterests: string[];
    position: string;
    education: EducationEntry[];
    _newInterest: string;
  };

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    institution: "",
    avatar: "",
    bio: "",
    website: "",
    orcid: "",
    researchInterests: [],
    position: "",
    education: [],
    _newInterest: "",
  });
  const userId = user?.id || user?._id;
  console.log("user", user);
  console.log("userId", userId);
  const [updateProfile, { isLoading: saving }] = useUpdateProfileMutation();
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Only fetch profile if userId exists
  const { data, isLoading, isFetching, error, refetch } = useGetProfileQuery(
    userId ? { id: userId } : skipToken,
    { skip: !userId }
  );
  if (!userId) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-red-600 font-semibold">
          User ID not found. Please log out and log in again.
          <br />
          If the problem persists, contact support.
        </div>
      </DashboardLayout>
    );
  }

  useEffect(() => {
    if (data && data.user) {
      setProfileData({
        name: data.user.name || "",
        email: data.user.email || "",
        institution: data.user.institution || "",
        avatar: data.user.avatar || "",
        bio: data.user.bio || "",
        website: data.user.website || "",
        orcid: data.user.orcid || "",
        researchInterests: data.user.researchInterests || [],
        position: data.user.position || "",
        education: data.user.education || [],
        _newInterest: "",
      });
      setFetchError(null);
    } else if (error) {
      setFetchError(
        (error as any)?.data?.error ||
          (typeof error === "string" ? error : "Failed to fetch profile.")
      );
    }
  }, [data, error]);

  const handleSave = async () => {
    const userId = user?.id || user?._id;
    if (!userId) {
      alert("User ID not found. Please log out and log in again.");
      return;
    }
    try {
      setUpdateError(null);
      // Don't send _newInterest to backend
      const { _newInterest, ...toSave } = profileData;
      await updateProfile({
        id: userId,
        ...toSave,
      }).unwrap();
      refetch();
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setUpdateError(
        error?.data?.error ||
          (typeof error === "string" ? error : "Failed to update profile.")
      );
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: "Papers Published", value: "12", icon: FileText },
    { label: "Citations", value: "156", icon: Award },
    { label: "H-Index", value: "8", icon: Award },
    { label: "Years Active", value: "5", icon: Calendar },
  ];

  const recentActivity = [
    {
      type: "paper",
      title: "Published: Machine Learning in Climate Science",
      date: "2024-01-15",
    },
    {
      type: "review",
      title: "Completed review for Quantum Computing paper",
      date: "2024-01-12",
    },
    {
      type: "paper",
      title: "Submitted: Sustainable Energy Systems Analysis",
      date: "2024-01-10",
    },
    {
      type: "citation",
      title: "Paper cited in Nature Climate Change",
      date: "2024-01-08",
    },
  ];
  // Removed researchInterests, bio, website, orcid fields to match backend
  if (!user) {
    return null;
  }

  if (isLoading || isFetching) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Error Handling UI */}
        {fetchError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center justify-between">
            <div>
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{fetchError}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => refetch()}>
                Retry
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setFetchError(null)}
              >
                ×
              </Button>
            </div>
          </div>
        )}
        {updateError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center justify-between">
            <div>
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{updateError}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setUpdateError(null)}
            >
              ×
            </Button>
          </div>
        )}
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your profile information and research details
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                  <Badge variant="secondary" className="mt-2 capitalize">
                    {(() => {
                      switch (user.role) {
                        case RegisterRoleEnum.author:
                          return "Author";
                        case RegisterRoleEnum.reviewer:
                          return "Reviewer";
                        case RegisterRoleEnum.editor:
                          return "Editor";
                        default:
                          return "Unknown";
                      }
                    })()}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span>{user.institution}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Research Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Research Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList>
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="research">Research Profile</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        value={profileData.institution}
                        onChange={(e) =>
                          handleInputChange("institution", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={profileData.website}
                          onChange={(e) =>
                            handleInputChange("website", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="orcid">ORCID ID</Label>
                        <Input
                          id="orcid"
                          value={profileData.orcid}
                          onChange={(e) =>
                            handleInputChange("orcid", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="research" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Research Profile</CardTitle>
                    <CardDescription>
                      Manage your research interests and academic information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Research Interests</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profileData?.researchInterests?.map(
                          (interest, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center animate-fade-in"
                            >
                              {interest}
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="ml-2 p-0 text-xs"
                                aria-label={`Remove interest ${interest}`}
                                onClick={() => {
                                  setProfileData((prev) => ({
                                    ...prev,
                                    researchInterests:
                                      prev.researchInterests.filter(
                                        (_, i) => i !== index
                                      ),
                                  }));
                                }}
                              >
                                ×
                              </Button>
                            </Badge>
                          )
                        )}
                      </div>
                      <AddInterestInput
                        value={profileData._newInterest}
                        interests={profileData.researchInterests}
                        onChange={(val) =>
                          setProfileData((prev) => ({
                            ...prev,
                            _newInterest: val,
                          }))
                        }
                        onAdd={(val) =>
                          setProfileData((prev) => ({
                            ...prev,
                            researchInterests: [
                              ...prev.researchInterests,
                              val.trim(),
                            ],
                            _newInterest: "",
                          }))
                        }
                        onClear={() =>
                          setProfileData((prev) => ({
                            ...prev,
                            _newInterest: "",
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label>Position</Label>
                      <Input
                        type="text"
                        placeholder="Current Position (e.g., Senior Research Scientist)"
                        value={profileData.position}
                        onChange={(e) =>
                          handleInputChange("position", e.target.value)
                        }
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Education</Label>
                      <div className="mt-2 space-y-2">
                        {profileData.education.map((edu, idx) => (
                          <div
                            key={idx}
                            className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center gap-2"
                          >
                            <Input
                              type="text"
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => {
                                setProfileData((prev) => {
                                  const updated = [...prev.education];
                                  updated[idx] = {
                                    ...updated[idx],
                                    degree: e.target.value,
                                  };
                                  return { ...prev, education: updated };
                                });
                              }}
                              className="md:w-1/3"
                            />
                            <Input
                              type="text"
                              placeholder="Institution"
                              value={edu.institution}
                              onChange={(e) => {
                                setProfileData((prev) => {
                                  const updated = [...prev.education];
                                  updated[idx] = {
                                    ...updated[idx],
                                    institution: e.target.value,
                                  };
                                  return { ...prev, education: updated };
                                });
                              }}
                              className="md:w-1/3"
                            />
                            <Input
                              type="text"
                              placeholder="Year"
                              value={edu.year}
                              onChange={(e) => {
                                setProfileData((prev) => {
                                  const updated = [...prev.education];
                                  updated[idx] = {
                                    ...updated[idx],
                                    year: e.target.value,
                                  };
                                  return { ...prev, education: updated };
                                });
                              }}
                              className="md:w-1/6"
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="ml-2"
                              onClick={() => {
                                setProfileData((prev) => ({
                                  ...prev,
                                  education: prev.education.filter(
                                    (_, i) => i !== idx
                                  ),
                                }));
                              }}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setProfileData((prev) => ({
                              ...prev,
                              education: [
                                ...prev.education,
                                { degree: "", institution: "", year: "" },
                              ],
                            }));
                          }}
                        >
                          Add Education
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your recent research activities and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 pb-4 border-b last:border-b-0"
                        >
                          <div className="flex-shrink-0 mt-1">
                            {activity.type === "paper" && (
                              <FileText className="h-4 w-4 text-blue-500" />
                            )}
                            {activity.type === "review" && (
                              <User className="h-4 w-4 text-green-500" />
                            )}
                            {activity.type === "citation" && (
                              <Award className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {activity.title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
