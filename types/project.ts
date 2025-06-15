export interface Project {
  title: string;
  img_url: string;
  description_hu: string;
  description_en: string;
  live_url: string;
  github_url: string;
  created_at?: string;
  tags?: string[]; // ha vannak tagek
}
