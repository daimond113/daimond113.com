{
  stdenv,
  nodejs,
  pnpm,
  pnpmConfigHook,
  fetchPnpmDeps,
  lib,
  ...
}:
let
  package = lib.importJSON ./package.json;
in
stdenv.mkDerivation (finalAttrs: {
  pname = package.name;
  version = package.version;

  src = ./.;

  nativeBuildInputs = [
    nodejs
    pnpm
    pnpmConfigHook
  ];

  buildPhase = ''
    runHook preBuild

    pnpm build

    runHook postBuild
  '';

  installPhase = ''
    mkdir -p $out/dist

    cp -R ./dist $out
  '';

  pnpmDeps = fetchPnpmDeps {
    inherit (finalAttrs) pname version src;
    fetcherVersion = 4;
    hash = "sha256-W6T1mEtsNUSYkEVg97H4UgxZwXoQx2CykeJCjpVG0jQ=";
  };
})