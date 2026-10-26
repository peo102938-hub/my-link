"use client";

import { useEffect, useState } from "react";
import { ProfileData, LinkItem } from "@/types/profile";
import initialMockProfile from "@/data/mock-profile.json";

export const STORAGE_KEY = "mylink_profile_data";

export function useProfileStorage() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ProfileData;
        setData(parsed);
      } else {
        // DATA-01: Auto Seed if storage is empty
        const initialData = initialMockProfile as ProfileData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        setData(initialData);
      }
    } catch (error) {
      console.error("Failed to load profile data from localStorage:", error);
      setData(initialMockProfile as ProfileData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = (newData: ProfileData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setData(newData);
    } catch (error) {
      console.error("Failed to update profile data in localStorage:", error);
    }
  };

  const addLink = (newLink: Omit<LinkItem, "id"> | LinkItem) => {
    if (!data) return;

    const linkItem: LinkItem =
      "id" in newLink && newLink.id
        ? (newLink as LinkItem)
        : {
            ...newLink,
            id: `link_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          };

    const updatedData: ProfileData = {
      ...data,
      links: [linkItem, ...data.links],
    };

    updateProfile(updatedData);
  };

  return {
    data,
    isLoading,
    updateProfile,
    addLink,
  };
}
