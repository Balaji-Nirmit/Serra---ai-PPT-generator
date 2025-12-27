-- Custom SQL to safely cast existing TEXT column to TEXT[]
ALTER TABLE "projectsTable" 
ALTER COLUMN "outlines" 
SET DATA TYPE text[] 
USING CASE 
    -- If the old column value is NULL, use an empty array
    WHEN "outlines" IS NULL THEN '{}'::text[]
    -- If the old column value is NOT NULL, convert it into a single-element array
    ELSE ARRAY["outlines"]::text[] 
END;