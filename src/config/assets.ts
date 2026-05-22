const publicBase = import.meta.env.BASE_URL;

export const RESUME_HREF = `${publicBase}assets/files/KwonSumin-Resume.pdf`;
export const RESUME_FILENAME = "KwonSumin-Resume.pdf";

/** `public/projects/{slug}/` 정적 에셋 (썸네일·데모 영상 등) */
export function projectPublicUrl(projectSlug: string, fileName: string): string {
  return `${publicBase}projects/${projectSlug}/${fileName}`;
}
