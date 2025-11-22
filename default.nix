{
  stdenv,
  bun2nix,
  lib,
  ...
}:
let
  package = lib.importJSON ./package.json;
in
stdenv.mkDerivation {
  pname = package.name;
  version = package.version;

  src = ./.;

  nativeBuildInputs = [
    bun2nix.hook
  ];

  bunDeps = bun2nix.fetchBunDeps {
    bunNix = ./bun.nix;
  };

  buildPhase = ''
    bun run build
  '';

  installPhase = ''
    mkdir -p $out/dist

    cp -R ./dist $out
  '';
}
