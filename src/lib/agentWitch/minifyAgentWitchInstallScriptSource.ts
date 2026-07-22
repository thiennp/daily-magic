import type { transform as EsbuildTransform } from "esbuild";

const esbuildTransformRef: {
  transform?: typeof EsbuildTransform;
} = {};

const loadEsbuildTransform = async (): Promise<typeof EsbuildTransform> => {
  if (esbuildTransformRef.transform === undefined) {
    const esbuild = await import("esbuild");
    esbuildTransformRef.transform = esbuild.transform;
  }

  return esbuildTransformRef.transform;
};

export const minifyAgentWitchInstallScriptSource = async (
  source: string,
  scriptName: string,
): Promise<string> => {
  const transform = await loadEsbuildTransform();
  const { code } = await transform(source, {
    loader: "ts",
    format: "esm",
    minify: true,
    target: "node18",
    legalComments: "none",
    sourcefile: scriptName,
  });

  return code;
};
