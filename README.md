# Forma — three complete business scenarios

Forma is a French/English business-planning workspace. Each business project contains **three independent scenarios**: pessimistic, realistic, and optimistic. There is no hosted database requirement.

## What each scenario contains

- Its own business context, decisions, risks, and milestones.
- Its own seven-section written business plan.
- Its own editable nine-block canvas.
- Its own initial revenue, fixed costs, variable cost rate, starting cash, and monthly growth.
- Its own 12-month operating forecast.

No revenue multiplier derives scenarios from a common financial base. Each scenario uses directly entered values. New projects start with empty writing and zero financial assumptions. The optional Atelier Atlas example illustrates different offers, markets, hiring decisions, risks, and finances across all three scenarios.

Use the scenario buttons at the top of the editor to choose which complete scenario you are editing. Use **Compare scenarios / Comparer les scénarios** for a side-by-side view of strategies, written plans, and financial assumptions. Editing one scenario does not modify the other two. “Copy from another scenario” explicitly copies a starting point, saves a safety version first, and leaves the two scenarios independent.

## Run locally

Install Node.js 18 or newer. In this folder:

```sh
npm start
```

Open http://localhost:3000. Restart an older running server after upgrading to this version; the file API now includes revision checks. There is no dependency installation or build step. `PORT` changes the listening port. `FORMA_DATA_DIR` can point to an isolated test directory.

## Two people using GitHub

Each person clones the same **private** Git repository and chooses a separate name in **Settings / Paramètres**. Names identify ownership; they are local labels, not authenticated accounts.

Projects live in `data/plans/<project-id>.json`. Each file contains the complete project, all three scenarios, and all its saved versions. Ordinarily, each person edits their own projects. A colleague’s project opens in reading mode. “Create my copy / Créer ma copie” creates a separate project with a new ID and owner without changing the original.

Choose either storage method:

1. **Local Node app:** saves directly to this checkout’s `data/plans/` folder.
2. **Hosted site with a connected folder:** in desktop Chrome or Edge, open **Work together / Travailler ensemble**, choose **Connect plans folder / Connecter le dossier des plans**, and select your clone’s `data/plans/` folder. The browser asks for folder access. Your own new projects are copied into it; existing files remain authoritative. A pre-connection backup is retained in browser storage as `forma-before-folder`. Native folder handles are remembered when browser permission permits; if access is not retained, reconnect using the button.

Before editing, pull the latest changes and click **Reload shared files / Actualiser les fichiers partagés**. After editing, wait for the saved indicator, then commit and push:

```sh
git pull
# Reload saved files in Forma and edit your own project.
git add data/plans/
git commit -m "Update business project"
git push
```

Your colleague pulls the commit and clicks **Reload shared files**. There is no need to restart the current server just to read updated plan files. Git push and pull remain manual; Forma does not connect to GitHub or synchronize online by itself.

Both the local API and connected-folder mode check that a file has not changed since it was loaded. A stale save is blocked instead of overwriting it. The local API serializes writes for the same file and checks SHA-256 revisions. Connected folders compare original file contents and use the browser’s origin-scoped Web Locks when available; this is conflict detection, not a distributed lock. Coordinate edits and resolve any Git merge conflict before loading that JSON file.

Without a local server or connected folder, the hosted site stores data **only in that browser**. The interface says so explicitly. JSON export/import is available for backups and exchange. A shared website URL does not automatically share browser data. Imported projects with existing IDs require a replacement confirmation and offer a backup first.

## How versions work

**Autosave** updates the working draft. It does not create a historical version on every edit.

**Save project version / Enregistrer une version du projet** preserves a named snapshot of all three scenarios together: strategies, written sections, canvases, and financial inputs. Every version records an author label and timestamp. Versions travel inside the project’s JSON file.

- **View snapshot** lets you inspect each of the three saved scenarios.
- **Compare changes** lets you select any two named versions, or compare a version with the working draft. It displays changed fields with before/after values.
- **Restore** restores all three scenarios and project details. It first saves the current working draft as a safety version and keeps the entire history.

Git commits are an additional file-level history. They are separate from the project’s named versions.

## Existing plans

The app upgrades older plans in memory. Their previous shared writing and canvas are copied independently into each scenario. Previous revenue multipliers are converted to direct monthly revenues, preserving the old forecast results. Existing named snapshots retain their original data and currency and can still be inspected, compared, and restored. Historical files are not overwritten just by opening or browsing a project; a new format is saved when you edit it.

## Languages, currency, and export

French is the default. **FR / EN** changes the interface and remembers your preference. User-entered writing and names are not translated. MAD is the default currency; existing archived currencies remain intact.

The canvas can expand to use the full window. **Print / PDF** prints the selected scenario’s canvas in landscape format. CSV exports use the current interface language for headers. JSON exports contain the full project and its complete history.

The canvas layout adaptation is attributed in the source documentation to [Strategyzer](https://www.strategyzer.com/library/the-business-model-canvas), by Alexander Osterwalder and Yves Pigneur, under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

## Forecast method

For each scenario, month 1 uses its own entered monthly revenue. Later months compound using that scenario’s monthly growth rate. Monthly costs = scenario fixed costs + revenue × scenario variable cost percentage. Operating profit = revenue − costs. Cash = scenario starting cash + cumulative operating profit. Taxes, financing, capital expenditure, depreciation, and working-capital timing are excluded.

## Verification

```sh
npm test
```

Tests cover independent scenario data, legacy migration, financial math, snapshots, non-destructive restore, scenario copying, version comparisons, data validation, translations, and storage conflict detection. Browser workflows are also checked against an isolated data directory; real plan files are not used for QA.
