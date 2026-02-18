"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { useToken } from "@/provider/auth.provider";

const UserMeta = () => {
  const token = useToken();
  const [avatar, setAvatar] = useState("/images/avatar/avatar-77.jpg");
  const [profile, setProfile] = useState({ name: "", role: "" });
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAvatar(data.data.image || "/images/avatar/avatar-77.jpg");
      setProfile({ name: data.data.name, email: data.data.email });
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true);
      try {
        const response = await fetch(
          `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/change-image`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        if (response.ok) {
          await fetchProfile();
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-[124px] h-[124px] relative rounded-full">
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
            width={124}
            height={124}
          />
          <Button
            asChild
            size="icon"
            className="h-8 w-8 rounded-full cursor-pointer absolute bottom-0 right-0"
            disabled={loading}
          >
            <Label htmlFor="image">
              <Icon
                className="w-5 h-5 text-primary-foreground"
                icon="heroicons:pencil-square"
              />
            </Label>
          </Button>
          <Input
            type="file"
            className="hidden"
            id="avatar"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>
        <div className="mt-4 text-xl font-semibold text-default-900">
          {profile.name}
        </div>
        <div className="mt-1.5 text-sm font-medium text-default-500">
          {profile.email}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserMeta;
