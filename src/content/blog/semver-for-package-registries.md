---
title: "SemVer for package registries"
description: "My thoughts on using SemVer in package registries"
pubDate: "August 07 2026 13:25 GMT+2"
---

This blog post describes my thoughts on SemVer and does not intend to attack
anyone or anything mentioned. It is based on personal views and is meant to
express my opinion, not declare anything as a hard fact or lie.

So, you want to use SemVer for your package registry. It's a great choice -
it works great for dependencies. Properly declared dependencies get to benefit
from bug fixes to packages, and dependency resolution is able to really
effectively deduplicate installs. However, there are some issues you'll be able
to spot earlier or later.

## Build metadata

Build metadata was added to SemVer 2.0.0-rc.2 in [this pull request](https://github.com/semver/semver/pull/77), replacing 2.0.0-rc.1's build versions. They differ in that build metadata
is completely ignored when calculating the precedence of a version. This may
seem like something useful at first, but when you look at it deeper you start to
see some cracks.

If you're beginning a new project and you assign this field meaning, you're
effectively turning the general purpose "comment" field into a specialised
field. Applications are not required to understand this, and enforcing a closed
set of acceptable values is solved better with a proper field in your
distribution system, e.g. as OCI manifests carry the architecture through a
separate field. Additionally, if you've any versions that have already been
published (existing projects), this is especially troublesome: all versions
specifying this can be reinterpreted as something not intended, making it
a breaking change.

With that, I'd like to explain why I find the original reasoning not convincing. 

1. cache busting: SemVer demands versioned artefacts be immutable, so what cache
is there to bust?
1. layering custom behaviour on top of SemVer: a meta field should probably not
be part of a general specification. Meta fields are most likely better
represented somewhere else
1. bookkeeping versions: this also doesn't really fit into a specification like
SemVer. For example, Git tags are a much more powerful and useful system than
adding a commit hash to the version is. It also means that consumers don't need
to see your internal bookkeeping

SemVer is also ambiguous about how to treat build metadata. Precedence excludes
it from comparisons, but should `1.2.3+hello` and `1.2.3+goodbye` be allowed to
coexist? If not, the meaning of this field is even weaker: why not put this data
into your README or a comment? If yes, how do you select the one you want?
Precedence explicitly tells you that the versions are precisely equal to SemVer.
If you sort by things like release date, your resolution is now
nondeterministic; `=1.2.3` will return a different version literally based on
the phase of the moon. If you sort by its string representation, you're
relying on non SemVer behaviour. This is a [documented issue](https://github.com/semver/semver/issues/1148)
so hopefully this behaviour could get, at the very least, standardised.

## Prereleases

Prereleases are great: they clearly indicate that something has not reached the
final form just as a 0 major does. However, their representation can become the
Achilles heel.

Prereleases' alphabet includes `[a-zA-Z]`. Spot the issue? `1.2.3-hello` is a
completely different version to `1.2.3-Hello`. While SemVer has specified how to
sort them as well as allowing you to select them, meaning this isn't a
determinism issue; it creates confusing UX and potential for mistakes. A human
will, according to my experience, not pay attention to the case, creating an
opportunity for exploitation or, at the very least, incredible confusion.

## Major versions

SemVer says that a minor and patch should be increased as a result of
appropriate changes, but the conditions have an important bound: for major > 0.

This means that versioning for a 0 major is basically a free-for-all. This is,
of course, only fair: the public API is not stable. However, it means that
resolution can't depend on any API contracts during this phase of development.
I find this partially harmful to development as it punishes developers for not
having figured out an API. Cargo's take on this is, from my point of view,
really good: when major = 0 and minor != 0, the fields essentially get shifted: minor becomes
"major", patch becomes "minor". This allows dependency resolution to depend on
the public API not having been broken, which means dependency requirements
needn't be required (which requires publishing a new version of all consumers)
unless the API has actually changed. In my opinion, this is great for
development: the package is clearly still in development, but there is still
some API contract that can be upheld.

## Potential concerns

There are also some things I find concerning about SemVer's development.

### Tilde as an alias for a hyphen

Prereleases are currently only separated with a hyphen. This is really neat:
there is only one valid representation. However, a [pull request](https://github.com/semver/semver/pull/209)
is open on the SemVer repository. While it has been met with some disapproval,
the main issue brought up seems to be that it could be a breaking change as
opposed to creating 2 representations of the same thing - `1.2.3~hello` and
`1.2.3-hello` would be the same version. This I find concerning in particular
because it opens a wide array of exploitation paths powered by confusion
attacks. A reviewer gave 2 additional reasons, none of which were directly
disapproving the creation of multiple representations: doubling the amount of
tests and removing the tilde from being given a true separate functional
meaning. The original justification feels weak, too: package managers were
forbidding or confusing the version's bounds because of the hyphen. This, in my
opinion, is not SemVer's problem to solve; the projects should adopt a strategy
that clearly identifies individual fields and reconsider their version format
limits.

I reckon that a single version should have only one possible representation. Any
aliases should not be part of the SemVer spec and should not be acceptable by
it.

## Summary

I really like SemVer 2.0.0, but I also believe it isn't in a state where it can
be "just used". In my own package manager,
[pesde](https://github.com/pesde-pkg/pesde), I've chosen to support only a
subset of [(Cargo) SemVer](#major-versions). I do not allow versions for pesde
registries to specify build metadata at all, and prereleases are forced to be in
lowercase ASCII. This means that you can reliably depend on `=1.2.3` resolving
to the same version and a prerelease confusion attack being impossible.

Unless a use-case is found, I have no plans on changing this. However, as pesde
uses a subset, going to the full set is simple. For build metadata, this would
constitute adding a new field to the version's state: `1.2.3+hello` would be
stored as `1.2.3 => { build_metadata: "hello", archive_hash: ... }` to ensure
that version selectors remain deterministic. Going from lowercase to mixed case
for prereleases is even simpler: just make the registry stop disallowing it.

I'd be interested to see others' opinions on this topic; perhaps there is some
use case that I simply am not aware of. If you have anything to add, please do
reach out.