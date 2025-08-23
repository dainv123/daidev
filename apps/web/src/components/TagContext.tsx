import React, { createContext, useContext, useEffect, useState } from "react";
import { getTags } from "../lib/api";
import { Tag } from "../types/api";

interface TagContextValue {
  tags: Tag[];
  tagMap: Record<string, Tag>;
  loading: boolean;
  error: string | null;
}

const TagContext = createContext<TagContextValue>({
  tags: [],
  tagMap: {},
  loading: true,
  error: null,
});

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagMap, setTagMap] = useState<Record<string, Tag>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTags()
      .then((allTags) => {
        setTags(allTags);
        const map: Record<string, Tag> = {};
        allTags.forEach((tag) => {
          map[tag._id] = tag;
        });
        setTagMap(map);
        setLoading(false);
      })
      .catch((err) => {
        setTags([]);
        setTagMap({});
        setError("Failed to load tags");
        setLoading(false);
      });
  }, []);

  return (
    <TagContext.Provider value={{ tags, tagMap, loading, error }}>
      {children}
    </TagContext.Provider>
  );
};

export const useTags = () => useContext(TagContext);
