export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://payrollpal.fly.dev"
    : "http://localhost:3000";
