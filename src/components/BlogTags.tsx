"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { blogTagsQuery } from "@/sanity/lib/query/blog";
import Link from "next/link";

interface BlogTagsProps {
  selectedTag?: string;
  onTagSelect?: (tag: string | null) => void;
}

export default function BlogTags({ selectedTag, onTagSelect }: BlogTagsProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await client.fetch(blogTagsQuery);
        setTags(data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des tags :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (isLoading) {
    return (
      <div className="py-4">
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="py-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagSelect?.(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedTag
              ? "bg-orange-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Tous
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect?.(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === tag
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
