declare module "pdf-parse" {
  export default function pdfParse(
    data: Buffer,
  ): Promise<{ readonly text: string }>;
}
