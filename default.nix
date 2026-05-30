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
    fetcherVersion = 3;
    hash = "sha256-UER6Or1QGHuHIoWIGbSzBdRxjV70Gdq3I/4I6P5BB9E=";
  };
})