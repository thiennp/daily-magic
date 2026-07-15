import { buildAppOriginFromHeaders } from "@/lib/agentWitch/resolveAgentWitchAppOrigin";
import {
  buildAgentWitchInstructionDocument,
  findAgentWitchInstructionSection,
} from "@/lib/agentWitch/instructions/buildAgentWitchInstructionDocument";
import { formatAgentWitchInstructionsAsText } from "@/lib/agentWitch/instructions/formatAgentWitchInstructionsAsText";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
} as const;

const isTextFormat = (value: string | null): boolean =>
  value === "text" || value === "markdown" || value === "md";

export const handleAgentWitchInstructionsGet = (
  request: Request,
  appOrigin: string,
): Response => {
  const document = buildAgentWitchInstructionDocument({ appOrigin });
  const requestUrl = new URL(request.url);
  const sectionId = requestUrl.searchParams.get("section");
  const format = requestUrl.searchParams.get("format");

  if (sectionId !== null && sectionId.length > 0) {
    const section = findAgentWitchInstructionSection(sectionId);

    if (section === undefined) {
      return Response.json(
        { ok: false, error: "Unknown instruction section." },
        { status: 404, headers: NO_STORE_HEADERS },
      );
    }

    if (isTextFormat(format)) {
      return new Response(
        formatAgentWitchInstructionsAsText({
          ...document,
          sections: [section],
        }),
        {
          headers: {
            ...NO_STORE_HEADERS,
            "Content-Type": "text/markdown; charset=utf-8",
          },
        },
      );
    }

    return Response.json(
      {
        ok: true,
        section,
        communication: document.communication,
        api: document.api,
      },
      { headers: NO_STORE_HEADERS },
    );
  }

  if (isTextFormat(format)) {
    return new Response(formatAgentWitchInstructionsAsText(document), {
      headers: {
        ...NO_STORE_HEADERS,
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  }

  return Response.json(
    { ok: true, ...document },
    { headers: NO_STORE_HEADERS },
  );
};

export const resolveAgentWitchInstructionsAppOrigin = (
  headerList: Headers,
): string => buildAppOriginFromHeaders(headerList);
