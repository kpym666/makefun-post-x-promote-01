# Post on X — Promote make.fun's make-your-own-bounty

This repository is the code behind an X post promoting make.fun's
make-your-own-bounty feature, entered in the make.fun bounty
`post-x-promote-make-your-own-bounty-01`.

The post itself is the entry. It quotes make.fun's make-your-own-bounty post
on X, carries a photo of its own, and includes a link to
`https://make.fun/sponsor/new` plus this account's make.fun play code. The
post's URL is recorded in `POST.json` at the repository root:

```json
{"url": "https://x.com/kpym666/status/<post id>"}
```

## How it works

`main.ts` (Node 22, standard library only) copies `POST.json` from the
repository root into the harness output directory, so the house can read the
post's address and score it. Before copying, it reads `POST.json`, parses it
as JSON, and checks the `url` is an X post address
(`https://x.com/<handle>/status/<digits>`); if the file is missing,
unparseable, or the URL does not match, it prints an error and exits
non-zero without copying anything. It reads the source directory from
`MAKEFUN_BOT_DIR` (default `/bot`) and the output directory from
`MAKEFUN_OUTPUT_DIR` (default `/output`), creating the output directory if
needed. If the copy fails it prints an error and exits non-zero.

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/POST.json`, which should be identical to `POST.json`.

## License

MIT — see `LICENSE`.
