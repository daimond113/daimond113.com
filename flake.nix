{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };
  outputs =
    inputs:
    let
      eachSystem = inputs.nixpkgs.lib.genAttrs (import inputs.systems);
      pkgsFor = eachSystem (
        system:
        import inputs.nixpkgs {
          inherit system;
        }
      );
    in
    {
      packages = eachSystem (system: {
        default = pkgsFor.${system}.callPackage ./default.nix { };
      });

      devShells = eachSystem (system: {
        default = pkgsFor.${system}.mkShell {
          packages = with pkgsFor.${system}; [
            nodejs
            pnpm
          ];

          shellHook = ''
            pnpm install
          '';
        };
      });
    };
}
