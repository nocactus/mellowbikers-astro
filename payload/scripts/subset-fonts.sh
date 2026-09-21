#!/usr/bin/env bash
#
# Subset Inter Variable naar wat deze site daadwerkelijk gebruikt.
#
# De volledige fonts zijn samen 721 KiB en werden op elke pagina geladen —
# meer dan alle afbeeldingen van de homepage bij elkaar. Gesubset blijft er
# 162 KiB over, zonder zichtbaar verschil:
#
#   - tekenset latin + latin-ext (Nederlands plus buitenlandse namen)
#   - `wght` blijft variabel van 400 tot 900; de site gebruikt medium,
#     semibold, bold en black, en niets lichter dan regular
#   - `opsz` vastgezet op 16, want optische grootte wordt nergens
#     aangeroepen
#   - alleen de layout-features die je in lopende tekst nodig hebt
#
# Emoji staan bewust niet in de subset: die rendert het systeemfont, niet
# Inter. Dat was al zo met het volledige font.
#
# Draaien vanuit payload/. Vereist fontTools en brotli:
#   python3 -m pip install fonttools brotli
#
# De originelen staan in de geschiedenis: git log -- public/fonts

set -euo pipefail

LATIN="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
EXT="U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"
FEATURES='kern,liga,clig,calt,ccmp,locl,mark,mkmk'

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

for f in InterVariable InterVariable-Italic; do
  src="public/fonts/$f.woff2"
  [ -f "$src" ] || { echo "ontbreekt: $src" >&2; exit 1; }

  python3 -m fontTools.varLib.instancer "$src" "opsz=16" "wght=400:900" \
    --output "$tmp/$f.ttf" >/dev/null

  python3 -m fontTools.subset "$tmp/$f.ttf" \
    --unicodes="$LATIN,$EXT" \
    --layout-features="$FEATURES" \
    --flavor=woff2 \
    --output-file="$tmp/$f.woff2" >/dev/null

  voor=$(wc -c < "$src")
  na=$(wc -c < "$tmp/$f.woff2")
  mv "$tmp/$f.woff2" "$src"
  printf '%-24s %4d KiB -> %3d KiB\n' "$f" $((voor / 1024)) $((na / 1024))
done
