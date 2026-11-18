# Design decisions

Each entry records the canonical value, the values the screens used, and the reason. Where DESIGN.md's YAML front matter and its prose disagree, the prose wins, because the prose has the component-level detail.

## Colour (light)

| Role | Canonical | Screens used | Reason |
|---|---|---|---|
| Canvas | `#F7F6F2` | `#FAF9F5` (181 occurrences) | Spec prose names this value. Difference is small and the spec is explicit. |
| Surface | `#FFFFFF` | `#FFFFFF` | Already consistent. |
| Border | `#E4E2DC` | `#E3E2DF`, `#BFC9C5` (Material outline palette) | Spec value. The Material greys are the wrong family for a warm canvas. |
| Text primary | `#13181F` | `#1B1C1A` (114 occurrences) | Spec value. Carbon ink reads cooler and is what the spec's contrast work assumes. |
| Text secondary | `#5B6370` | `#5B6370` | Already consistent. |
| Primary accent | `#0E5A4F` | `#0E5A4F` (68) and `#004138` (61) | Two primaries in use. `#0E5A4F` is the spec accent and the button fill. `#004138` is removed. Its role (hover and active) is covered by `#0A4740` and `#073530`. |
| Error | `#A3271C` | `#BA1A1A` (56) | Spec value. The spec says it meets WCAG 2.2 AA. Contrast was not measured in this build, so check it with axe-core when tests are added. |
| Waiting, done, overdue | Spec values | Spec values | Already consistent. |

## Colour (dark)

All dark values come from DESIGN.md. Two are derived, because the spec does not give them:

- `primary-active` dark: `#177565`. Derived to sit one step darker than the spec's hover `#1F9C8A`.
- Status borders in light mode: the spec gives no light borders for status chips. The border matches the subtle background, so the chip has no visible outline in light mode.

## Typography

- **Weights.** Screens load Inter at 100 to 700. The spec uses 400, 500 and 600 only. Weights 100, 300 and 700 are dropped.
- **Scale.** The spec's `headline-xl` at 36px and its `-mobile` variant at 28px become one token plus a responsive override (`text-headline-lg sm:text-headline-xl`). The mobile variants are not separate tokens.
- **Tabular figures.** `.tnum` is applied to money, timestamps, percentages and step numbers. It is not applied to body copy.
- **Font loading.** Inter via `next/font/google`, which self-hosts the font at build time. No request to Google at runtime.

## Shape

The YAML maps `rounded.lg` to 1rem, but the prose says cards are 12px and call that `rounded-lg`. Screens use `rounded-lg` 984 times with no consistent meaning. Decision: name the radii by role (`rounded-card` 12px, `rounded-control` 10px, `rounded-menu` 8px, `rounded-full`). Do not use Tailwind's default radius names for product surfaces.

## Buttons

- All sizes keep a 44px minimum height. The spec sets 44px as the minimum touch target, so the small size changes type size only, not hit area.
- Destructive is text-only, as the spec says. Use it only for irreversible actions (scope deletion, contract cancellation, payment rejection). Those actions also need a confirmation dialog.
- Loading state disables the button and shows a spinner. The spinner is `motion-safe:`, so it stops under `prefers-reduced-motion`.

## Status chips

Every chip pairs a 12px lucide icon with text. Colour is never the only signal, as the spec requires.

## Milestone stepper

- Desktop and tablet (`sm` and up): the full six-stage rail.
- Phone (below `sm`): "Step X of 6", the current stage name, and a six-segment bar. The spec allowed a scroll strip or a step indicator. The indicator was chosen because it reads at a glance and needs no horizontal scroll.
- Only one layout is exposed to assistive technology at a time.

## Breakpoints

The spec's three breakpoints map to Tailwind's defaults with no custom names: phone below `sm` (640px), tablet from `sm`, desktop from `lg` (1024px). Max content width is 1440px.

## Icons

- **Set.** lucide-react only. Material Symbols are removed.
- **Access.** Pages import semantic keys from `lib/icons.ts`, never from lucide-react directly. Renaming a lucide export then needs one edit, not one per screen.
- **Coverage.** 82% of icon uses are mapped. The table is in `docs/icon-map.md`.
- **Filled vs outlined.** Lucide is outline-only. Status is shown by icon shape plus colour plus text, so no filled variant is needed.

## Imagery

- DESIGN.md allows vector schematics, receipt vouchers, scope trees and technical UI previews only.
- The portrait photograph is removed (audit finding 10).
- The logo is a text wordmark until the client supplies a vector logo.
- The two schematic illustrations (audit finding 12) are allowed content. They need to be downloaded, optimised, and served locally, or redrawn in SVG. Not yet done.

## Dark mode

Tokens exist for dark mode and are applied with a `.dark` class on `<html>`. No screen shows a toggle, so the toggle is not built. The dark palette is ready for the first screen that needs it.

## Roles

Screens use Owner, Admin, Member and Viewer. The brief says "reader". Canonical names: `owner`, `admin`, `member`, `viewer`. "Reader" is not used in the code.
